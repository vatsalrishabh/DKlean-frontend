import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { Home, CalendarToday, History, ExitToApp, Menu } from '@mui/icons-material';

const PatientDashboardModern = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      className="w-64"
    >
      <List>
        <ListItem button component="a" href="/dashboard">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component="a" href="/appointments">
          <ListItemIcon>
            <CalendarToday />
          </ListItemIcon>
          <ListItemText primary="Upcoming Appointments" />
        </ListItem>
        <ListItem button component="a" href="/history">
          <ListItemIcon>
            <History />
          </ListItemIcon>
          <ListItemText primary="Patient History" />
        </ListItem>
        <ListItem button component="a" href="/logout">
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className="Patient-Dashboard-Modern">
      {/* Menu Icon for Drawer Toggle */}
      <IconButton onClick={toggleDrawer(true)} className="m-4">
        <Menu fontSize="large" />
      </IconButton>

      {/* Side Drawer */}
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList()}
      </Drawer>
    </div>
  );
};

export default PatientDashboardModern;
