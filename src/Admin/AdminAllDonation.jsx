import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../Components/BaseUrl";
import { Grid, Card, Typography, Divider, TextField, Button } from "@mui/material";
import CheckCircle from "@mui/icons-material/CheckCircle";
import { BreadCrumb } from "../Components/DoctorDashboard/BreadCrumb";
import AdminAllApp from "./AdminAllApp";
import MonthlySummaryModal from './MonthlySummaryModal';


const AdminAllDonation = () => {
  const [loggedInDonor, setLoggedInDonor] = useState(null);
  const [donorDetails, setDonorDetails] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [everyTran, setEveryTran] = useState([]);
  const [findUserId, setUserId] = useState("");
    const [open, setOpen] = useState(false); //montly summary mofal opne clonse

  useEffect(() => {
    const storedDetails = localStorage.getItem("adminDetails");
    if (storedDetails) {
      setLoggedInDonor(JSON.parse(storedDetails));
    }
  }, []);
console.log(transactions)
  useEffect(() => {
    const fetchDonorDetails = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/donations/donorDetails`, {
          params: { userId: findUserId },
        });
        setDonorDetails(response.data.donor || null);
        setTransactions(Array.isArray(response.data.transactions) ? response.data.transactions : []);
        setEveryTran(response.data.everyTran || []);
      } catch (error) {
        console.error("Server Error:", error);
      }
    };

    fetchDonorDetails();
  }, [findUserId]);

  const totalSuccessfulDonation = transactions
    .filter((txn) => txn.status === "success")
    .reduce((sum, txn) => sum + txn.amount, 0);

  const totalUnsuccessfulDonation = transactions
    .filter((txn) => txn.status === "failed")
    .reduce((sum, txn) => sum + txn.amount, 0);

  const totalPendingDonation = transactions
    .filter((txn) => txn.status === "pending")
    .reduce((sum, txn) => sum + txn.amount, 0);
// console.log(everyTran)
function summarizeDonationsByMonth(donations) {
  const summary = {};

  donations.forEach(donation => {
    const date = new Date(donation.donationDate);
    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    if (!summary[month]) {
      summary[month] = { month, successful: 0, pending: 0, total: 0 };
    }

    // Add donation amount to total
    summary[month].total += donation.donationAmount;

    // Add donation amount based on payment status
    if (donation.paymentStatus === "completed") {
      summary[month].successful += donation.donationAmount;
    } else if (donation.paymentStatus === "pending") {
      summary[month].pending += donation.donationAmount;
    }
  });

  // Convert object to array and sort by month
  return Object.values(summary).sort((a, b) => a.month.localeCompare(b.month));
}


const monthlySummary = summarizeDonationsByMonth(everyTran);
console.log(monthlySummary);


  return (
    <div className="w-full p-6">
      <BreadCrumb first="Admin Dashboard" firstLink="/adminlogin" second="All Donations" secondLink="admin/allDonation" />
      
      <div className="flex justify-end mb-4">
        <TextField
          label="Search by User ID"
          variant="outlined"
          type="number"
          value={findUserId}
          onChange={(e) => setUserId(e.target.value)}
          className="bg-white rounded-lg"
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#8f1b1b",
            color: "white",
            "&:hover": {
              backgroundColor: "#701414",
            },
          }}
        >
          Search
        </Button>
      {monthlySummary && (
  <>
    <Button
      onClick={() => setOpen(true)}
      variant="contained"
      sx={{
        backgroundColor: "#8f1b1b",
        marginLeft:"2px",
        color: "white",
        "&:hover": {
          backgroundColor: "#701414",
        },
      }}
    >
      Show Monthly Summary
    </Button>

    <MonthlySummaryModal open={open} onClose={() => setOpen(false)} data={monthlySummary} />
  </>
)}

        
      </div>

      {findUserId.toString().length > 0  ? (
        <Grid item xs={12} md={8}>
          <Card className="p-6 bg-white shadow-xl rounded-lg">
            <Typography variant="h5" className="text-maroon font-bold mb-4 flex items-center">
              <CheckCircle sx={{ fontSize: 28, color: "#8f1b1b", marginRight: 1 }} />
              Donation Transactions
            </Typography>
            <Divider className="mb-4" />

            <div className="mb-4">
              <Typography variant="h6" className="text-gray-700 font-semibold">
                Total Successful Donations: <span className="text-green-600">₹ {totalSuccessfulDonation}</span>
              </Typography>
              <Typography variant="h6" className="text-gray-700 font-semibold">
                Total Unsuccessful Donations: <span className="text-red-600">₹ {totalUnsuccessfulDonation}</span>
              </Typography>
              <Typography variant="h6" className="text-gray-700 font-semibold">
                Total Pending Donations: <span className="text-yellow-600">₹ {totalPendingDonation}</span>
              </Typography>
            </div>

            <div className="space-y-6 overflow-y-auto max-h-96 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
              {transactions.length > 0 ? (
                transactions.map((txn, index) => (
                  <div
                    key={index}
                    className="transaction-item bg-gray-50 p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:shadow-xl"
                  >
                    <div className="flex justify-between mb-2">
                      <Typography variant="body1" className="text-maroon font-semibold">
                        Amount: ₹{txn.amount}
                      </Typography>
                      <Typography
                        variant="body2"
                        className={`font-semibold ${
                          txn.status === "success" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {txn.status === "success" ? "Successful" : "Failed"}
                      </Typography>
                    </div>
                    <Typography variant="body2" className="text-gray-600">
                      Transaction ID: {txn.transactionId || "N/A"}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      Date: {new Date(txn.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </Typography>
                  </div>
                ))
              ) : (
                <Typography variant="body2" className="text-gray-600">
                  No transactions found.
                </Typography>
              )}
            </div>
          </Card>
        </Grid>
      ) : (
        <AdminAllApp everyTran={everyTran} />
      )}
    </div>
  );
};

export default AdminAllDonation;
