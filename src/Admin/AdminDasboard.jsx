import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  CalendarToday,
  Settings,
  FileCopy,
  HelpOutline,
  Menu,
} from "@mui/icons-material";
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { BreadCrumb } from "../Components/DoctorDashboard/BreadCrumb";

const AdminDashboard = () => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hideLeftDrawer, setHideDrawer] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 960) {
        setHideDrawer(true);
      } else {
        setHideDrawer(false);
      }
    };

    handleResize(); // To set the initial state
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const loadUserDetails = () => {
      const details = localStorage.getItem("adminDetails");
      if (details) {
        setLoggedInUser(JSON.parse(details));
        console.log(details)
      }
    };
    loadUserDetails();
  }, []);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const logout = () => {
    localStorage.clear();
    location.reload();
  };

  return (
    <div className="Admin-Dashboard flex">
      <div className="left">
        {/* Left Drawer for Navigation */}
        <Drawer
          className={`${hideLeftDrawer ? "hidden" : ""}`}
          sx={{
            width: 250,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 250,
              boxSizing: "border-box",
              backgroundColor: "#9e1b1b", // Darker Maroon
              color: "#fff",
              transition: "all 0.3s ease-in-out",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <div className="flex flex-col items-center mt-6">
            <Avatar sx={{ bgcolor: "#d01212", width: 100, height: 100 }}>
              {loggedInUser?.name?.slice(0, 1) || "N"}
            </Avatar>
            <Typography variant="h6" className="font-semibold text-white mt-2">
              {loggedInUser?.name || "Admin"}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {loggedInUser?.email || "No email available"}
            </Typography>
          </div>

          <List>
            <ListItem button component={Link} to="/all">
              <ListItemText primary="All Appointments" />
            </ListItem>
            <ListItem button component={Link} to="/pApp">
              <ListItemText primary="Donations" />
            </ListItem>
            <ListItem button component={Link} to="/profileSettings">
              <ListItemText primary="Add Doctors" />
            </ListItem>
            <ListItem button component={Link} to="/medicalReports">
              <ListItemText primary="Medical Reports" />
            </ListItem>
            <ListItem button component={Link} to="/contactSupport">
              <ListItemText primary=" Add Services" />
            </ListItem>
               <ListItem button onClick={logout}>
                          <ListItemText primary="Logout" />
                </ListItem>
          </List>
        </Drawer>
      </div>

   
      <div className="right">

           {/* the breadcrumbstarts  */}
        <div className="pt-5">
          <BreadCrumb
            first="Admin Dashboard"
            second=""
            firstLink="/adminlogin"
            secondLink="/"
          />
        </div>
        {/* the breadcrumb ends  */}

{/*------------------------------------------------------------------------------------ */}
        <div className="flex">
          {/* Right Section with Dashboard Content */}
          <div className="flex-1 p-6 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
            {/* Top Menu for smaller screens */}
            {/* <div className="flex justify-between items-center mb-6 md:hidden">
              <Menu
                sx={{ color: "#fff", fontSize: 30 }}
                onClick={handleDrawerToggle}
              />
              <Typography variant="h5" className="font-semibold text-gray-800">
                Dashboard
              </Typography>
            </div> */}

            {/* Cards Layout */}
            
            <Grid container spacing={4}>
              {/* Book New Appointment Section */}
              <Grid item xs={12} sm={6} md={4}>
                <Card className="shadow-lg transform transition-transform duration-300 hover:scale-105 rounded-lg p-4 bg-white">
                  <CardContent className="flex items-center">
                    <CalendarToday
                      sx={{
                        fontSize: 80,
                        color: "#9e1b1b",
                        marginRight: "1.5rem",
                      }}
                    />
                    <div className="text-left">
                      <Typography
                        variant="h4"
                        className="text-gray-800 font-semibold"
                      >
                       All Appointments
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        className="mb-4"
                      >
                      List of all the appointments
                      </Typography>
                      <Link to="/bookAp" style={{ textDecoration: "none" }}>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#9e1b1b",
                            color: "#fff",
                            "&:hover": { backgroundColor: "#d01212" },
                          }}
                        >
                         See List
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </Grid>

              {/*Donations list */}
              <Grid item xs={12} sm={6} md={4}>
                <Card className="shadow-lg transform transition-transform duration-300 hover:scale-105 rounded-lg p-4 bg-white">
                  <CardContent className="flex items-center">
                    <VolunteerActivismIcon
                      sx={{
                        fontSize: 80,
                        color: "#9e1b1b",
                        marginRight: "1.5rem",
                      }}
                    />
                    <div className="text-left">
                      <Typography
                        variant="h4"
                        className="text-gray-800 font-semibold"
                      >
                       Donations
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        className="mb-4"
                      >
                        View details of all donations.
                      </Typography>
                      <Link to="/pApp" style={{ textDecoration: "none" }}>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#9e1b1b",
                            color: "#fff",
                            "&:hover": { backgroundColor: "#d01212" },
                          }}
                        >
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </Grid>

              {/* Add approve doctors Section */}
              <Grid item xs={12} sm={6} md={4}>
                <Card className="shadow-lg transform transition-transform duration-300 hover:scale-105 rounded-lg p-4 bg-white">
                  <CardContent className="flex items-center">
                    <Settings
                      sx={{
                        fontSize: 80,
                        color: "#9e1b1b",
                        marginRight: "1.5rem",
                      }}
                    />
                    <div className="text-left">
                      <Typography
                        variant="h4"
                        className="text-gray-800 font-semibold"
                      >
                        Add Doctors
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        className="mb-4"
                      >
                        Manage Doctors and physiotherapist.
                      </Typography>
                      <Link
                        to="/profileSettings"
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#9e1b1b",
                            color: "#fff",
                            "&:hover": { backgroundColor: "#d01212" },
                          }}
                        >
                          Manage
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </Grid>

              {/* Add Services Section */}
              <Grid item xs={12} sm={6} md={4}>
                <Card className="shadow-lg transform transition-transform duration-300 hover:scale-105 rounded-lg p-4 bg-white">
                  <CardContent className="flex items-center">
                    <FileCopy
                      sx={{
                        fontSize: 80,
                        color: "#9e1b1b",
                        marginRight: "1.5rem",
                      }}
                    />
                    <div className="text-left">
                      <Typography
                        variant="h4"
                        className="text-gray-800 font-semibold"
                      >
                     Add Services
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        className="mb-4"
                      >
              Add bloodwork and physiotherapy services
                      </Typography>
                      <Link
                        to="/medicalReports"
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#9e1b1b",
                            color: "#fff",
                            "&:hover": { backgroundColor: "#d01212" },
                          }}
                        >
                          View Reports
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </Grid>

              {/* Contact Support Section */}
              <Grid item xs={12} sm={6} md={4}>
                <Card className="shadow-lg transform transition-transform duration-300 hover:scale-105 rounded-lg p-4 bg-white">
                  <CardContent className="flex items-center">
                    <HelpOutline
                      sx={{
                        fontSize: 80,
                        color: "#9e1b1b",
                        marginRight: "1.5rem",
                      }}
                    />
                    <div className="text-left">
                      <Typography
                        variant="h4"
                        className="text-gray-800 font-semibold"
                      >
                        Contact Support
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        className="mb-4"
                      >
                        Need help? Reach out to our support team.
                      </Typography>
                      <Link
                        to="/contactSupport"
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#9e1b1b",
                            color: "#fff",
                            "&:hover": { backgroundColor: "#d01212" },
                          }}
                        >
                          Get Support
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            {/* the main Dashboard */}

          </div>
        </div>
{/*------------------------------------------------------------------------------------ */}

      </div>
    </div>
  );
};

export default AdminDashboard;
