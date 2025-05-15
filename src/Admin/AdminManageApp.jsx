import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BaseUrl } from '../Components/BaseUrl';

const AdminManageApp = () => {
  const [allAppointments, setAllAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const userDetails = localStorage.getItem("doctorDetails");
    if (userDetails) {
      const parsedUser = JSON.parse(userDetails);
      setLoggedInUser(parsedUser);
    }
  }, []);

  useEffect(() => {
    if (!loggedInUser?.userId) return;
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/payments/doctorBookings?doctorId=${loggedInUser.userId}`);
        if (response.status === 200) {
          setAllAppointments(response.data.payments);
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchBookings();
  }, [loggedInUser]);

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleDeleteAppointment = (id) => {
    setAllAppointments((prev) => prev.filter((appointment) => appointment._id !== id));
  };

  return (
    <div className="Manage-App p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Appointments</h1>
      <div className="overflow-x-auto">
        <table className=" min-w-[900px] table-auto w-full border-collapse border border-gray-300 shadow-md rounded-lg overflow-x-auto text-sm">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Patient</th>
              <th className="border px-4 py-2">Doctor</th>
              <th className="border px-4 py-2">Service</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Time</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allAppointments.map((appointment, index) => (
              <tr key={appointment._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">
                  <div>
                    <div className="font-medium">{appointment.patientName}</div>
                    <div className="text-xs text-gray-500">{appointment.patientEmail}</div>
                  </div>
                </td>
                <td className="border px-4 py-2">{appointment.doctorName}</td>
                <td className="border px-4 py-2 capitalize">{appointment.serviceName}</td>
                <td className="border px-4 py-2">{appointment.date}</td>
                <td className="border px-4 py-2">{appointment.time}</td>
                <td className="border px-4 py-2">₹{appointment.amount}</td>
                <td className="border px-4 py-2 capitalize">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-xs ${
                      appointment.status === 'success' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                  >
                    {appointment.status}
                  </span>
                </td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-xs"
                    onClick={() => handleViewDetails(appointment)}
                  >
                    View
                  </button>
                  {/* <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs"
                    onClick={() => handleDeleteAppointment(appointment._id)}
                  >
                    Delete
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white w-[90%] max-w-2xl rounded-lg shadow-lg p-6 relative overflow-y-auto max-h-[90vh]">
            <h2 className="text-lg font-bold mb-4">Appointment Details</h2>

            <div className="space-y-2 text-sm">
              <p><strong>Patient:</strong> {selectedAppointment.patientName} ({selectedAppointment.patientEmail})</p>
              <p><strong>Doctor:</strong> {selectedAppointment.doctorName}</p>
              <p><strong>Service:</strong> {selectedAppointment.serviceName}</p>
              <p><strong>Date & Time:</strong> {selectedAppointment.date} | {selectedAppointment.time}</p>
              <p><strong>Amount:</strong> ₹{selectedAppointment.amount} {selectedAppointment.currency}</p>
              <p><strong>Status:</strong> {selectedAppointment.status}</p>
              <p><strong>Receipt:</strong> {selectedAppointment.receipt}</p>
              <p><strong>Razor Order ID:</strong> {selectedAppointment.razorOrderId}</p>
              <p><strong>Razor Payment ID:</strong> {selectedAppointment.razorPaymentId}</p>
              <p><strong>Google Meet:</strong> <a className="text-blue-600 underline" href={selectedAppointment.googleMeet} target="_blank" rel="noopener noreferrer">{selectedAppointment.googleMeet}</a></p>
              <p><strong>Created At:</strong> {new Date(selectedAppointment.createdAt).toLocaleString('en-IN')}</p>
              <p><strong>Patient ID:</strong> {selectedAppointment.patientId}</p>
              <p><strong>Doctor ID:</strong> {selectedAppointment.doctorId}</p>
              <p><strong>Service ID:</strong> {selectedAppointment.serviceId}</p>
            </div>

            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
              onClick={() => setSelectedAppointment(null)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManageApp;
