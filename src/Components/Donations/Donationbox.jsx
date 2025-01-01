import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Payment from './Payment';

const theme = createTheme({
  palette: {
    success: {
      main: '#4caf50',
    },
  },
});

const Donationbox = () => {
  const [selectedAmount, setSelectedAmount] = useState('');
  const [manualAmount, setManualAmount] = useState('');
  const donationAmounts = [250, 500, 1000, 1500, 2000, 2500];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setManualAmount(amount.toString()); // Populate input box with selected amount
  };

  const handleManualAmountChange = (e) => {
    const value = e.target.value;
    setManualAmount(value);
    setSelectedAmount(''); // Clear selected button when manual input is entered
  };

  const handleProceed = () => {
    const amountToDonate = Number(manualAmount);
    if (amountToDonate >= 1) {
      console.log('Donation Details:', {
        amount: amountToDonate,
        donorDetails: {
          name: 'Jane Doe',
          email: 'janedoe@example.com',
          contact: '1234567890',
        }, // Random donor details
      });
    } else {
      alert('Please enter a minimum donation of ₹1.');
    }
  };

  return (
    <div className=" sm:w-full">
      <ThemeProvider theme={theme}>
        <div className="p-8 bg-gradient-to-r from-green-100 via-green-50 to-green-200 rounded-xl shadow-lg">
          <div className="prices text-center">
            <h1 className="text-2xl font-semibold mb-6 text-gray-700">
              Please select your donation amount{' '}
              <span className="text-green-600">(*1 patient | ₹ 250/-)</span>
            </h1>
            <div className="amountButtons space-y-6">
              <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
                {donationAmounts.map((amount) => (
                  <Button
                    key={`donation-${amount}`}
                    variant={selectedAmount === amount ? 'contained' : 'outlined'}
                    color="success"
                    className="transition-transform transform hover:scale-105 hover:shadow-md"
                    onClick={() => handleAmountSelect(amount)}
                  >
                    ₹ {amount}/-
                  </Button>
                ))}
              </Stack>
            </div>
            <div className="manual-input mt-6">
              <TextField
                label="Enter Custom Amount"
                variant="outlined"
                color="success"
                value={manualAmount}
                onChange={handleManualAmountChange}
                fullWidth
              />
            </div>
          </div>

          <div className="text-center mt-6">
            <Button
              variant="contained"
              color="success"
              className="transition-transform transform hover:scale-105"
              onClick={handleProceed}
              disabled={!manualAmount || Number(manualAmount) < 1} // Disable if amount is less than ₹1
            >
              Proceed to Donate
            </Button>
          </div>
        </div>
      </ThemeProvider>
      <Payment/>
    </div>
  );
};

export default Donationbox;
