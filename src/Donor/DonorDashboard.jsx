import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import DonationPage from '../Components/Donations/DonationPage';
import DonationHistory from '../Components/Donations/DonationHistory'
import { CalendarToday, History, PersonOutline, Settings } from '@mui/icons-material';

const DonorDashboard = () => {
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    const loadUserDetails = () => {
      const details = localStorage.getItem('donorDetails');
      if (details) {
        setLoggedInUser(JSON.parse(details));
      }
    };
    loadUserDetails();

  }, []);

  return (
    <>


    <div className="flex flex-col lg:flex-row  w-full">
      
      {/* the breadcrumb starts */}
      
      <div className="order-2 lg:order-1  lg:w-4/6">
         <DonationHistory />
      </div>
      <div className="order-1 lg:order-2 lg:w-2/6">
      <DonationPage />
      </div>
    </div>



    </>
   
  );
};

export default DonorDashboard;
