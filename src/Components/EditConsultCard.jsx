import React, { useState, useEffect } from "react";
import { Card, TextField, Button } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";

export default function EditConsultCard(props) {
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    if (storedUserDetails) {
      const userDetails = JSON.parse(storedUserDetails);
      setLoggedInUser(userDetails);
    }
  }, []);

  const handleBookAppointment = () => {
    const url = `/schedulepage`; // Replace with your desired URL
    const width = 1000;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    window.open(
      url,
      "popup",
      `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
    );
  };

  return (
    <div className="p-4">
      <Card className="max-w-sm mx-auto bg-white shadow-lg rounded-lg p-4">
        <div className="flex justify-center mb-4">
          <img
            src={props.specialityImg}
            alt={props.specialityName}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>

        <div className="mb-4">
          <TextField
            label="Speciality Name"
            value={props.specialityName}
            onChange={(e) => props.onNameChange(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </div>

        <div className="mb-4">
          <TextField
            label="Service ID"
            value={props.specialityServiceId}
            onChange={(e) => props.onServiceIdChange(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </div>

        <div className="mb-4">
          <TextField
            label="Price (₹)"
            type="number"
            value={props.specialityRate}
            onChange={(e) => props.onRateChange(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </div>

        <div className="flex items-center justify-between">
          <Button
            variant="contained"
            color="primary"
            onClick={handleBookAppointment}
            endIcon={<ArrowForward />}
            className="mt-4"
          >
            Update
          </Button>
        </div>
      </Card>
    </div>
  );
}
