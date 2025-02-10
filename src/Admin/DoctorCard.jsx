import { useState } from "react";
import axios from "axios";
import { Card, CardContent, Avatar, Typography, Chip } from "@mui/material";
import { Email, LocalHospital, Phone, Home, Category } from "@mui/icons-material";
import { BaseUrl } from "../Components/BaseUrl";

const DoctorCard = ({ name, userId, email, license, mobile, address, category, blocked, jwt}) => {
  const [status, setStatus] = useState(blocked);

  const toggleDoctorStatus = async () => {
    try {
      const response = await axios.post(
        `${BaseUrl}/api/auth/admin/apprDoctor`,
        { userId, blocked: !status },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      // console.log(userId+status)
      setStatus(!status);
    } catch (error) {
      // console.log(userId+status)
      console.error("Error updating doctor status:", error);
    }
  };

  return (
    <Card className="bg-white shadow-xl rounded-2xl w-full max-w-sm p-4 border border-gray-200">
      <CardContent className="flex flex-col items-start space-y-4">
        {/* Header with Avatar and Badge */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <Avatar className="bg-red-500 text-white w-14 h-14 text-xl">
              {name ? name[0] : "D"}
            </Avatar>
            <div>
              <Typography variant="h6" className="text-red-500 font-semibold">
                {name}
              </Typography>
              <Typography variant="body2" className="text-gray-500">
                User ID: {userId}
              </Typography>
            </div>
          </div>
          {/* Status Badge */}
          <Chip
            label={!status ? "Active" : "Inactive"}
            className={`text-white text-sm font-semibold ${status ? "bg-green-500" : "bg-gray-400"}`}
          />
        </div>

        {/* Details Section */}
        <div className="space-y-2 text-gray-700 w-full">
          <p className="flex items-center space-x-2">
            <Email className="text-green-500" /> <span>{email}</span>
          </p>
          <p className="flex items-center space-x-2">
            <LocalHospital className="text-green-500" /> <span>License: {license}</span>
          </p>
          <p className="flex items-center space-x-2">
            <Phone className="text-green-500" /> <span>{mobile}</span>
          </p>
          <p className="flex items-center space-x-2">
            <Home className="text-green-500" /> <span>{address.city}</span>
          </p>
          <p className="flex items-center space-x-2">
            <Category className="text-green-500" /> <span>Specialty: {category}</span>
          </p>
        </div>
      </CardContent>

      {/* Activate/Deactivate Button */}
      <button
        onClick={toggleDoctorStatus}
        className={`w-full p-2 mt-4 rounded text-white ${status ? "bg-gray-400" : "bg-custom-maroon"}`}
      >
        {!status ? "Deactivate Account" : "Activate Account"}
      </button>
    </Card>
  );
};

export default DoctorCard;
