import React from "react";
import { motion } from "framer-motion";
import ash from "../../assets/doctors/ashwani.jpg";
import may from "../../assets/doctors/mayank.jpg";
import dkum from "../../assets/doctors/dkumar.jpg";



const Members = ({teamMembers,heading}) => {


  return (
    <div className="p-8 bg-gray-100 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-center text-[#8f1b1b] mb-8">
        {heading}
      </h2>

      {/* Centered Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center place-items-center">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="group bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center transition-all duration-300 transform hover:scale-105 hover:bg-[#8f1b1b] hover:text-white w-80"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.15 }}
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-32 h-32 rounded-full shadow-md mb-4 transition-all duration-300 hover:scale-110 border-4 border-gray-300"
            />
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-white">
              {member.name}
            </h3>
            <p className="text-gray-500 group-hover:text-gray-200 text-sm mb-2">
              {member.designation}
            </p>
            <span className="text-gray-700 group-hover:text-gray-300 text-sm">
              📞 {member.contact}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Members;
