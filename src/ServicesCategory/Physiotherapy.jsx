import React from "react";
import LeftImgAbout from "../Components/About/LeftImgAbout";
import RightImgAbout from "../Components/About/RightImgAbout";

const Physiotherapy = () => {
  return (
    <div className="bg-gray-100 py-12">
      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-96 flex items-center justify-center text-center text-white"
        style={{ backgroundImage: "url('https://d2jx2rerrg6sh3.cloudfront.net/image-handler/picture/2018/4/shutterstock_By_ESB_Professional.jpg')" }}>
        <div className="bg-black bg-opacity-50 p-6 rounded-lg">
          <h1 className="text-4xl font-bold">Physiotherapy & Rehabilitation</h1>
          <p className="text-lg mt-2">Enhancing mobility and recovery through expert physiotherapy care.</p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-12">
        <LeftImgAbout
          img="https://runwayhealth.ca/wp-content/uploads/2021/07/Physiotherapy-for-the-knee.jpg"
          heading="Personalized Physiotherapy Care"
          description="Our physiotherapy services are designed to help patients regain mobility, reduce pain, and enhance physical performance with personalized treatment plans."
        />

        <RightImgAbout
          img="https://d2jx2rerrg6sh3.cloudfront.net/image-handler/picture/2018/4/shutterstock_By_ESB_Professional.jpg"
          heading="Advanced Rehabilitation Techniques"
          description="We use modern rehabilitation techniques and therapeutic exercises to support recovery from injuries, surgeries, and chronic conditions."
        />
      </div>
    </div>
  );
};

export default Physiotherapy;
