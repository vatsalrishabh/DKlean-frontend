import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import DonationHistory from '../Components/Donations/DonationHistory';
// import { CalendarToday, History, PersonOutline, Settings } from '@mui/icons-material';
import Donationbox from '../Components/Donations/Donationbox';
import { BaseUrl } from '../Components/BaseUrl';
import axios from 'axios';


const DonorDashboard = () => {
  const [loggedInDonor, setLoggedInDonor] = useState(null);
  const [donorDetails, setDonorDetails] = useState(null);

  // Load donor details from localStorage
  useEffect(() => {
    const storedDetails = localStorage.getItem('donorDetails');
    if (storedDetails) {
      setLoggedInDonor(JSON.parse(storedDetails));
    }
  }, []);

  // Fetch donor details from API
  useEffect(() => {
    if (!loggedInDonor || !loggedInDonor.userId) return; // Prevent unnecessary API call

    const fetchDonorDetails = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/donations/donorDetails`, {
          params: { userId: loggedInDonor.userId },
        });
        // console.log('Fetched Donor Details:', response.data.donor);
        setDonorDetails(response.data.donor); // Store response in state
      } catch (error) {
        console.error('Server Error:', error);
      }
    };

    fetchDonorDetails();
  }, [loggedInDonor]); // Re-run when `loggedInDonor` updates
console.log(donorDetails)
  const transactions = [
    { amount: 200, date: '25 January, 2024', status: 'Completed', transactionId: '#ABC12345' },
    { amount: 1000, date: '10 January, 2024', status: 'Completed', transactionId: '#DEF56789' },
    { amount: 500, date: '5 January, 2024', status: 'Rejected', transactionId: '#GHI67890' }
  ];

  return (
    <div className="flex flex-col lg:flex-row w-full">
      {/* Donation History Section */}
      <div className="order-2 lg:order-1 lg:w-4/6">
        <DonationHistory donorDetails={donorDetails} transactions={transactions} />
      </div>
     
      {/* Donation Box Section */}
      <div className="order-1 lg:order-2 lg:w-2/6">
        <Donationbox donorDetails={donorDetails} />
      </div>
    </div>
  );
};

export default DonorDashboard;
