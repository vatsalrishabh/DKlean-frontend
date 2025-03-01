import React from 'react'
import { motion } from 'framer-motion'
import servicebg from "../assets/about/servicebg.webp"

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
        className="font- text-xl md:text-xl mb-4 drop-shadow-lg"
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
     <b className='font-bold text-6xl'>Services</b>  That We Provide
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

      <motion.h2
        className="text-2xl font-semibold text-gray-700 mt-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        We proudly provide two main services:{" "}
        <span className="text-red-500">Physiotherapy</span> and{" "}
        <span className="text-blue-500">Blood Testing</span>.
      </motion.h2>

      <motion.p
        className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Our expert physiotherapists help in pain relief and recovery, while our blood test
        services ensure accurate health diagnostics at your convenience.
      </motion.p>

      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h3 className="text-xl font-semibold text-gray-800">Why Choose Us?</h3>
        <ul className="list-disc list-inside text-gray-600 mt-2 text-left max-w-lg mx-auto">
          <li>✔ Professional physiotherapists at your doorstep</li>
          <li>✔ Quick and accurate blood test results</li>
          <li>✔ Affordable and reliable healthcare services</li>
        </ul>
      </motion.div>
    </div>
    {/* Services Section Ends */}
  </div>
  )
}

export default Services
