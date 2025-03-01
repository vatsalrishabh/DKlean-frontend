import React, { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import CollectionsIcon from "@mui/icons-material/Collections";
import CallIcon from "@mui/icons-material/Call";
import LanIcon from "@mui/icons-material/Lan";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from "@mui/icons-material/Login";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import logo from "../../assets/Puslecarelogo/PulseCare.png";

const SmartNavbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDrawer = (state) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setOpen(state);
  };

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, link: "/" },
    { text: "About", icon: <InfoIcon />, link: "/about" },
    { text: "Services", icon: <LanIcon />, link: "/services" },
    { text: "Gallery", icon: <CollectionsIcon />, link: "/gallery" },
    { text: "Contact Us", icon: <CallIcon />, link: "/contact" },
  ];

  const DrawerList = () => (
    <Box
      sx={{ width: 250, backgroundColor: "custom-graybg" }}
      role="presentation"
      onClick={(event) => {
        if (!event.target.closest(".no-close")) {
          toggleDrawer(false)(event);
        }
      }}
      onKeyDown={(event) => {
        if (!event.target.closest(".no-close")) {
          toggleDrawer(false)(event);
        }
      }}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton component={Link} to={item.link} onClick={toggleDrawer(false)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/donate" onClick={toggleDrawer(false)}>
            <ListItemIcon>
              <VolunteerActivismIcon />
            </ListItemIcon>
            <ListItemText primary="Donate" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding className="no-close">
          <ListItemButton component={Link} to="/patientlogin" onClick={toggleDrawer(false)}>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Login/Sign Up" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <nav className="flex items-center justify-between bg-custom-maroon shadow-md px-6 py-4">
      {/* Logo */}
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-15 w-20 object-cover" />
      </div>

      {/* Hamburger Menu for Mobile */}
      <Button onClick={toggleDrawer(true)} className="lg:hidden">
        <MenuIcon sx={{ fontSize: 30, color: "custom-gray0" }} />
      </Button>

      {/* Drawer (Sidebar) */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList()}
      </Drawer>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex gap-6 items-center">
        {menuItems.map((item, index) => (
          <Link key={index} to={item.link} className="text-custom-maroon0 font-medium hover:text-custom-green transition duration-300">
            {item.text}
          </Link>
        ))}
        <Link to="/donate" className="text-custom-green font-semibold px-4 py-2 rounded-md hover:bg-custom-green hover:text-white transition duration-300">
          Donate
        </Link>

        {/* Login Dropdown */}
        <div className="relative">
          <button onClick={toggleDropdown} className="text-custom-maroon2 font-semibold px-4 py-2 rounded-md hover:bg-custom-maroon2 hover:text-white transition duration-300">
            Login/Sign Up {dropdownOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
              <Link to="/patient-login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Patient Login
              </Link>
              <Link to="/doctor-login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Doctor Login
              </Link>
              <Link to="/donor-login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Donor Login
              </Link>
              <Link to="/admin-login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Admin Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default SmartNavbar;
