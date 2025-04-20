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

// coming from props donorDetails
 if (donorDetails) {
      setFormData({
        userId: donorDetails.userId || "",
        name: donorDetails.name || "",
        dob: "",
        email: donorDetails.email || "",
        mobile: donorDetails.mobile || "",
        address: "",
        pincode: "",
        city: "",
        state: "",
        country: "",
        pancard: donorDetails.pancard || "",
      });
    }
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

const handleSubmit = async (e) => {
  e.preventDefault();
  if (validateForm()) {
    const donationDetails = {
      donationType,
      amount: customAmount || selectedAmount,
      ...formData,
    };
    console.log("Donation Details:", donationDetails);

    try {
      // Make sure to await the API call
      const response = await axios.post(`${BaseUrl}/api/donations/donateNow`, donationDetails);

      // const order = response.data; 
     
      const options = {
        key: 'rzp_test_l0gnUnaG8U4VmM',
        amount: (customAmount || selectedAmount) * 100,
        currency: "INR",
        name: 'Dklean Health Care Public Charitable Trust (N.G.O.)',
        description: 'Test Transaction',
        order_id: response.data.id,  // Ensure `order.id` exists
        callback_url: `${BaseUrl}/api/donations/paymentSuccess`,
        prefill: {
          name: formData?.name,
          email: formData?.email,
          contact: formData.mobile,
        },
        theme: {
          color: '#a32121',
        },
        handler: async function (response) {
          try {
            const verificationResponse = await axios.post(`${BaseUrl}/api/donations/verifyPayment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verificationResponse.data.status === 'ok') {
              console.log(verificationResponse.data.updatedDonation.razorpayId);
              window.location.href = `/donatereceipt/${verificationResponse.data.updatedDonation.razorpayId}`; // take to donate page
            } else {
              console.error('Payment verification failed');
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(response.data)
      console.error("Server Error:", error);
    }
  }
};

  





  useEffect(() => {
    const fetchLocationDetails = async () => {
      if (formData.pincode.length === 6) { // Ensure pincode is fully entered
        try {
          const response = await axios.get(
            `https://pinlookup.in/api/pincode?pincode=${formData.pincode}`
          );
          const data = response.data?.data;
          if (data) {
          
            setFormData((prev) => ({
              ...prev,
              city: data.district_name,
              state: data.state_name,
              country:"India",
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
    <div className="w-full bg-[#f7f7f7] py-10" >
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
            {(donationType === "Give Once" ? [1200, 2400, 3600, ] : [2000, 4000, 6000, ]).map((amount) => (
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
              value={customAmount||selectedAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setSelectedAmount(""); // Clear selected amount if custom amount is entered
              }}
              className="px-4 py-3 rounded-xl border border-gray-300 w-60 focus:outline-none focus:ring-2 focus:ring-custom-maroon"
              required
            />
          </div>

          {/* User Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="relative">
            <label htmlFor="name" className="pl-4 block text-sm font-semibold text-gray-800 mb-1">
  Name
  </label>
              <input
                type="text"
                name="name"
                placeholder="Name *"
                value={formData.name}
                onChange={handleInputChange}
                className="px-4 py-3 rounded-xl border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-custom-maroon"
                required
              />
              <span className="absolute right-3 top-3 text-red-500">*</span>
            </div>
            <div className="relative">
            <label htmlFor="dob" className="pl-4 block text-sm font-semibold text-gray-800 mb-1">
    Date of Birth
  </label>
  <input
    type="date"
    id="dob"
    name="dob"
    value={formData.dob}
    onChange={handleInputChange}
    className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 w-full shadow-sm hover:border-custom-maroon focus:outline-none focus:ring-2 focus:ring-custom-maroon transition duration-200"
    required
    title="Please enter in format: YYYY-MM-DD"
  />

  <span className="absolute right-3 top-3 text-red-500 pointer-events-none select-none">*</span>
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
                required
              />
            </div>
            <div className="relative">
  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">+91</span>
  <input
    type="tel"
    name="mobile"
    placeholder="Mobile *"
    value={formData.mobile}
    onChange={handleInputChange}
    className="pl-14 pr-4 py-3 rounded-xl border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-custom-maroon"
    pattern="[6-9]{1}[0-9]{9}"
    maxLength={10}
    required
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
              required
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
                required
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
                required
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
              required
            />
          </div>

          <div className="mb-6">
          <input
  type="text"
  name="pancard"
  placeholder="Pan Card *"
  value={formData.pancard}
  onChange={handleInputChange}
  onBlur={(e) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(e.target.value)) {
      alert("Invalid PAN card number. Format should be: ABCDE1234F");
    }
  }}
  className="px-4 py-3 rounded-xl border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-custom-maroon uppercase"
  required
  maxLength={10}
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
