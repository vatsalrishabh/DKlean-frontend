import React, { useState, useEffect } from "react";
import { Card, TextField, Button } from "@mui/material";
import { ArrowForward, Add } from "@mui/icons-material";

import axios from "axios";
import { BaseUrl } from "./BaseUrl";

export default function EditConsultCard(props) {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [specialityName, setSpecialityName] = useState(props.specialityName);
  const [specialityRate, setSpecialityRate] = useState(props.specialityRate);
  const [imageUrl, setImageUrl] = useState(props.specialityImg);
 
  useEffect(() => {

    const storedUserDetails = localStorage.getItem("adminDetails");
    if (storedUserDetails) {
      const userDetails = JSON.parse(storedUserDetails);
      setLoggedInUser(userDetails);
   

    }
  }, []);

  
  const handleUpdate = async () => {
    const updates = {
      name: specialityName,
      price: specialityRate,
      serviveImg: imageUrl,
    };

    try {
      await axios.post(
        `${BaseUrl}/api/services/editAllServices`,
        { serviceId: props.specialityServiceId, updates },
        {
          headers: {
            Authorization: `Bearer ${loggedInUser.jwt}`,
          },
        }
      );
      alert("Speciality updated successfully!");
      // Refresh or notify parent
    } catch (error) {
      alert(
        `Error updating speciality: ${
          error.response?.data?.message || "An unknown error occurred"
        }`
      );
    }
  };

  const deleteService = async () => {
    try {
      await axios.delete(`${BaseUrl}/api/services/deleteService`, {
        headers: {
          Authorization: `Bearer ${loggedInUser.jwt}`,
        },
        data: { serviceId: props.specialityServiceId },
      });

      alert("Speciality deleted successfully!");
      // Refresh or notify parent
    } catch (error) {
      alert(
        `Error deleting speciality: ${
          error.response?.data?.message || "An unknown error occurred"
        }`
      );
    }
  };
  const addNewService = async () => {
    try {
      // Correct the order of arguments
      await axios.post(
        `${BaseUrl}/api/services/postNewService`,
        {
          name: "General Consultation", // Default name
          price: 500, // Default price
          category: "Health", // Default category
          location: "Bangalore", // Default location
          doctorIds: ["DOC123", "DOC124"], // Default doctor IDs
          serviveImg: "https://example.com/images/default-service.jpg", // Default image URL
        },
        {
          headers: {
            Authorization: `Bearer ${loggedInUser.jwt}`,
          },
        }
      );
  
      alert("Speciality added successfully!");
      // Refresh or notify parent
    } catch (error) {
      alert(
        `Error adding speciality: ${
          error.response?.data?.message || "An unknown error occurred"
        }`
      );
      console.log(error);
    }
  };
  

  return (
    <div className="p-4">
      <Card className="max-w-sm mx-auto bg-gradient-to-br from-white to-gray-100 shadow-xl rounded-lg p-6 transform transition-all hover:scale-105 duration-300">
        <div className="flex justify-center mb-4">
          <img
            src={imageUrl}
            alt={specialityName}
            className="w-full h-48 object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="mb-4">
          <TextField
            label="Speciality Name"
            value={specialityName}
            onChange={(e) => setSpecialityName(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </div>

        <div className="mb-4">
          <TextField
            label="Service ID"
            value={props.specialityServiceId}
            fullWidth
            variant="outlined"
            disabled
          />
        </div>

        <div className="mb-4">
          <TextField
            label="Price (₹)"
            type="number"
            value={specialityRate}
            onChange={(e) => setSpecialityRate(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </div>

        <div className="mb-4">
          <TextField
            label="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </div>

        <div className="flex items-center justify-between space-x-4">
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            endIcon={<ArrowForward />}
            className="mt-4 transition-all hover:bg-blue-700"
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={deleteService}
            endIcon={<ArrowForward />}
            className="mt-4 transition-all hover:bg-red-700"
          >
            Delete
          </Button>
        </div>

        <Button
          variant="contained"
          color="success"
          onClick={addNewService}
          startIcon={<Add />}
          className="mt-6 w-full transition-all hover:bg-green-700"
        >
          Add New Service
        </Button>
      </Card>
    </div>
  );
}
