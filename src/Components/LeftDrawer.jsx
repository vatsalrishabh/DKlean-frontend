import React, { useEffect, useState } from "react";
import { Drawer, List, ListItem, ListItemText, Avatar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const LeftDrawer = ({ loggedInUser, avatarType, menuItems }) => {
  const [hideLeftDrawer, setHideDrawer] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setHideDrawer(window.innerWidth < 960);
    };

    handleResize(); // Set the initial state
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logout = () => {
    localStorage.clear();
    location.reload(); // Reload to reset the app state
  };

  return (
    <div>
      <Drawer
        className={`${hideLeftDrawer ? "hidden" : ""}`}
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
            {loggedInUser?.name?.charAt(0).toUpperCase() || avatarType[0]}
          </Avatar>
          <Typography variant="h6" className="font-semibold text-white mt-2">
            {loggedInUser?.name || avatarType}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {loggedInUser?.email || "No email available"}
          </Typography>
        </div>

        <List>
          {menuItems.map((item, index) => (
            <ListItem button component={Link} to={item.link} key={index}>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
          <ListItem button onClick={logout}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default LeftDrawer;
