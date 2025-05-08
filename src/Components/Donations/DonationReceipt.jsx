import React, { useEffect, useState } from 'react';
import {
  FaUser, FaCalendarAlt, FaMoneyBillWave, FaReceipt,
  FaEnvelope, FaCheckCircle, FaTimesCircle
} from 'react-icons/fa';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BaseUrl } from '../BaseUrl';
import logo from "../../assets/Puslecarelogo/dkleanlogo.jpeg"

const DonationReceipt = () => {
  const { transactionId } = useParams();
  const [donors, setDonors] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReceipts = async () => {
      setLoading(true);
      try {
        const storedDetails = JSON.parse(localStorage.getItem('donorDetails'));
        let res;
        if (transactionId) {
          res = await axios.get(`${BaseUrl}/api/donations/donationReceipt/${transactionId}`);
          setDonors([res.data]);
        } else {
          res = await axios.get(`${BaseUrl}/api/donations/donationReceipt`, {
            params: { email: storedDetails?.email },
          });
          setDonors(res.data);
        }
      } catch (err) {
        console.error("Error fetching receipt:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReceipts();
  }, [transactionId]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    const content = document.getElementById('printable-receipt').innerHTML;

    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Donation Receipt</title>
          <style>
            body { font-family: sans-serif; padding: 20px; }
            .receipt-card {
              border: 1px solid #ddd;
              padding: 20px;
              border-radius: 10px;
              max-width: 600px;
              margin: 0 auto;
            }
            .section { margin-bottom: 10px; }
            .title { color: #800000; text-align: center; font-size: 24px; font-weight: bold; }
            .label { font-weight: bold; }
            .status-paid { color: green; }
            .status-pending { color: orange; }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="p-4">
      {loading ? (
        <div className="text-center text-gray-500">Loading receipt...</div>
      ) : (
        <>
          <div className="text-center mt-6">
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-2 rounded-lg bg-custom-maroon text-white hover:bg-custom-maroon2 transition"
            >
              View / Print Receipt
            </button>
          </div>

          {showModal && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-50 flex items-center justify-center">
              <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full p-6 relative overflow-y-auto max-h-[90vh] border border-custom-maroon">
                <div id="printable-receipt">
                  {donors.map((donor, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl border-2 border-custom-maroon p-6 shadow-md mb-6"
                    >
                      <div className="flex justify-center mb-4">
    <img src={logo} alt="NGO Logo" className="h-16 w-auto" />
  </div>
                      <h2 className="text-2xl font-bold text-center text-custom-maroon mb-4">Donation Receipt</h2>

                      <div className="flex flex-col gap-3 text-gray-800">
                        <div><FaUser className="inline mr-2 text-custom-maroon" /><span className="font-semibold">Name:</span> {donor.donorName}</div>
                        <div><FaEnvelope className="inline mr-2 text-custom-maroon" /><span className="font-semibold">Email:</span> {donor.donorEmail}</div>
                        <div><FaMoneyBillWave className="inline mr-2 text-custom-maroon" /><span className="font-semibold">Amount:</span> ₹{donor.donationAmount}</div>
                        <div><FaCalendarAlt className="inline mr-2 text-custom-maroon" /><span className="font-semibold">Date:</span> {formatDate(donor.donationDate)}</div>
                        <div><FaReceipt className="inline mr-2 text-custom-maroon" /><span className="font-semibold">Transaction ID:</span> {donor.transactionId}</div>
                        <div>
                          {donor.paymentStatus === "pending" ? (
                            <FaTimesCircle className="inline mr-2 text-yellow-600" />
                          ) : (
                            <FaCheckCircle className="inline mr-2 text-green-600" />
                          )}
                          <span className="font-semibold">Status:</span> {donor.paymentStatus}
                        </div>
                        {donor.donationMessage && (
                          <div><span className="font-semibold">Message:</span> {donor.donationMessage}</div>
                        )}
                      </div>

                      <p className="text-sm text-center mt-6 italic text-gray-500">
                        This is a computer-generated receipt. Thank you for your donation!
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-4 mt-4">
                  <button
                    onClick={handlePrint}
                    className="px-4 py-2 bg-custom-maroon text-white rounded-lg hover:bg-custom-maroon2 transition"
                  >
                    Print
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-600 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DonationReceipt;
