import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, Avatar } from '@mui/material';
import { History, ArrowBack } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import DonationHistory from '../Components/Donations/DonationHistory';
import Donationbox from '../Components/Donations/Donationbox';
import { BaseUrl } from '../Components/BaseUrl';
import axios from 'axios';
import LeftDonationMot from '../Components/Donations/LeftDonationMot';

const DonorDashboard = () => {
  const [donorDetails, setDonorDetails] = useState(null);
  const [hover, setHover] = useState(false);
  const [transactions , setTransaction] = useState([]);
  const [loggedInDonor, setLoggedInDonor] = useState(null);
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
        setDonorDetails(response.data.donor); // Store response in state
        setTransaction(response.data.transactions)
      } catch (error) {
        console.error('Server Error:', error);
      }
    };

    fetchDonorDetails();
  }, [loggedInDonor]); // Re-run when `loggedInDonor` updates
  const logoutDonor = () => {
    localStorage.removeItem("donorDetails");
    window.location.reload();
  };
  


  return (
    <div className="flex flex-col lg:flex-row w-full p-6 bg-gray-50">
      {/* Donation History Section */}
      <div className="order-2 lg:order-1 lg:w-4/6 mb-6 lg:mb-0">
      <div className='flex justify-between'>
      <button 
          onClick={() => setHover(prevHover => !prevHover)} 
          className="flex items-center justify-center bg-custom-maroon text-white py-3 px-8 rounded-full text-xl font-semibold hover:bg-custom-maroon2 transition-all transform hover:scale-105 shadow-md"
        >
          {hover ? (
            <div className='flex justify-between '>
              <History className="mr-2 text-2xl" /> <span>Your Donations</span>
            </div>
          ) : (
            <>
              <ArrowBack className="mr-2 text-2xl" /> <span>Go back</span>
            </>
          )}
        </button>
        <button onClick={logoutDonor} className="flex items-center justify-center bg-custom-maroon text-white py-3 px-8 rounded-full text-xl font-semibold hover:bg-custom-maroon2 transition-all transform hover:scale-105 shadow-md" >Logout</button>
      </div>
   
        {hover ? (
          <LeftDonationMot />
        ) : (
          <DonationHistory donorDetails={donorDetails} transactions={transactions} />
        )}
      </div>

      {/* Donation Box Section */}
      <div className="order-1 lg:order-2 lg:w-2/6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Donationbox donorDetails={donorDetails} />
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
