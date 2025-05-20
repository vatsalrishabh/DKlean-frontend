import React, { useState, useEffect } from "react";
import axios from "axios";
import { BaseUrl } from "../Components/BaseUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faVenusMars,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

const PatientProfile = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    age: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });

  const [editableFields, setEditableFields] = useState({});
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    if (storedUserDetails) {
      const parsedDetails = JSON.parse(storedUserDetails);
      setLoggedInUser(parsedDetails);
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/user/profile`, {
          headers: { Authorization: `Bearer ${loggedInUser?.jwt}` },
        });
        setUserDetails(response.data?.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (loggedInUser?.jwt) fetchUserData();
  }, [loggedInUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const field = name.split(".")[1];
      setUserDetails((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else {
      setUserDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  const toggleEditField = (fieldName) => {
    setEditableFields((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  const handleSave = async () => {
    if (!password) {
      alert("Please enter your password to save changes.");
      return;
    }

    try {
      const response = await axios.post(
        `${BaseUrl}/api/user/updateProfile`,
        { ...userDetails, password },
        {
          headers: { Authorization: `Bearer ${loggedInUser?.jwt}` },
        }
      );
      alert("Profile updated successfully!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="Patient-Profile p-6 bg-gray-100 ">
      <h1 className="text-3xl font-extrabold text-custom-maroon mb-8 text-center animate-fade-in">
        Edit Profile
      </h1>
      <div className="max-w-5xl mx-auto bg-white shadow-lg p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Name", name: "name", icon: faUser },
            { label: "Email", name: "email", icon: faEnvelope },
          ].map((field, index) => (
            <div key={index} className="relative animate-slide-in">
              <label className="block text-xl font-bold text-custom-maroon mb-2">
                {field.label}
              </label>
              <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-custom-maroon transition-all">
                <FontAwesomeIcon
                  icon={field.icon}
                  className="text-custom-maroon text-3xl mr-4"
                />
                <input
                  type="text"
                  name={field.name}
                  value={userDetails?.[field.name] || ""}
                  onChange={handleInputChange}
                  className="flex-1 bg-transparent text-lg p-1 focus:outline-none"
                  readOnly={!editableFields[field.name]}
                />
                <label className="ml-4 flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Edit</span>
                  <input
                    type="checkbox"
                    checked={!!editableFields[field.name]}
                    onChange={() => toggleEditField(field.name)}
                    className="toggle-checkbox"
                  />
                </label>
              </div>
            </div>
          ))}

          {["street", "city", "state", "zipCode", "country"].map((field, index) => (
            <div key={index} className="relative animate-slide-in">
              <label className="block text-xl font-bold text-custom-maroon mb-2 capitalize">
                {field}
              </label>
              <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-custom-maroon transition-all">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-custom-maroon text-3xl mr-4"
                />
                <input
                  type="text"
                  name={`address.${field}`}
                  value={userDetails?.address?.[field] || ""}
                  onChange={handleInputChange}
                  className="flex-1 bg-transparent text-lg p-1 focus:outline-none"
                  readOnly={!editableFields[`address.${field}`]}
                />
                <label className="ml-4 flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Edit</span>
                  <input
                    type="checkbox"
                    checked={!!editableFields[`address.${field}`]}
                    onChange={() => toggleEditField(`address.${field}`)}
                    className="toggle-checkbox"
                  />
                </label>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-6 bg-custom-maroon text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 hover:scale-105 transition-transform"
        >
          Save Changes
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center animate-fade-in">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold text-center text-custom-maroon mb-4">
              Confirm Password
            </h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-custom-maroon focus:outline-none"
              placeholder="Enter your password"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="py-2 px-4 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="py-2 px-4 bg-custom-maroon text-white rounded hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientProfile;
