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
import { Link, useLocation } from "react-router-dom";
import AdminLoginRight from "./AdminLoginRight";
import AdminEditServices from "./AdminEditServices";
import AdminAllAppointment from "./AdminAllAppointment";
import AdminApproveDoctor from "./AdminApproveDoctor";
import AdminAllDonation from "./AdminAllDonation";

const AdminDashboard = () => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hideLeftDrawer, setHideDrawer] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setHideDrawer(window.innerWidth < 960);
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const details = localStorage.getItem("adminDetails");
    if (details) {
      setLoggedInUser(JSON.parse(details));
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="Admin-Dashboard flex">
      {/* Left Drawer for Navigation */}
      {!hideLeftDrawer && (
        <Drawer
          sx={{
            width: 250,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 250,
              boxSizing: "border-box",
              backgroundColor: "#9e1b1b",
              color: "#fff",
              transition: "all 0.3s ease-in-out",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <div className="flex flex-col items-center mt-6">
            <Avatar sx={{ bgcolor: "#d01212", width: 100, height: 100 }}>
              {loggedInUser?.name?.charAt(0) || "N"}
            </Avatar>
            <Typography variant="h6" className="font-semibold text-white mt-2">
              {loggedInUser?.name || "Admin"}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {loggedInUser?.email || "No email available"}
            </Typography>
          </div>

          <List>
            {[
              { text: "All Appointments", path: "/admin/allApp" },
              { text: "Donations", path: "/admin/allDonation" },
              { text: "Add Doctors", path: "/admin/addDoctor" },
              { text: "Medical Reports", path: "/adminlogin" },
              { text: "Add Services", path: "/admin/bookAp" },
            ].map((item, index) => (
              <ListItem button component={Link} to={item.path} key={index}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
            <ListItem button onClick={logout}>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Drawer>
      )}

      {/* Right Section */}
      {location.pathname === "/adminlogin" && <AdminLoginRight />}
      {location.pathname === "/admin/bookAp" && <AdminEditServices />}
      {location.pathname === "/admin/allApp" && <AdminAllAppointment/>}
      {location.pathname === "/admin/addDoctor" && <AdminApproveDoctor/>}
      {location.pathname === "/admin/allDonation" && <AdminAllDonation/>}
      

     
    </div>
  );
};

export default AdminDashboard;
