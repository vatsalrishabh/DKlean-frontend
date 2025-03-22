import React from "react";
import LeftImgAbout from "../Components/About/LeftImgAbout";
import RightImgAbout from "../Components/About/RightImgAbout";

const Diagnosis = () => {
  return (
    <div className="bg-gray-100 py-12">
      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-96 flex items-center justify-center text-center text-white"
        style={{ backgroundImage: "url('https://www.evms.edu/media/evms_public/departments/neurology/Neuro-hero-image-2000x1149px.jpg')" }}>
        <div className="bg-black bg-opacity-50 p-6 rounded-lg">
          <h1 className="text-4xl font-bold">Neurology & Brain Health</h1>
          <p className="text-lg mt-2">Comprehensive care for neurological disorders with expert diagnostics and treatment.</p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-12">
        <LeftImgAbout
          img="https://zydushospitals.com/public/theme/front/images/neurology.jpg"
          heading="Understanding Neurology"
          description="Neurology focuses on diagnosing and treating disorders of the nervous system, including the brain, spinal cord, and nerves. Our specialists provide expert care for conditions such as stroke, epilepsy, multiple sclerosis, and more."
        />

        <RightImgAbout
          img="https://www.evms.edu/media/evms_public/departments/neurology/Neuro-hero-image-2000x1149px.jpg"
          heading="Advanced Neurological Care"
          description="We employ cutting-edge technology and innovative treatments to manage neurological disorders. From early diagnosis to rehabilitation, our multidisciplinary team ensures personalized and effective care for every patient."
        />
      </div>
    </div>
  );
};

export default Diagnosis;
