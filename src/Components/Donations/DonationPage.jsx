import React, { useState } from "react";
import Donationbox from "./Donationbox";


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
<div className="w-full flex justify-end p-4">
<Donationbox />
</div>
   </>
  );
};

export default DonationPage;
