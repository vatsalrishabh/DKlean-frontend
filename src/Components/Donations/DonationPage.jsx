import React, { useState } from "react";
import Donationbox from "./Donationbox";
import LeftDonationMot from "./LeftDonationMot";


const DonationPage = () => {
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donationAmount, setDonationAmount] = useState("");
  const [donationMessage, setDonationMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [razorpayId, setRazorpayId] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const donationData = {
      donorName,
      donorEmail,
      donationAmount,
      donationMessage,
      paymentMethod,
      razorpayId,
      transactionId,
      anonymous: isAnonymous,
    };
    console.log("Donation Data Submitted: ", donationData);
    // Send the data to your server here
  };

  return (
   <>
<div className="lg:flex justify-end p-4">
  <div className="lg:w-2/3 ">
    <LeftDonationMot/>
  </div>
  <div className="lg:w-1/3">
  <Donationbox />
  </div>
</div>
   </>
  );
};

export default DonationPage;
