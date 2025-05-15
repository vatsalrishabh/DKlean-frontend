import React, { useState } from "react";
import { motion } from "framer-motion";
import ash from "../assets/doctors/ashwani.jpg";
import may from "../assets/doctors/mayank.jpg";
import dkum from "../assets/doctors/dkumar.jpg";

const Professional = () => {
  const doctors = [
    {
      name: "Mr. D. Kumar",
      designation: "Path Lab & Physiotherapist",
      img: dkum,
      contact: "8510090506",
    },
    {
      name: "Dr. Mayank Kumar (PT)",
      designation: "Physiotherapist (BPT, DNYS, CMS-ED, EMT)",
      img: may,
      contact: "8882228599",
    },
    {
      name: "Dr. Ashwani Kumar Rai",
      designation: "MBBS, MS Orthopaedics",
      img: ash,
      contact: "8595993431",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDoubleClick = (direction) => {
    if (direction === "left") {
      setCurrentIndex((prev) => (prev - 1 + doctors.length) % doctors.length);
    } else if (direction === "right") {
      setCurrentIndex((prev) => (prev + 1) % doctors.length);
    }
  };

  return (
    <div
      className=" w-full py-10 px-6 bg-gray-100 flex flex-col items-center"
      onDoubleClick={(e) => {
        if (e.clientX < window.innerWidth / 2) {
          handleDoubleClick("left");
        } else {
          handleDoubleClick("right");
        }
      }}
    >
      {/* Heading Section */}
      <div className="text-center mb-10">
        <p className="text-gray-500 text-sm uppercase tracking-wide">
          Meet Our Doctors
        </p>
        <h1 className="text-[40px] font-bold text-[#8f1b1b]">
          Professional & Enthusiastic
        </h1>
      </div>

      {/* Slider Section */}
      <div className="relative w-full flex justify-center">
        <div className="w-fit overflow-hidden">
          <motion.div
            className="w-fit flex space-x-8"
            animate={{ x: `-${currentIndex * 300}px` }}
            transition={{ duration: 0.5 }}
          >
            {doctors.map((doctor, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-lg border border-gray-200 rounded-xl p-6 flex flex-col items-center space-y-4 hover:shadow-2xl transition-all duration-300"
                style={{
                  height: "380px",
                  width: "300px",
                  flexShrink: 0,
                  background:
                    "linear-gradient(to top, #ffffff, #f8f9fa, #eef1f4)",
                }}
              >
                {/* Doctor Image */}
                <div
                  className="h-52 w-44 rounded-lg bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${doctor.img})`,
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  }}
                ></div>

                {/* Doctor Name */}
                <h2 className="text-xl font-semibold text-[#8f1b1b]">
                  {doctor.name}
                </h2>

                {/* Doctor Designation */}
                <p className="text-gray-600 text-center text-sm">
                  {doctor.designation}
                </p>

                {/* Call Button */}
                <a
                  href={`tel:${doctor.contact.replace(/\s+/g, "")}`}
                  className="px-5 py-2 bg-[#8f1b1b] text-white font-medium rounded-lg hover:bg-[#a22d2d] transition-all duration-300 shadow-md"
                >
                  Call Now
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Dots for Navigation */}
      <div className="flex justify-center space-x-3 mt-6">
        {doctors.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full ${
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
