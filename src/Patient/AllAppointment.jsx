import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Box, Grid, Button, Avatar } from "@mui/material";
import { Breadcrumb, BreadcrumbItem } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { CheckCircle, Cancel, AccessTime, LocalHospital } from "@mui/icons-material";
import "tailwindcss/tailwind.css";
import axios from "axios";
import { BaseUrl } from "../Components/BaseUrl";

const AllAppointment = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [allAppointments, setAllAppointments] = useState([]);

  // Load user details from localStorage
  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      const parsedUser = JSON.parse(userDetails);
      setLoggedInUser(parsedUser);
    }
  }, []);

  // Fetch bookings when loggedInUser is available
  useEffect(() => {
    if (!loggedInUser?.userId) return; // Wait until userId is available

    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/payments/patientBookings?patientId=${loggedInUser.userId}`);
        
        if (response.status === 200) {
          setAllAppointments(response.data.payments);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchBookings();
  }, [loggedInUser]); // Runs when loggedInUser changes

  return (
    <Box className="p-6 bg-gray-100 min-h-screen">
      <Typography variant="h4" className="text-center font-bold mb-8 text-gray-800">
        All Appointments
      </Typography>

      <Grid container spacing={4}>
        {allAppointments.length > 0 ? (
          allAppointments.map((appointment, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="transform hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-out bg-gradient-to-r from-white to-gray-100 shadow-lg rounded-lg">
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
                      <Button variant="contained" color="success" startIcon={<CheckCircle />} className="w-full text-white font-semibold">
                        Booked
                      </Button>
                    ) : (
                      <Button variant="contained" color="error" startIcon={<Cancel />} className="w-full text-white font-semibold">
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
