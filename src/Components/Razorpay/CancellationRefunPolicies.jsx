import React from 'react';
import { FaTimesCircle, FaUndo, FaClock, FaMoneyBillWave } from 'react-icons/fa';
import 'animate.css';

const CancellationRefundPolicies = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg animate__animated animate__fadeInUp">
        <header className="text-center mb-8 animate__animated animate__fadeInDown">
          <h1 className="text-4xl font-bold text-blue-600">Cancellation and Refund Policies</h1>
          <p className="text-sm text-gray-600 mt-2">Last updated on March 2, 2025</p>
        </header>
        
        <ul className="space-y-6">
          <li className="flex items-start space-x-4 animate__animated animate__fadeInLeft animate__delay-1s">
            <FaTimesCircle className="text-red-500 text-3xl" />
            <div>
              <h2 className="text-xl font-semibold">No-Visit Policy (Non-Refundable)</h2>
              <p className="text-gray-700">If the customer fails to attend the scheduled appointment, the amount paid will not be refunded.</p>
            </div>
          </li>

          <li className="flex items-start space-x-4 animate__animated animate__fadeInRight animate__delay-2s">
            <FaUndo className="text-green-500 text-3xl" />
            <div>
              <h2 className="text-xl font-semibold">Full Refund Policy</h2>
              <p className="text-gray-700">Cancellations made within 6 hours before the scheduled visit will be fully refunded.</p>
            </div>
          </li>

          <li className="flex items-start space-x-4 animate__animated animate__fadeInLeft animate__delay-3s">
            <FaClock className="text-yellow-500 text-3xl" />
            <div>
              <h2 className="text-xl font-semibold">Partial Refund Policy</h2>
              <p className="text-gray-700">Cancellations between 3 to 6 hours before the appointment are eligible for a partial refund.</p>
            </div>
          </li>

          <li className="flex items-start space-x-4 animate__animated animate__fadeInRight animate__delay-4s">
            <FaMoneyBillWave className="text-blue-500 text-3xl" />
            <div>
              <h2 className="text-xl font-semibold">Token Money Policy</h2>
              <p className="text-gray-700">A ₹50 token amount is required to confirm the booking, which is non-refundable in case of no-show.</p>
            </div>
          </li>
        </ul>

        <footer className="mt-8 text-center animate__animated animate__fadeInUp animate__delay-5s">
          <p className="text-gray-600">For any refund-related queries, please contact our support team.</p>
        </footer>
      </div>
    </div>
  );
};

export default CancellationRefundPolicies;