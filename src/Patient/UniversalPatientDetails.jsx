import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import CopyAllIcon from '@mui/icons-material/CopyAll';  // Copy icon for each field
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UniversalPatientDetails = () => {
    const [loggedInUser, setLoggedInUser] = useState({});
    const { serviceId, name, price } = useSelector((state) => state.service);
    const navigate = useNavigate();  // Correct usage of navigate hook

    // Function to check if necessary data exists and navigate accordingly
    const ifDataExists = () => {
        if (!serviceId || !name || !price) {
            navigate("/patientlogin"); // Navigate to the previous page if data is incomplete
        }
    };

    // Call the function to check data on component mount
    useEffect(() => {
        ifDataExists(); // Check if necessary data is present
    }, [serviceId, name, price]); // Re-run when these values change

    // Load patient details from localStorage
    useEffect(() => {
        const loadDetails = JSON.parse(localStorage.getItem("userDetails"));
        setLoggedInUser(loadDetails);
        console.log(loadDetails);  // For debugging
    }, []);

    // Truncate email to 12 characters if it exceeds
    const truncatedEmail = loggedInUser?.email?.length > 12 ? loggedInUser.email.slice(0, 12) + '...' : loggedInUser?.email;

    // Function to copy text to clipboard
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Copied to clipboard!');
        }).catch(err => {
            console.log('Failed to copy: ', err);
        });
    };

    return (
        <Box className="Patient-Details" sx={{ padding: 3 }}>
            {/* Heading */}
            <Typography variant="h4" gutterBottom>
                Patient Details
            </Typography>
            
            {/* Patient Details Card */}
            <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
                <Grid container spacing={3}>
                    {/* Patient Name */}
                    <Grid item xs={12} sm={6}>
                        <Box display="flex" alignItems="center">
                            <PersonIcon sx={{ marginRight: 2, color: '#8f1b1b' }} />
                            <Typography variant="h6" color="textSecondary" sx={{ flex: 1 }}>
                                {loggedInUser?.name || 'N/A'}
                            </Typography>
                            <IconButton onClick={() => copyToClipboard(loggedInUser?.name || 'N/A')}>
                                <CopyAllIcon sx={{ color: '#8f1b1b' }} />
                            </IconButton>
                        </Box>
                    </Grid>

                    {/* Patient ID (Service ID) */}
                    <Grid item xs={12} sm={6}>
                        <Box display="flex" alignItems="center">
                            <BadgeIcon sx={{ marginRight: 2, color: '#8f1b1b' }} />
                            <Typography variant="h6" color="textSecondary" sx={{ flex: 1 }}>
                                {serviceId || 'N/A'}
                            </Typography>
                            <IconButton onClick={() => copyToClipboard(serviceId || 'N/A')}>
                                <CopyAllIcon sx={{ color: '#8f1b1b' }} />
                            </IconButton>
                        </Box>
                    </Grid>

                    {/* Email */}
                    <Grid item xs={12} sm={6}>
                        <Box display="flex" alignItems="center">
                            <ContactMailIcon sx={{ marginRight: 2, color: '#8f1b1b' }} />
                            <Typography variant="h6" color="textSecondary" sx={{ flex: 1 }}>
                                {truncatedEmail || 'N/A'}
                            </Typography>
                            <IconButton onClick={() => copyToClipboard(loggedInUser?.email || 'N/A')}>
                                <CopyAllIcon sx={{ color: '#8f1b1b' }} />
                            </IconButton>
                        </Box>
                    </Grid>

                    {/* Service Name */}
                    <Grid item xs={12} sm={6}>
                        <Box display="flex" alignItems="center">
                            <CalendarTodayIcon sx={{ marginRight: 2, color: '#8f1b1b' }} />
                            <Typography variant="h6" color="textSecondary" sx={{ flex: 1 }}>
                                {name || 'Service Name'}
                            </Typography>
                            <IconButton onClick={() => copyToClipboard(name || 'Service Name')}>
                                <CopyAllIcon sx={{ color: '#8f1b1b' }} />
                            </IconButton>
                        </Box>
                    </Grid>

                    {/* Service Price */}
                    <Grid item xs={12} sm={6}>
                        <Box display="flex" alignItems="center">
                            <PriceCheckIcon sx={{ marginRight: 2, color: '#8f1b1b' }} />
                            <Typography variant="h6" color="textSecondary" sx={{ flex: 1 }}>
                                {price ? `${price}` : 'Price Not Available'}
                            </Typography>
                            <IconButton onClick={() => copyToClipboard(price ? `$${price}` : 'Price Not Available')}>
                                <CopyAllIcon sx={{ color: '#8f1b1b' }} />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default UniversalPatientDetails;
