import React, { useState } from "react";
import { motion } from "framer-motion";

const Professional = () => {
  const doctors = [
    {
      name: "Dr. one",
      comment: "Expert in cardiovascular treatments with over 10 years of experience in the field.",
      image: "https://cdn.pixabay.com/photo/2024/09/03/15/21/ai-generated-9019520_640.png",
    },
    {
      name: "Dr. two",
      comment: "Specialist in neurology, passionate about mental health and patient care.",
      image: "https://cdn.pixabay.com/photo/2024/09/03/15/21/ai-generated-9019520_640.png",
    },
    {
      name: "Dr. three",
      comment: "Pioneer in pediatrics, delivering the best care for children and families.",
      image: "https://cdn.pixabay.com/photo/2024/09/03/15/21/ai-generated-9019520_640.png",
    },
    {
      name: "Dr. four",
      comment: "Dermatologist with a focus on innovative skin care solutions.",
      image: "https://cdn.pixabay.com/photo/2024/09/03/15/21/ai-generated-9019520_640.png",
    },
    {
      name: "Dr. five",
      comment: "Renowned orthopedic surgeon with a commitment to patient recovery.",
      image: "https://cdn.pixabay.com/photo/2024/09/03/15/21/ai-generated-9019520_640.png",
    },
    {
      name: "Dr. six",
      comment: "Leading oncologist dedicated to research and compassionate care.",
      image: "https://cdn.pixabay.com/photo/2024/09/03/15/21/ai-generated-9019520_640.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle the sliding action on double-click
  const handleDoubleClick = (direction) => {
    if (direction === "left") {
      setCurrentIndex((prev) => (prev - 1 + doctors.length) % doctors.length);
    } else if (direction === "right") {
      setCurrentIndex((prev) => (prev + 1) % doctors.length);
    }
  };

  // Get the 3 visible cards based on the current index
  const visibleDoctors = [
    doctors[(currentIndex + 0) % doctors.length],
    doctors[(currentIndex + 1) % doctors.length],
    doctors[(currentIndex + 2) % doctors.length],
  ];

  return (
    <div
      className=" lg:h-[80vh] w-full py-5 px-4"
      onDoubleClick={(e) => {
        if (e.clientX < window.innerWidth / 2) {
          handleDoubleClick("left");
        } else {
          handleDoubleClick("right");
        } 
      }}
    >
      {/* Heading Section */}
      <div className="heading flex flex-col items-center text-center mb-10">
        <div className="text-gray-500 text-sm uppercase tracking-wider">Meet Our Doctors</div>
        <div className="flex flex-col lg:flex-row items-center space-x-0 lg:space-x-2">
          <h1 className="text-[40px] font-bold text-[#8f1b1b]">Professional &</h1>
          <h1 className="text-[40px] font-semibold text-gray-800">Enthusiastic</h1>
        </div>
      </div>

      {/* Slider Section */}
      <div className="relative w-full flex justify-center">
        {/* Cards Slider */}
        <div className=" w-fit overflow-hidden">
 {/* this is the one which holds all the cards */}
          <motion.div
            className=" w-fit flex justify-center space-x-6"
            animate={{ x: `-${currentIndex * 320}px` }} // Adjust the value according to card width
            transition={{ duration: 0.5 }}
          >
            {visibleDoctors.map((doctor, index) => (
              <motion.div
                key={index}
                className="card bg-white shadow-lg rounded-lg p-6 flex flex-col items-center space-y-4 hover:shadow-2xl transition-all duration-300"
                style={{
                  height: "350px",
                  width: "280px",
                  flexShrink: 0, // Prevent flex from altering card dimensions
                }}
              >
                <div
                  className="image h-72 w-52  bg-cover bg-center"
                  style={{ backgroundImage: `url(${doctor.image})` }}
                ></div>
                <h2 className="text-xl font-semibold text-[#8f1b1b]">{doctor.name}</h2>
                <p className="text-gray-600 text-center">{doctor.comment}</p>
                <button className="readMore px-4 py-2 bg-[#8f1b1b] text-white rounded-lg hover:bg-[#a22d2d] transition-all duration-200">
                  Read More
                </button>
              </motion.div>
            ))}
          </motion.div>
{/* this is the one which holds all the cards */}
        </div>
      </div>

      {/* Dots for Card Slider Navigation */}
      <div className="3dots flex justify-center space-x-3 mt-6">
        {doctors.map((_, index) => (
          <button
            key={index}
            className={`h-4 w-4 rounded-full ${
              index === currentIndex ? "bg-[#8f1b1b]" : "bg-gray-400"
            } hover:bg-[#a22d2d] transition-all duration-200`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Professional;
