import React from 'react';
import { FaLock, FaUserShield, FaClipboardList } from 'react-icons/fa';
import 'animate.css';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8 animate__animated animate__fadeIn">
      <header className="text-center mb-12 animate__animated animate__fadeInDown">
        <h1 className="text-4xl font-bold text-blue-600 flex items-center justify-center">
          <FaLock className="mr-2" /> Privacy Policy
        </h1>
      </header>
      <main className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg animate__animated animate__zoomIn">
        <p className="text-lg text-gray-600 flex items-center">
          <FaClipboardList className="mr-2 text-blue-500" /> Last updated on August 31, 2024
        </p>
        <div className="mt-6 space-y-6">
          <div className="flex items-center animate__animated animate__fadeInLeft">
            <FaUserShield className="text-green-500 text-2xl mr-3" />
            <p className="text-lg leading-relaxed">
              Your privacy is important to us. We are committed to protecting your personal information and ensuring that your experience on our website is safe and secure.
            </p>
          </div>
          <div className="flex items-center animate__animated animate__fadeInRight">
            <FaLock className="text-red-500 text-2xl mr-3" />
            <p className="text-lg leading-relaxed">
              Please review our privacy practices to understand how we collect, use, and protect your information.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;