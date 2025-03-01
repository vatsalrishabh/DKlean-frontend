import React, { useEffect, useState } from 'react';
import { FaUserMd, FaCalendarAlt, FaClock, FaMoneyBillAlt, FaIdBadge, FaUser, FaArrowRight } from 'react-icons/fa';
import { BreadCrumb } from '../Components/DoctorDashboard/BreadCrumb';
import axios from 'axios';
import { BaseUrl } from '../Components/BaseUrl';

const PaymentPage = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);

  // Fetching user and booking data from localStorage
  useEffect(() => {
    const loadDetails = JSON.parse(localStorage.getItem("userDetails"));
    const loadBookingData = JSON.parse(localStorage.getItem("paymentData"));
    
    setBookingDetails(loadBookingData); 
    setLoggedInUser(loadDetails);
    console.log(loadBookingData);
    console.log(loadDetails);
  }, []);

  const priceString = bookingDetails?.serviceFromRedux?.price || '0';
  const numericalValue = parseInt(priceString.replace(/\D/g, ""), 10);
  
  const payNow = async () => {
    try {
      const response = await axios.post(`${BaseUrl}/api/payments/create-order`, {
        amount: numericalValue,
        currency: 'INR',
        receipt: bookingDetails?.bookingId,
        notes: {
          patientId:loggedInUser?.userId,
          name: loggedInUser?.name,
          patientEmail: loggedInUser?.email,
          serviceId:bookingDetails?.serviceFromRedux?.serviceId,
          serviceName: bookingDetails?.serviceFromRedux?.name,
          doctorId:bookingDetails?.doctorId,
          doctor: bookingDetails?.doctorName,
          date:bookingDetails?.date,
          time:bookingDetails?.time,
        },
      });

      const order = response.data;
      console.log(order)
      const options = {
        key: 'rzp_test_l0gnUnaG8U4VmM',
        amount: numericalValue * 100,
        currency: order.currency,
        name: 'Dklean HealthCare',
        description: 'Test Transaction',
        order_id: order.id,
        callback_url: `${BaseUrl}/api/payments/payment-success`,
        prefill: {
          name: loggedInUser?.name,
          email: loggedInUser?.email,
          contact: "8123573669",
        },
        theme: {
          color: '#a32121',
        },
        handler: async function (response) {
          try {
            const verificationResponse = await axios.post(`${BaseUrl}/api/payments/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verificationResponse.data.status === 'ok') {
              window.location.href = '/payment-success';
            } else {
              console.error('Payment verification failed');
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  // Check if the data is available
  if (!loggedInUser || !bookingDetails) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <BreadCrumb first="Select Dates" firstLink="/patient/dates" second="Review Cart" secondLink="/patient/payment" />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-5">
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden grid lg:grid-cols-2 grid-cols-1">
          {/* Left Section: Booking Details */}
          <div className="p-10 border-b lg:border-b-0 lg:border-r border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Booking Details</h2>
            <div className="space-y-6">
              {/* Doctor */}
              <div className="flex items-center gap-4">
                <FaUserMd className="text-[#8f1b1b] text-3xl" />
                <p className="text-gray-700 text-xl font-medium">Doctor: {bookingDetails?.doctorName || "N/A"}</p>
              </div>
              {/* Date */}
              <div className="flex items-center gap-4">
                <FaCalendarAlt className="text-[#8f1b1b] text-3xl" />
                <p className="text-gray-700 text-xl font-medium">Date: {bookingDetails?.date || "N/A"}</p>
              </div>
              {/* Time */}
              <div className="flex items-center gap-4">
                <FaClock className="text-[#8f1b1b] text-3xl" />
                <p className="text-gray-700 text-xl font-medium">Time: {bookingDetails?.time || "N/A"}</p>
              </div>
              {/* Service */}
              <div className="flex items-center gap-4">
                <FaMoneyBillAlt className="text-[#8f1b1b] text-3xl" />
                <p className="text-gray-700 text-xl font-medium">
                  Service: {bookingDetails?.serviceFromRedux?.name || "N/A"} - {bookingDetails?.serviceFromRedux?.price || "N/A"}
                </p>
              </div>
              {/* Booking ID */}
              <div className="flex items-center gap-4">
                <FaIdBadge className="text-[#8f1b1b] text-3xl" />
                <p className="text-gray-700 text-xl font-medium">Booking ID: {bookingDetails?.bookingId || "N/A"}</p>
              </div>
              {/* Booked By */}
              <div className="flex items-center gap-4">
                <FaUser className="text-[#8f1b1b] text-3xl" />
                <p className="text-gray-700 text-xl font-medium">Booked By: {loggedInUser?.name || "Guest"}</p>
              </div>
              {/* Email */}
              <div className="flex items-center gap-4">
                <FaUser className="text-[#8f1b1b] text-3xl" />
                <p className="text-gray-700 text-xl font-medium">Email: {loggedInUser?.email || "N/A"}</p>
              </div>
              {/* User ID */}
              <div className="flex items-center gap-4">
                <FaIdBadge className="text-[#8f1b1b] text-3xl" />
                <p className="text-gray-700 text-xl font-medium">User ID: {loggedInUser?.userId || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Right Section: Payment */}
          <div className="p-10 flex flex-col justify-center items-center bg-gray-50">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Payment</h2>
            <div className="bg-white shadow-md rounded-lg p-10 w-full max-w-sm">
              <p className="text-gray-700 text-center text-xl mb-8">
                Amount to Pay: <span className="font-bold text-2xl">{bookingDetails?.serviceFromRedux?.price || "N/A"}</span>
              </p>
              <button
                className="w-full bg-[#8f1b1b] text-white py-4 rounded-full shadow-lg hover:bg-[#a32121] hover:shadow-xl transform transition-all duration-300 scale-105 flex items-center justify-center gap-4 text-xl font-medium"
                onClick={payNow}
              >
                <FaArrowRight className="text-2xl" /> Proceed to Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
