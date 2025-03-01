import React from 'react';
import { FaShippingFast } from 'react-icons/fa';
import { MdOutlineUpdate } from 'react-icons/md';
import "animate.css";

const ShippingDelivery = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center animate__animated animate__fadeIn">
      <header className="text-center mb-12 animate__animated animate__bounceInDown">
        <h1 className="text-4xl font-bold text-blue-600 flex items-center justify-center gap-2">
          <FaShippingFast className="text-blue-500" /> Shipping and Delivery
        </h1>
        <p className="text-sm text-gray-600 flex items-center justify-center gap-2 mt-2">
          <MdOutlineUpdate className="text-gray-500" /> Last updated on August 31, 2024
        </p>
      </header>
      <main className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg animate__animated animate__fadeInUp">
        <p className="text-lg leading-relaxed text-center">
          🚫 Shipping is not applicable for this business.
        </p>
      </main>
    </div>
  );
};

export default ShippingDelivery;
