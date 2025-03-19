import React from "react";
import { motion } from "framer-motion";
import servicebg from "../assets/about/servicebg.webp";
import ServiceCard from "./Services/ServiceCard";
import { FaUserMd, FaVial, FaBriefcaseMedical } from "react-icons/fa";

const serviceData = [
  {
    icon: FaUserMd,
    heading: "Physiotherapy Service",
    description: "Professional physiotherapy sessions for pain relief and mobility improvement."
  },
  {
    icon: FaVial,  // Represents medical tests/lab work
    heading: "Blood Test",
    description: "Accurate and timely blood tests for diagnosis and health monitoring.",
  },
  {
    icon: FaBriefcaseMedical,
    heading: "Medical Consultation",
    description: "Expert consultations to guide your health decisions."
  }
];

const Services = () => {
  return (
    <div className="w-full">
      {/* 1. Background Image Section */}
      <motion.div
        className="flex flex-col justify-center items-center h-[70vh] bg-cover bg-center text-white text-center"
        style={{ backgroundImage: `url(${servicebg})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h6 
          className="text-xl md:text-xl mb-4 drop-shadow-lg"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Best Solution For Your Health
        </motion.h6>
        
        <motion.h2
          className="font-semibold text-3xl md:text-4xl drop-shadow-lg"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <b className='font-bold text-6xl'>Services</b> That We Provide
        </motion.h2>
      </motion.div>
      {/* Background Image Section ends */}

      {/* 2. Services Section */}
      <div className="mt-10 text-center px-4 md:px-10">
        <motion.h1
          className="text-4xl font-bold text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Our Services
        </motion.h1>

        {/* Grid Layout for Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 mb-5">
          {serviceData.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
      {/* Services Section Ends */}
    </div>
  );
};

export default Services;
