import React from "react";
import LeftImgAbout from "../Components/About/LeftImgAbout";
import RightImgAbout from "../Components/About/RightImgAbout";

const Cardiology = () => {
  return (
    <div className="bg-gray-100 py-12">
      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-96 flex items-center justify-center text-center text-white"
        style={{ backgroundImage: "url('https://www.asterhospitals.in/sites/default/files/2022-04/heart-hospital-in-bangalore.jpg')" }}>
        <div className="bg-black bg-opacity-50 p-6 rounded-lg">
          <h1 className="text-4xl font-bold">Cardiology & Heart Care</h1>
          <p className="text-lg mt-2">Providing advanced cardiovascular treatments to keep your heart healthy and strong.</p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-12">
        <LeftImgAbout
          img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkpmCehDI0T563uayz_HiBl1XZ7nRApNppCA&s"
          heading="Comprehensive Cardiac Care"
          description="Our cardiology services focus on diagnosing and treating heart diseases with precision and expertise. From preventive care to complex cardiac procedures, we ensure the best outcomes for our patients."
        />

        <RightImgAbout
          img="https://www.asterhospitals.in/sites/default/files/2022-04/heart-hospital-in-bangalore.jpg"
          heading="Cutting-Edge Treatment Facilities"
          description="Equipped with state-of-the-art technology, our hospital provides innovative treatments for various heart conditions. Our experienced cardiologists are committed to delivering exceptional patient care."
        />
      </div>
    </div>
  );
};

export default Cardiology;
