import React, { useEffect, useState } from "react";
import SnackBarAlert from "../Components/SnackBarAlert";
import DoctorCard from "./DoctorCard";
import { Button, Card, CardContent, Typography, TextField, Select, MenuItem } from "@mui/material";
import { PersonAdd, CheckCircle } from "@mui/icons-material";
import axios from "axios";
import { BaseUrl } from "../Components/BaseUrl";

const AdminApproveDoctor = () => {
  const [alert, setAlert] = useState({ message: "", status: "99" });
  const [showLogin, setShowLogin] = useState(true);
  const [doctorEmail, setDoctorEmail] = useState("");
  const [doctorPassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [license, setLicense] = useState("");
  const [doctorName, setName] = useState("");
  const [doctorSex, setDoctorSex] = useState("");
  const [doctorMobile, setDoctorMobile] = useState("");
  const [role, setRole] = useState("");
  const [address, setAddress] = useState({ street: "", city: "", state: "", zipCode: "", country: "" });
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [allDoctors, setAllDoctors] = useState([]);

  useEffect(() => {
    const loadUserDetails = localStorage.getItem("adminDetails");
    if (loadUserDetails) {
      const user = JSON.parse(loadUserDetails);
      setLoggedInUser(user);
    }
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      axios
        .get(`${BaseUrl}/api/auth/admin/getAllDoctors`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loggedInUser.jwt}`,
          },
        })
        .then((response) => setAllDoctors(response.data.data))
        .catch((error) => console.error("Error fetching doctors:", error));
    }
  }, [loggedInUser]);
// console.log(allDoctors[0].blocked)
  const handleDoctorRegistration = (e) => {
    e.preventDefault();
    if (doctorPassword !== confirmPassword) {
      setAlert({ message: "Passwords do not match", status: "error" });
      return;
    }

    axios
      .post(
        `${BaseUrl}/api/auth/admin/addDoctor`,
        { doctorEmail, doctorPassword, license, doctorName, doctorSex, doctorMobile, role, address },
        { headers: { "Content-Type": "application/json", Authorization: `Bearer ${loggedInUser.jwt}` } }
      )
      .then((response) => {
        setAlert({ message: "Doctor Registered Successfully", status: "success" });
        setAllDoctors((prev) => [...prev, response.data]);
      })
      .catch(() => setAlert({ message: "Failed to register doctor", status: "error" }));
  };

  const handleAddressChange = (e) => setAddress({ ...address, [e.target.name]: e.target.value });
console.log(allDoctors);
  return (
    <div className="w-full flex flex-col items-center bg-gray-100 min-h-screen p-6">
      <SnackBarAlert message={alert.message} statusCode={alert.status} />

      <Card className="w-full max-w-3xl bg-white shadow-lg rounded-xl border border-gray-300 p-6">
        <CardContent>
          <Typography variant="h5" className="text-center font-bold text-custom-maroon mb-4">
            {showLogin ? "Approve Doctors" : "Doctor Registration"}
          </Typography>

          <div className="flex justify-center mb-6">
            <Button variant={showLogin ? "contained" : "outlined"} color="primary" className="w-1/2 mx-2" onClick={() => setShowLogin(true)} startIcon={<CheckCircle />}>Approve Doctor</Button>
            <Button variant={!showLogin ? "contained" : "outlined"} color="secondary" className="w-1/2 mx-2" onClick={() => setShowLogin(false)} startIcon={<PersonAdd />}>Add Doctor</Button>
          </div>

          {showLogin ? (
            allDoctors.map((doctor) => (
              <DoctorCard key={doctor.userId} name={doctor.name} userId={doctor.userId} email={doctor.email} license={doctor.license} mobile={doctor.mobile} address={doctor.address} category={doctor.category} blocked={doctor.blocked} jwt={loggedInUser.jwt} />
            ))
          ) : (
            <form onSubmit={handleDoctorRegistration} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField label="Email Address" type="email" value={doctorEmail} onChange={(e) => setDoctorEmail(e.target.value)} fullWidth required />
                <TextField label="Full Name" type="text" value={doctorName} onChange={(e) => setName(e.target.value)} fullWidth required />
                <TextField label="Password" type="password" value={doctorPassword} onChange={(e) => setPassword(e.target.value)} fullWidth required />
                <TextField label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} fullWidth required />
                <TextField label="License Number" type="text" value={license} onChange={(e) => setLicense(e.target.value)} fullWidth required />
                <Select value={doctorSex} onChange={(e) => setDoctorSex(e.target.value)} displayEmpty fullWidth required>
                  <MenuItem value="" disabled>Select Gender</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
                <Select value={role} onChange={(e) => setRole(e.target.value)} displayEmpty fullWidth required>
                  <MenuItem value="" disabled>Select Category</MenuItem>
                  <MenuItem value="blood">Blood Work</MenuItem>
                  <MenuItem value="physio">Physio</MenuItem>
                </Select>
                <TextField label="Phone Number" type="tel" value={doctorMobile} onChange={(e) => setDoctorMobile(e.target.value)} fullWidth required />
              </div>

              <Typography variant="h6" className="mt-4">Address Details</Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(address).map((key) => (
                  <TextField key={key} label={key.charAt(0).toUpperCase() + key.slice(1)} name={key} type="text" value={address[key]} onChange={handleAddressChange} fullWidth required />
                ))}
              </div>

              <Button type="submit" variant="contained" color="primary" fullWidth className="mt-4">Register Doctor</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminApproveDoctor;
