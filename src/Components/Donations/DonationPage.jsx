import React, { useEffect, useState } from "react";
import Donationbox from "./Donationbox";
import LeftDonationMot from "./LeftDonationMot";
import { useNavigate } from "react-router-dom";

const DonationPage = () => {
  const navigate = useNavigate();
  const [loggedInDonor, setLoggedInDonor] = useState(null);

  useEffect(() => {
    const storedDetails = localStorage.getItem('donorDetails');
    if (storedDetails) {
      const parsedDetails = JSON.parse(storedDetails);
      setLoggedInDonor(parsedDetails);
      if (parsedDetails.isloggedIn) {
        navigate("/donorlogin");
      }
    }
  }, []);

  return (
    <>
      <div className="lg:flex justify-end p-4">
        <div className="lg:w-2/3">
          <LeftDonationMot />
        </div>
        <div className="lg:w-1/3">
          <Donationbox /> {/* Handles anonymous donations */}
        </div>
      </div>
    </>
  );
};

export default DonationPage;
