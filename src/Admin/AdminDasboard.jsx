import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { CalendarToday, History, PersonOutline, Settings } from '@mui/icons-material';

const AdminDashboard = () => {
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    const loadUserDetails = () => {
      const details = localStorage.getItem('adminDetails');
      if (details) {
        setLoggedInUser(JSON.parse(details));
      }
    };
    loadUserDetails();

  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-custom-graybg to-gray-200 p-6">
      <div className="text-center mb-8">

     <Avatar sx={{ bgcolor: 'red', width: 80, height: 80, margin: '0 auto', marginBottom: '1rem' }}>  {loggedInUser?.name?.slice(0, 1) || 'N'}</Avatar>
        <Typography variant="h4" className="font-bold text-custom-maroon">
          Welcome,   {loggedInUser?.name || 'N'}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Your personalized dashboard
        </Typography>
      </div>

      <Grid container spacing={4} className="w-full max-w-5xl">
        {/* Book New Appointment Section */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            className="bg-white shadow-lg transform transition-transform duration-300 hover:scale-105"
          >
            <CardContent className="text-center">
              <CalendarToday className="text-custom-maroon0 text-5xl mb-3" />
              <Typography variant="h6" className="font-semibold">
                Book New Appointment
              </Typography>
              <Typography variant="body2" color="textSecondary" className="mb-4">
                Schedule a new appointment with your preferred doctor.
              </Typography>
              <Link to="/bookNewAppointment" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#71a113', color: '#fff' }}
                >
                  Book Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>

        {/* All Previous Appointments Section */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            className="bg-white shadow-lg transform transition-transform duration-300 hover:scale-105"
          >
            <CardContent className="text-center">
              <History className="text-custom-maroon0 text-5xl mb-3" />
              <Typography variant="h6" className="font-semibold">
                All Previous Appointments
              </Typography>
              <Typography variant="body2" color="textSecondary" className="mb-4">
                View details of all your past appointments and treatments.
              </Typography>
              <Link to="/allPreviousAppointments" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#71a113', color: '#fff' }}
                >
                  View Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>

        {/* Profile Settings Section */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            className="bg-white shadow-lg transform transition-transform duration-300 hover:scale-105"
          >
            <CardContent className="text-center">
              <Settings className="text-custom-maroon0 text-5xl mb-3" />
              <Typography variant="h6" className="font-semibold">
                Profile Settings
              </Typography>
              <Typography variant="body2" color="textSecondary" className="mb-4">
                Manage your profile and account settings.
              </Typography>
              <Link to="/profileSettings" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#71a113', color: '#fff' }}
                >
                  Manage
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashboard;
