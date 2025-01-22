import React from 'react';
import { Card, CardContent, Typography, Divider, Box, Grid } from '@mui/material';
import { AccountCircle, CreditCard, LocationOn, Business, AccessTime, CheckCircle, Cancel } from '@mui/icons-material';
import { BreadCrumb } from '../DoctorDashboard/BreadCrumb';
import LogoutIcon from '@mui/icons-material/Logout';

const DonationHistory = () => {
  const logout = () => {
    console.log('Logout clicked');
    localStorage.clear();
    location.reload();
  };
  

  return (
<>

 {/* the breadcrumbstarts  */}
 <div className="pt-5">
          <BreadCrumb
            first="Patient Dashboard"
            second="Donation Page"
            firstLink="/donorlogin"
            secondLink="/donorlogin"
          />
        </div>
        {/* the breadcrumb ends  */}
        <div className='flex justify-end' >
          <button className=' bg-custom-maroon rounded-lg p-2 text-white' onClick={logout}>
          <LogoutIcon/>  Logout
          </button>
        </div>

<div className="flex w-full h-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-6">
      <Grid container spacing={6}>
        {/* Donor Details Section */}
        <Grid item xs={12} md={4}>
          <Card className="p-6 bg-white shadow-xl rounded-lg">
            <Typography variant="h5" className="text-maroon font-bold mb-4 flex items-center">
              <AccountCircle sx={{ fontSize: 28, color: '#8f1b1b', marginRight: 1 }} />
              Donor Details
            </Typography>
            <Divider className="mb-4" />
            
            <div className="mb-4">
              <Typography variant="h6" className="text-maroon font-semibold">
                <AccountCircle sx={{ fontSize: 20, color: '#8f1b1b', marginRight: 1 }} />
                Vatsal Rishabh Pandey
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                <CreditCard sx={{ fontSize: 20, color: '#8f1b1b', marginRight: 1 }} />
                Pan Card - FZLPP2990D
              </Typography>
            </div>

            <div className="mb-4">
              <Typography variant="body2" className="text-gray-600">
                <AccessTime sx={{ fontSize: 20, color: '#8f1b1b', marginRight: 1 }} />
                Age: <span className="font-semibold">23 yrs</span>
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                <Business sx={{ fontSize: 20, color: '#8f1b1b', marginRight: 1 }} />
                Gender: <span className="font-semibold">Female</span>
              </Typography>
            </div>

            <div className="mb-4">
              <Typography variant="body2" className="text-gray-600">
                <LocationOn sx={{ fontSize: 20, color: '#8f1b1b', marginRight: 1 }} />
                Address: <span className="font-semibold">XYZ, City, Country</span>
              </Typography>
            </div>

            <div className="mb-4">
              <Typography variant="body2" className="text-gray-600">
                <CreditCard sx={{ fontSize: 20, color: '#8f1b1b', marginRight: 1 }} />
                Donor ID: <span className="font-semibold">12345</span>
              </Typography>
            </div>
          </Card>
        </Grid>

        {/* Donation History Section */}
        <Grid item xs={12} md={8}>
          <Card className="p-6 bg-white shadow-xl rounded-lg">
            <Typography variant="h5" className="text-maroon font-bold mb-4 flex items-center">
              <CheckCircle sx={{ fontSize: 28, color: '#8f1b1b', marginRight: 1 }} />
              Donation Transactions
            </Typography>
            <Divider className="mb-4" />

            <div className="mb-4">
              <Typography variant="h6" className="text-gray-700 font-semibold">
                Total Donation: <span className="text-green-600">₹ 15,000</span>
              </Typography>
            </div>

            {/* Transaction List with Scrollbar */}
            <div className="space-y-6 overflow-y-auto max-h-96 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
              {/* Transaction 1 */}
              <div className="transaction-item bg-gray-50 p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:shadow-xl">
                <div className="flex justify-between mb-2">
                  <Typography variant="body1" className="text-maroon font-semibold">₹ 200</Typography>
                  <Typography variant="body2" className="text-gray-500">25 January, 2024</Typography>
                </div>

                <div className="flex justify-between">
                  <Typography variant="body2" className="text-gray-600">
                    Status: <span className="text-green-600 font-semibold">Completed</span>
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    Transaction ID: <span className="font-semibold">#ABC12345</span>
                  </Typography>
                </div>
              </div>

              {/* Transaction 2 */}
              <div className="transaction-item bg-gray-50 p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:shadow-xl">
                <div className="flex justify-between mb-2">
                  <Typography variant="body1" className="text-maroon font-semibold">₹ 1,000</Typography>
                  <Typography variant="body2" className="text-gray-500">10 January, 2024</Typography>
                </div>

                <div className="flex justify-between">
                  <Typography variant="body2" className="text-gray-600">
                    Status: <span className="text-green-600 font-semibold">Completed</span>
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    Transaction ID: <span className="font-semibold">#DEF56789</span>
                  </Typography>
                </div>
              </div>

              {/* Transaction 3 */}
              <div className="transaction-item bg-gray-50 p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:shadow-xl">
                <div className="flex justify-between mb-2">
                  <Typography variant="body1" className="text-maroon font-semibold">₹ 500</Typography>
                  <Typography variant="body2" className="text-gray-500">5 January, 2024</Typography>
                </div>

                <div className="flex justify-between">
                  <Typography variant="body2" className="text-gray-600">
                    Status: <span className="text-yellow-600 font-semibold">Rejected</span>
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    Transaction ID: <span className="font-semibold">#GHI67890</span>
                  </Typography>
                </div>
              </div>
            </div>
          </Card>
        </Grid>
        
      </Grid>
    </div>

</>


  );
};

export default DonationHistory;
