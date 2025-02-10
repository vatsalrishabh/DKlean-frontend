import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { CalendarToday, Settings, FileCopy, HelpOutline } from '@mui/icons-material';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { BreadCrumb } from '../Components/DoctorDashboard/BreadCrumb';

const AdminLoginRight = () => {
  return (
    <div className="right">
      {/* Breadcrumb */}
      <div className="pt-5">
        <BreadCrumb first="Admin Dashboard" firstLink="/adminlogin" second="" secondLink="/" />
      </div>

      <div className="flex">
        <div className="flex-1 p-6 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
          <Grid container spacing={4}>
            {/* All Appointments */}
            <Grid item xs={12} sm={6} md={4}>
              <Card className="shadow-lg transform transition-transform duration-300 hover:scale-105 rounded-lg p-4 bg-white">
                <CardContent className="flex items-center">
                  <CalendarToday sx={{ fontSize: 80, color: "#9e1b1b", marginRight: "1.5rem" }} />
                  <div className="text-left">
                    <Typography variant="h4" className="text-gray-800 font-semibold">All Appointments</Typography>
                    <Typography variant="body2" color="textSecondary" className="mb-4">List of all the appointments</Typography>
                    <Link to="/admin/allApp" style={{ textDecoration: "none" }}>
                      <Button variant="contained" sx={{ backgroundColor: "#9e1b1b", color: "#fff", '&:hover': { backgroundColor: "#d01212" } }}>See List</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Grid>

            {/* Donations */}
            <Grid item xs={12} sm={6} md={4}>
              <Card className="shadow-lg transform transition-transform duration-300 hover:scale-105 rounded-lg p-4 bg-white">
                <CardContent className="flex items-center">
                  <VolunteerActivismIcon sx={{ fontSize: 80, color: "#9e1b1b", marginRight: "1.5rem" }} />
                  <div className="text-left">
                    <Typography variant="h4" className="text-gray-800 font-semibold">Donations</Typography>
                    <Typography variant="body2" color="textSecondary" className="mb-4">View details of all donations.</Typography>
                    <Link to="/admin/allDonation" style={{ textDecoration: "none" }}>
                      <Button variant="contained" sx={{ backgroundColor: "#9e1b1b", color: "#fff", '&:hover': { backgroundColor: "#d01212" } }}>View Details</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Grid>

            {/* Add Doctors */}
            <Grid item xs={12} sm={6} md={4}>
              <Card className="shadow-lg transform transition-transform duration-300 hover:scale-105 rounded-lg p-4 bg-white">
                <CardContent className="flex items-center">
                  <Settings sx={{ fontSize: 80, color: "#9e1b1b", marginRight: "1.5rem" }} />
                  <div className="text-left">
                    <Typography variant="h4" className="text-gray-800 font-semibold">Add Doctors</Typography>
                    <Typography variant="body2" color="textSecondary" className="mb-4">Manage Doctors and physiotherapists.</Typography>
                    <Link to="/admin/addDoctor" style={{ textDecoration: "none" }}>
                      <Button variant="contained" sx={{ backgroundColor: "#9e1b1b", color: "#fff", '&:hover': { backgroundColor: "#d01212" } }}>Manage</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Grid>

            {/* Add Services */}
            <Grid item xs={12} sm={6} md={4}>
              <Card className="shadow-lg transform transition-transform duration-300 hover:scale-105 rounded-lg p-4 bg-white">
                <CardContent className="flex items-center">
                  <FileCopy sx={{ fontSize: 80, color: "#9e1b1b", marginRight: "1.5rem" }} />
                  <div className="text-left">
                    <Typography variant="h4" className="text-gray-800 font-semibold">Add Services</Typography>
                    <Typography variant="body2" color="textSecondary" className="mb-4">Add bloodwork and physiotherapy services</Typography>
                    <Link to="/admin/bookAp" style={{ textDecoration: "none" }}>
                      <Button variant="contained" sx={{ backgroundColor: "#9e1b1b", color: "#fff", '&:hover': { backgroundColor: "#d01212" } }}>View Reports</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Grid>

            {/* Contact Support */}
            <Grid item xs={12} sm={6} md={4}>
              <Card className="shadow-lg transform transition-transform duration-300 hover:scale-105 rounded-lg p-4 bg-white">
                <CardContent className="flex items-center">
                  <HelpOutline sx={{ fontSize: 80, color: "#9e1b1b", marginRight: "1.5rem" }} />
                  <div className="text-left">
                    <Typography variant="h4" className="text-gray-800 font-semibold">Contact Support</Typography>
                    <Typography variant="body2" color="textSecondary" className="mb-4">Need help? Reach out to our support team.</Typography>
                    <Link to="/contactSupport" style={{ textDecoration: "none" }}>
                      <Button variant="contained" sx={{ backgroundColor: "#9e1b1b", color: "#fff", '&:hover': { backgroundColor: "#d01212" } }}>Get Support</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginRight;
