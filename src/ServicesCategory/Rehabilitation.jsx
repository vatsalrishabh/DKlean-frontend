import React from "react";
import LeftImgAbout from "../Components/About/LeftImgAbout";
import RightImgAbout from "../Components/About/RightImgAbout";

const Rehabilitation = () => {
  return (
    <div className="bg-gray-100 py-12">
      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-96 flex items-center justify-center text-center text-white"
        style={{ backgroundImage: "url('https://www.bmj.com/careers/getasset/c76721f4-143b-4474-b5f2-8367cf20c85a/')" }}>
        <div className="bg-black bg-opacity-50 p-6 rounded-lg">
          <h1 className="text-4xl font-bold">Rehabilitation & Recovery</h1>
          <p className="text-lg mt-2">Empowering individuals to regain strength and independence through expert rehabilitation services.</p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-12">
        <LeftImgAbout
          img="https://www.bmj.com/careers/getasset/c76721f4-143b-4474-b5f2-8367cf20c85a/"
          heading="Comprehensive Rehabilitation"
          description="Our rehabilitation services focus on helping patients recover from injuries, surgeries, and neurological conditions. We offer specialized therapies to restore mobility, strength, and overall well-being."
        />

        <RightImgAbout
          img="https://www.manipalhospitals.com/uploads/blog/rehabilitation-after-ORIF-surgery.png"
          heading="Personalized Recovery Plans"
          description="Each patient receives a tailored rehabilitation plan designed to enhance recovery and improve quality of life. Our expert team uses advanced therapies and state-of-the-art techniques to achieve the best possible outcomes."
        />
      </div>
    </div>
  );
};

export default Rehabilitation;