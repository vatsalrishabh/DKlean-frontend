import React from "react";
import "animate.css"; // Import Animate.css for animation

const ServiceCard = ({ icon: Icon, heading, description }) => {
  return (
    <div className="w-80 h-96 bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate__animated animate__backInDown">
      {/* Icon Section */}
      <div className="flex justify-center items-center h-[60%] bg-custom-maroon2 text-white">
        {Icon && <Icon className="text-7xl opacity-90" />}
      </div>

      {/* Information Section */}
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">{heading}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
