import React from "react";
import LeftImgAbout from "../Components/About/LeftImgAbout";
import RightImgAbout from "../Components/About/RightImgAbout";

const Psychiatry = () => {
  return (
    <div className="bg-gray-100 py-12">
      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-96 flex items-center justify-center text-center text-white"
        style={{ backgroundImage: "url('https://www.psychologs.com/wp-content/uploads/2023/10/The-Difference-Between-Psychology-and-Psychiatry.jpg')" }}>
        <div className="bg-black bg-opacity-50 p-6 rounded-lg">
          <h1 className="text-4xl font-bold">Psychiatry & Mental Wellness</h1>
          <p className="text-lg mt-2">Comprehensive mental health solutions to ensure emotional and psychological well-being.</p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-12">
        <LeftImgAbout
          img="https://mpowerminds.com/assetOLD/images/New-content-for-old-blog.png"
          heading="Understanding Mental Health"
          description="Our psychiatric services focus on diagnosing and treating various mental health conditions with compassion and expertise. We prioritize personalized care to support mental wellness."
        />

        <RightImgAbout
          img="https://www.psychologs.com/wp-content/uploads/2023/10/The-Difference-Between-Psychology-and-Psychiatry.jpg"
          heading="Holistic Treatment Approaches"
          description="Utilizing evidence-based therapies and modern psychiatric treatments, we help individuals achieve emotional balance and improved mental health."
        />
      </div>
    </div>
  );
};

export default Psychiatry;
