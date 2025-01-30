import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Box, Grid, Button, Avatar } from "@mui/material";
import { Breadcrumb, BreadcrumbItem } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { CheckCircle, Cancel, AccessTime, LocalHospital } from "@mui/icons-material";
import "tailwindcss/tailwind.css"; // Ensure Tailwind CSS is properly configured in your project

const AllAppointment = () => {
    const [loggedInUser , setLoggedInUser] = useState({});

  const appointmentDetails = [
    {
      bookingId: "APPT12345",
      date: "2024-12-29",
      doctor: "Dr. John Doe",
      time: "10:30 AM",
      money: 500,
      coupon: "DISCOUNT10",
      patientName: "Alice Smith",
      patientId: "PAT001",
      patientEmail: "alice@example.com",
      patientMobile: "9876543210",
      status: "booked",
    },
    {
      bookingId: "APPT67890",
      date: "2024-12-30",
      doctor: "Dr. Jane Doe",
      time: "2:00 PM",
      money: 700,
      coupon: "DISCOUNT15",
      patientName: "Bob Johnson",
      patientId: "PAT002",
      patientEmail: "bob@example.com",
      patientMobile: "8765432109",
      status: "canceled",
    },
  ];

  return (
    <Box className="p-6 bg-gray-100 min-h-screen">
      <Typography
        variant="h4"
        className="text-center font-bold mb-8 text-gray-800 animate-fade-in"
      >
        All Appointments
      </Typography>
         {/* Breadcrumb starts */}
              <div className="p-8">
                {/* <Breadcrumb aria-label="Default breadcrumb example">
                <Link to="/patientlogin">
                <BreadcrumbItem  icon={HiHome}>
                    Home
                  </BreadcrumbItem>
                </Link>
              
                  <BreadcrumbItem>Book an appointment</BreadcrumbItem>
                </Breadcrumb> */}
              </div>
              {/* Breadcrumb ends */}
      <Grid container spacing={4}>
        {appointmentDetails.map((appointment, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              className="transform hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-out bg-gradient-to-r from-white to-gray-100 shadow-lg rounded-lg"
            >
              <CardContent className="p-6">
                <Box className="flex items-center gap-4 mb-4">
                  <Avatar
                    className="bg-green-500 text-white"
                    alt={appointment.patientName}
                    src="/path-to-avatar.jpg"
                  >
                    {appointment.patientName.charAt(0)}
                  </Avatar>
                  <Typography variant="h6" className="font-semibold text-gray-700">
                    {appointment.patientName}
                  </Typography>
                </Box>
                <Typography
                  variant="subtitle1"
                  className="text-gray-600 mb-2 flex items-center gap-2"
                >
                  <LocalHospital fontSize="small" className="text-blue-500" />
                  Doctor: {appointment.doctor}
                </Typography>
                <Typography
                  variant="body1"
                  className="text-gray-600 mb-2 flex items-center gap-2"
                >
                  <AccessTime fontSize="small" className="text-green-500" />
                  Date: {appointment.date} | Time: {appointment.time}
                </Typography>
                <Typography
                  variant="body1"
                  className="text-gray-600 mb-2"
                >
                  Email: {appointment.patientEmail}
                </Typography>
                <Typography
                  variant="body1"
                  className="text-gray-600 mb-2"
                >
                  Mobile: {appointment.patientMobile}
                </Typography>
                <Typography
                  variant="body1"
                  className="text-gray-600 mb-2"
                >
                  Amount: ₹{appointment.money} | Coupon:{" "}
                  <span className="text-blue-600 font-semibold">
                    {appointment.coupon || "N/A"}
                  </span>
                </Typography>
                <Box mt={4}>
                  {appointment.status === "booked" ? (
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<CheckCircle />}
                      className="w-full text-white font-semibold"
                    >
                      Booked
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<Cancel />}
                      className="w-full text-white font-semibold"
                    >
                      Canceled
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AllAppointment;
