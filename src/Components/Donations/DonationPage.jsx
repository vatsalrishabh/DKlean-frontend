import React from "react";
import Donationbox from "./Donationbox";
import LeftDonationMot from "./LeftDonationMot";

const DonationPage = () => {
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
