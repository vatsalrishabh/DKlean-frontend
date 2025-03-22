import React from "react";
import LeftImgAbout from "../Components/About/LeftImgAbout";
import RightImgAbout from "../Components/About/RightImgAbout";

const Diagnosis = () => {
  return (
    <div className="bg-gray-100 py-12">
      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-96 flex items-center justify-center text-center text-white"
        style={{ backgroundImage: "url('https://cdn.myhealthteams.com/graphic/5c3f9af2d9e5c8531c8b9932/woriginal/MyMyelomaTeam_ConditionGuide-2024_Diagnosis_1200x630-bb26f6aa6f251d865a68f04e644f269a.webp?1721339016')" }}>
        <div className="bg-black bg-opacity-50 p-6 rounded-lg">
          <h1 className="text-4xl font-bold">Diagnosis & Healthcare Solutions</h1>
          <p className="text-lg mt-2">Your health, our priority. Precision-driven diagnostics for a healthier tomorrow.</p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-12">
        <LeftImgAbout
          img="https://cdn.myhealthteams.com/graphic/5c3f9af2d9e5c8531c8b9932/woriginal/MyMyelomaTeam_ConditionGuide-2024_Diagnosis_1200x630-bb26f6aa6f251d865a68f04e644f269a.webp?1721339016"
          heading="Who We Are"
          description="Dklean Healthcare is dedicated to revolutionizing the medical industry by providing top-tier healthcare services tailored to every patient’s needs. Our team consists of highly skilled professionals who are committed to delivering exceptional medical care. We focus on patient-centered approaches, ensuring that our services prioritize comfort, accessibility, and efficiency."
        />

        <RightImgAbout
          img="https://cdn.prod.website-files.com/63bf3f41c3bc69578d823f01/66ab8f17f5bb8149e962bb1c_66ab8eebf039ddb25c2a82bf_pexels-pixabay-40568.jpeg"
          heading="Our Vision"
          description="Our vision is to make quality healthcare accessible to everyone, everywhere. We strive to bridge the gap between medical professionals and patients by offering state-of-the-art healthcare solutions. With our innovative approach and commitment to excellence, we aim to create a future where high-quality medical care is available at your doorstep."
        />
      </div>
    </div>
  );
};

export default Diagnosis;