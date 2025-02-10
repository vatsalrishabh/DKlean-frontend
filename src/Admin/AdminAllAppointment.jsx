import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box, Grid, Button, Avatar } from "@mui/material";
import { CheckCircle, Cancel, AccessTime, LocalHospital } from "@mui/icons-material";
import "tailwindcss/tailwind.css";
import axios from "axios";
import { BaseUrl } from "../Components/BaseUrl";

const AllAppointment = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [allAppointments, setAllAppointments] = useState([]);
  const [searchByPatientId, setSearch] = useState("");

  useEffect(() => {
    const userDetails = localStorage.getItem("adminDetails");
    if (userDetails) {
      const parsedUser = JSON.parse(userDetails);
      setLoggedInUser(parsedUser);
    }
  }, []);

  const fetchBookings = async (userId = "") => {
    try {
      const response = await axios.get(
        `${BaseUrl}/api/payments/adminBookings?patientId=${userId}`
      );
      if (response.status === 200) {
        setAllAppointments(response.data.payments);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    if (loggedInUser?.userId) {
      fetchBookings();
    }
  }, [loggedInUser]);

  const isValidPatientId = (id) => /^\d{15}$/.test(id);

  return (
    <Box className="p-6 bg-gray-100 min-h-screen w-full">
      <Typography variant="h4" className="text-center font-bold mb-8 text-gray-800">
        All Appointments
      </Typography>

      {/* Search Input */}
      <div className="relative mb-8">
        <input
          value={searchByPatientId}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter Patient ID (15-digit numerical)"
        />
        <button
          type="button"
          onClick={() => {
            if (isValidPatientId(searchByPatientId)) {
              fetchBookings(searchByPatientId);
            }
          }}
          disabled={!isValidPatientId(searchByPatientId)}
          className={`text-white absolute end-2.5 bottom-2.5 px-4 py-2 rounded-lg text-sm ${
            isValidPatientId(searchByPatientId)
              ? "bg-blue-700 hover:bg-blue-800"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Search
        </button>
      </div>

      <Grid container spacing={4}>
        {allAppointments.length > 0 ? (
          allAppointments.map((appointment, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="transform hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-out bg-white shadow-lg rounded-lg">
                <CardContent className="p-6">
                  <Box className="flex items-center gap-4 mb-4">
                    <Avatar className="bg-green-500 text-white" alt={appointment.patientName}>
                      {appointment.patientName?.charAt(0)}
                    </Avatar>
                    <Typography variant="h6" className="font-semibold text-gray-700">
                      {appointment.patientName}
                    </Typography>
                  </Box>
                  <Typography variant="subtitle1" className="text-gray-600 mb-2 flex items-center gap-2">
                    <LocalHospital fontSize="small" className="text-blue-500" />
                    Doctor: {appointment.doctor}
                  </Typography>
                  <Typography variant="body1" className="text-gray-600 mb-2 flex items-center gap-2">
                    <AccessTime fontSize="small" className="text-green-500" />
                    Date: {appointment.date} | Time: {appointment.time}
                  </Typography>
                  <Typography variant="body1" className="text-gray-600 mb-2">Email: {appointment.patientEmail}</Typography>
                  <Typography variant="body1" className="text-gray-600 mb-2">Mobile: {appointment.patientMobile}</Typography>
                  <Typography variant="body1" className="text-gray-600 mb-2">
                    Amount: ₹{appointment.money} | Coupon:{" "}
                    <span className="text-blue-600 font-semibold">{appointment.coupon || "N/A"}</span>
                  </Typography>
                  <Box mt={4}>
                    {appointment.status === "booked" ? (
                      <Button variant="contained" color="success" startIcon={<CheckCircle />} className="w-full">
                        Booked
                      </Button>
                    ) : (
                      <Button variant="contained" color="error" startIcon={<Cancel />} className="w-full">
                        Canceled
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" className="text-center text-gray-500 w-full">
            No appointments found.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default AllAppointment;
