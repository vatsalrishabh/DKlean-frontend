import React, { useState , useEffect} from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import {
  Close,
  Email,
  Person,
  Phone,
  Cake,
  AssignmentInd,
} from "@mui/icons-material";
import axios from "axios";
import { BaseUrl } from "../BaseUrl";

const DonationModal = ({ open, handleClose, donorDetails }) => {
 const [formData, setFormData] = useState({
  name: "",
  email: "",
  mobile: "",
  gender: "",
  age: "",
  pancard: "",
});

useEffect(() => {
  if (donorDetails) {
    setFormData({
      name: donorDetails.name || "",
      email: donorDetails.email || "",
      mobile: donorDetails.mobile || "",
      gender: donorDetails.gender || "",
      age: donorDetails.age || "",
      pancard: donorDetails.pancard || "",
    });
  }
}, [donorDetails]);



    const [loggedInDonor, setLoggedInDonor] = useState(null);
    // Load donor details from localStorage
    useEffect(() => {
      const storedDetails = localStorage.getItem('donorDetails');
      if (storedDetails) {
        setLoggedInDonor(JSON.parse(storedDetails));
      }
    }, []);
    // console.log(loggedInDonor)
    // console.log(donorDetails)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



const handleSubmit = async () => {
  try {
    const payload = {
      userId: donorDetails?.userId,  // userId from donorDetails
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      gender: formData.gender,
      age: formData.age,
      pancard: formData.pancard,
    };

    const response = await axios.post(`${BaseUrl}/api/auth/updateDonorDetails`, payload);

    if (response.status === 200) {
      alert("Donor details updated successfully!");
       if (response.data?.data) {
        setFormData({
          name: response.data.data.name || "",
          email: response.data.data.email || "",
          mobile: response.data.data.mobile || "",
          gender: response.data.data.gender || "",
          age: response.data.data.age || "",
          pancard: response.data.data.pancard || "",
        });
      }
    } else {
      alert("Something went wrong while updating details.");
    }
  } catch (error) {
    console.error("Update Error:", error);
    alert("Failed to update donor details. Please try again.");
  }
};




  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          bgcolor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 500,
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            position: "relative",
          }}
        >
          <IconButton
            sx={{ position: "absolute", top: 10, right: 10, color: "maroon" }}
            onClick={handleClose}
          >
            <Close />
          </IconButton>
          <Typography variant="h5" gutterBottom color="maroon" textAlign="center">
            Donation Form
          </Typography>

          <TextField
            fullWidth
            margin="normal"
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            InputProps={{
              startAdornment: <Person sx={{ color: "maroon", mr: 1 }} />,
            }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            InputProps={{
              startAdornment: <Email sx={{ color: "maroon", mr: 1 }} />,
            }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Mobile"
            name="mobile"
            type="tel"
            value={formData.mobile}
            onChange={handleChange}
            InputProps={{
              startAdornment: <Phone sx={{ color: "maroon", mr: 1 }} />,
            }}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel sx={{ color: "maroon" }}>Gender</InputLabel>
            <Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            margin="normal"
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            InputProps={{
              startAdornment: <Cake sx={{ color: "maroon", mr: 1 }} />,
            }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="PAN Card"
            name="pancard"
            value={formData.pancard}
            onChange={handleChange}
            InputProps={{
              startAdornment: <AssignmentInd sx={{ color: "maroon", mr: 1 }} />,
            }}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2, bgcolor: "maroon", color: "white", "&:hover": { bgcolor: "darkred" } }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DonationModal;
