import React, { useEffect, useState } from "react";
import HttpsIcon from "@mui/icons-material/Https";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import axios from "axios";
import { BaseUrl } from "../BaseUrl";

const Donationbox = ({donorDetails}) => {
  const [donationType, setDonationType] = useState("Give Once");
  const [selectedAmount, setSelectedAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [loggedInUser, setLoggedInUser] = useState({});
  const [formData, setFormData] = useState({
    userId:donorDetails?.userId,
    name: donorDetails?.name,
    dob: "",
    email: donorDetails?.email,
    mobile: donorDetails?.mobile,
    address: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
    pancard: donorDetails?.pancard,
  });
  
  const [errors, setErrors] = useState({
    name: "",
    mobile: "",
    dob: "",
    pancard: "",
  });
// console.log(donorDetails.userId)
useEffect(()=>{
  const loadUserDetails = () => {
    const storedUserDetails = localStorage.getItem("donorDetails");
    if (storedUserDetails) {
      const userDetails = JSON.parse(storedUserDetails);
      // console.log(storedUserDetails);
     setLoggedInUser(userDetails); // Set the logged-in user with the JWT
    }
  };
  loadUserDetails();
  setFormData({
    userId:donorDetails?.userId,
    name: donorDetails?.name,
    dob: "",
    email: donorDetails?.email,
    mobile: donorDetails?.mobile,
    address: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
    pancard: donorDetails?.pancard,
  });
},[donorDetails]);

  const handleTypeChange = (type) => setDonationType(type);

  const handleAmountClick = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount(""); // Clear custom amount if a predefined amount is selected
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate name (at least 4 characters)
    if (formData.name.trim().length < 4) {
      newErrors.name = "Name must be at least 4 characters.";
    }

    // Validate mobile (Indian format)
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number.";
    }

    // Validate PAN card (exactly 10 characters)
    const pancardRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!pancardRegex.test(formData.pancard)) {
      newErrors.pancard = "Please enter a valid PAN card number.";
    }

    // Validate date of birth (18 years or older)
    const age = new Date().getFullYear() - new Date(formData.dob).getFullYear();
    if (age < 18) {
      newErrors.dob = "You must be at least 18 years old.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const donationDetails = {
        donationType,
        amount: customAmount || selectedAmount,
        ...formData,
      };
      console.log("Donation Details:", donationDetails);
      try{
        const response = axios.post(`${BaseUrl}/api/donations/donateNow`,donationDetails,);

      }catch(error){
          console.log("Server Error"+error);
      }
    }
  };

  useEffect(() => {
    const fetchLocationDetails = async () => {
      if (formData.pincode.length === 6) { // Ensure pincode is fully entered
        try {
          const response = await axios.get(
            `http://www.postalpincode.in/api/pincode/${formData.pincode}`
          );
          const { PostOffice, Status } = response.data;
          if (PostOffice.length > 0) {
            const { District: city, State: state, Country: country } = PostOffice[0];
            setFormData((prev) => ({
              ...prev,
              city,
              state,
              country,
            }));
          } else {
            console.error("Invalid Pincode or No Data Found");
          }
        } catch (error) {
          console.error("Error fetching location details:", error);
        }
      }
    };
    fetchLocationDetails();
  }, [formData.pincode]);

  



  return (
    <div className="w-full bg-[#f7f7f7] py-10">
      <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg p-5">
        <form onSubmit={handleSubmit}>
          {/* Donation Type Selection */}
          <div className="flex justify-center gap-4 mb-6">
            {["Give Once", "Give Monthly"].map((type) => (
              <div
                key={type}
                onClick={() => handleTypeChange(type)}
                className={`cursor-pointer px-6 py-3 rounded-xl text-center font-semibold transition ${
                  donationType === type
                    ? "bg-custom-maroon text-white"
                    : "bg-white border border-custom-maroon text-custom-maroon hover:bg-custom-maroon hover:text-white"
                }`}
              >
                {type}
              </div>
            ))}
          </div>

          {/* Donation Amount Selection */}
          <div className="text-center mb-4 text-gray-700">
            <HttpsIcon sx={{ color: "green" }} /> Choose an amount to donate
          </div>
          <div className="flex justify-center gap-4 mb-6">
            {(donationType === "Give Once" ? [1200, 2400, 3600, 5000] : [2000, 4000, 6000, 8000]).map((amount) => (
              <div
                key={amount}
                onClick={() => handleAmountClick(amount)}
                className={`cursor-pointer px-6 py-3 rounded-xl text-center font-semibold transition ${
                  selectedAmount === amount
                    ? "bg-custom-maroon text-white"
                    : "bg-white border border-custom-maroon text-custom-maroon hover:bg-custom-maroon hover:text-white"
                }`}
              >
                ₹ {amount}
              </div>
            ))}
          </div>

          <div className="text-center mb-4 text-gray-700">
            <VolunteerActivismIcon sx={{ color: "yellow" }} /> Help patients get treatment.
          </div>

          {/* Custom Amount Input */}
          <div className="flex justify-center mb-6">
            <input
              type="number"
              placeholder="₹ Other Amount"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setSelectedAmount(""); // Clear selected amount if custom amount is entered
              }}
              className="px-4 py-3 rounded-xl border border-gray-300 w-60 focus:outline-none focus:ring-2 focus:ring-custom-maroon"
            />
          </div>

          {/* User Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder="Name *"
                value={formData.name}
                onChange={handleInputChange}
                className="px-4 py-3 rounded-xl border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-custom-maroon"
              />
              <span className="absolute right-3 top-3 text-red-500">*</span>
            </div>
            <div className="relative">
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="px-4 py-3 rounded-xl border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-custom-maroon"
              />
              <span className="absolute right-3 top-3 text-red-500">*</span>
            </div>
          </div>
          {errors.name && <p className="text-red-500">{errors.name}</p>}
          {errors.dob && <p className="text-red-500">{errors.dob}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="px-4 py-3 rounded-xl border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-custom-maroon"
              />
            </div>
            <div className="relative">
              <input
                type="number"
                name="mobile"
                placeholder="Mobile *"
                value={formData.mobile}
                onChange={handleInputChange}
                className="px-4 py-3 rounded-xl border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-custom-maroon"
              />
              <span className="absolute right-3 top-3 text-red-500">*</span>
            </div>
          </div>
          {errors.mobile && <p className="text-red-500">{errors.mobile}</p>}

          {/* Remaining fields */}
          <div className="mb-6">
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              className="px-4 py-3 rounded-xl border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-custom-maroon"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                className="px-4 py-3 rounded-xl border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-custom-maroon"
              />
            </div>
            <div>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                className="px-4 py-3 rounded-xl border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-custom-maroon"
              />
            </div>
            <div>
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleInputChange}
                className="px-4 py-3 rounded-xl border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-custom-maroon"
              />
            </div>
          </div>

          <div className="mb-6">
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleInputChange}
              className="px-4 py-3 rounded-xl border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-custom-maroon"
            />
          </div>

          <div className="mb-6">
            <input
              type="text"
              name="pancard"
              placeholder="Pan Card *"
              value={formData.pancard}
              onChange={handleInputChange}
              className="px-4 py-3 rounded-xl border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-custom-maroon"
            />
            {errors.pancard && <p className="text-red-500">{errors.pancard}</p>}
          </div>

          <div className="flex justify-center mb-6">
            <button
              type="submit"
              className="px-6 py-3 bg-custom-maroon text-white rounded-xl font-semibold w-full sm:w-60"
            >
              Donate {loggedInUser.isloggedIn?" ":"Anonymously"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Donationbox;
