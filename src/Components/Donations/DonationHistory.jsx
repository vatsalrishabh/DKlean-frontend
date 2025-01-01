import React from 'react';
import { FaReceipt, FaDownload, FaInfoCircle } from 'react-icons/fa';

const DonationHistory = () => {
  const donationData = [
    {
      id: 1,
      date: '2024-12-30',
      amount: '$100',
      receipt: 'Download',
      notes: 'For disaster relief.',
    },
    {
      id: 2,
      date: '2024-11-15',
      amount: '$50',
      receipt: 'Download',
      notes: 'General donation.',
    },
    {
      id: 3,
      date: '2024-10-01',
      amount: '$200',
      receipt: 'Download',
      notes: 'For educational support.',
    },
  ];

  return (
    <div className="lg:w-2/3 sm:w-full   bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Donation History</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-3 px-4 border">Date</th>
            <th className="py-3 px-4 border">Amount</th>
            <th className="py-3 px-4 border">Receipt</th>
            <th className="py-3 px-4 border">Notes</th>
            <th className="py-3 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {donationData.map((donation) => (
            <tr key={donation.id} className="text-gray-700 hover:bg-gray-100">
              <td className="py-3 px-4 border text-center">{donation.date}</td>
              <td className="py-3 px-4 border text-center">{donation.amount}</td>
              <td className="py-3 px-4 border text-center">
                <button
                  className="text-blue-500 hover:text-blue-700 flex items-center justify-center"
                >
                  <FaDownload className="mr-1" /> {donation.receipt}
                </button>
              </td>
              <td className="py-3 px-4 border text-center">{donation.notes}</td>
              <td className="py-3 px-4 border text-center">
                <div className="flex items-center justify-center space-x-4">
                  <button
                    className="text-green-500 hover:text-green-700"
                    title="View Details"
                  >
                    <FaInfoCircle />
                  </button>
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    title="Download Receipt"
                  >
                    <FaReceipt />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonationHistory;
