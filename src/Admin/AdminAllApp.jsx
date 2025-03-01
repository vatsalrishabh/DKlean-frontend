import React, { useState } from "react";
import { Typography, Checkbox, FormControlLabel } from "@mui/material";

const AdminAllApp = ({ everyTran = [] }) => {
  const [showAnonymous, setShowAnonymous] = useState(true);
  const [showAll, setShowAll] = useState(false);

  // Filtering Logic
  const filteredDonations = showAll
    ? everyTran // Show all donations when showAll is true
    : everyTran.filter((donation) => donation.anonymous === showAnonymous);

  return (
    <div>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        All Donations
      </Typography>

      {/* Checkboxes for filtering */}
      <div className="flex gap-4 mb-4">
        <FormControlLabel
          control={
            <Checkbox
              checked={showAll}
              onChange={() => {
                setShowAll(!showAll);
                if (!showAll) setShowAnonymous(true); // Reset showAnonymous if showAll is checked
              }}
              color="primary"
            />
          }
          label="Show All Donations"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={showAnonymous}
              onChange={() => setShowAnonymous(!showAnonymous)}
              color="primary"
              disabled={showAll} // Disable when "Show All" is checked
            />
          }
          label="Show Anonymous Only"
        />
      </div>

      {filteredDonations.length === 0 ? (
        <Typography variant="body1" sx={{ color: "gray" }}>
          No donations available.
        </Typography>
      ) : (
        filteredDonations.map((eachDonation, index) => (
          <div
            key={index}
            className="bg-gray-50 p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:shadow-xl mb-4"
          >
            <div className="flex justify-between mb-2">
              <Typography variant="body1" sx={{ color: "maroon", fontWeight: "bold" }}>
                Amount: ₹{eachDonation?.donationAmount || "N/A"}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "bold",
                  color: eachDonation?.paymentStatus === "success" ? "green" : "red",
                }}
              >
                {eachDonation?.paymentStatus === "success" ? "Successful" : eachDonation?.paymentStatus}
              </Typography>
            </div>

            {/* Show donor details if not anonymous */}
            {!eachDonation?.anonymous && (
              <>
                <Typography variant="body2" sx={{ color: "gray" }}>
                  Donor Name: {eachDonation?.donorName || "N/A"}
                </Typography>
                <Typography variant="body2" sx={{ color: "gray" }}>
                  Donor Email: {eachDonation?.donorEmail || "N/A"}
                </Typography>
                <Typography variant="body2" sx={{ color: "gray" }}>
                  User ID: {eachDonation?.userId || "N/A"}
                </Typography>
              </>
            )}

            <Typography variant="body2" sx={{ color: "gray" }}>
              Transaction ID: {eachDonation?.transactionId || "N/A"}
            </Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>
              Date:{" "}
              {eachDonation?.donationDate
                ? new Date(eachDonation.donationDate).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                : "N/A"}
            </Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>
              Message: {eachDonation?.donationMessage || "N/A"}
            </Typography>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminAllApp;
