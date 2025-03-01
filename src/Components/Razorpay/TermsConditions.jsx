import React from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';
import 'animate.css';

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="text-center mb-12 animate__animated animate__fadeInDown">
        <h1 className="text-4xl font-bold text-blue-600 flex items-center justify-center gap-3">
          <FaInfoCircle className="text-blue-500" /> Terms and Conditions
        </h1>
        <p className="text-sm text-gray-600">Last updated on February 20, 2025</p>
      </header>
      
      <main className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg animate__animated animate__fadeInUp">
        <div className="mb-6 flex items-center gap-3">
          <FaCheckCircle className="text-green-500 text-xl" />
          <p className="text-lg leading-relaxed">
            For the purpose of these Terms and Conditions, the term "we", "us", "our" refers to <strong>Dklean Healthcare</strong>, operating from Bengaluru, Karnataka 560036. "You", "your", "user", "visitor" shall mean any natural or legal person using our services.
          </p>
        </div>

        <div className="mb-6 flex items-center gap-3">
          <FaExclamationTriangle className="text-yellow-500 text-xl" />
          <p className="text-lg leading-relaxed">
            Your use of this website and/or purchase from us is governed by the following Terms and Conditions. The content of this website is subject to change without notice.
          </p>
        </div>

        <div className="mb-6 flex items-center gap-3">
          <FaCheckCircle className="text-green-500 text-xl" />
          <p className="text-lg leading-relaxed">
            Neither we nor any third parties provide any warranty as to the accuracy, timeliness, performance, completeness, or suitability of the information found on this website for any particular purpose.
          </p>
        </div>
        
        <div className="mt-6 flex justify-center">
          <img src="/assets/terms_conditions.svg" alt="Terms and Conditions" className="w-2/3 animate__animated animate__zoomIn" />
        </div>
      </main>
    </div>
  );
};

export default TermsConditions;