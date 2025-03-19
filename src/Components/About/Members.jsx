import React from "react";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Dr. Ananya Sharma",
    designation: "Senior Physiotherapist",
    img: "https://plus.unsplash.com/premium_photo-1673953510158-174d4060db8b?fm=jpg&q=60&w=3000",
  },
  {
    name: "Dr. Rohan Verma",
    designation: "Orthopedic Specialist",
    img: "https://plus.unsplash.com/premium_photo-1673953510158-174d4060db8b?fm=jpg&q=60&w=3000",
  },
  {
    name: "Dr. Meera Kapoor",
    designation: "Nutrition Expert",
    img: "https://plus.unsplash.com/premium_photo-1673953510158-174d4060db8b?fm=jpg&q=60&w=3000",
  },
];

const Members = () => {
  return (
    <div className="p-4 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-[#8f1b1b] mb-4">
        Meet Our Experts
      </h2>

      {/* Flex Row Layout for One Row with 3 Cards */}
      <div className="flex flex-wrap justify-center gap-4">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="group bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center transition-all duration-300 transform hover:scale-105 hover:bg-[#8f1b1b] hover:text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.15 }}
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-28 h-28 rounded-full shadow-sm mb-3 transition-all duration-300 hover:scale-110"
            />
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-white">
              {member.name}
            </h3>
            <p className="text-gray-500 group-hover:text-gray-200 text-sm">
              {member.designation}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Members;
