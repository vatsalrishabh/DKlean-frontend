import React, { useState } from 'react';

const AdminManageApp = () => {
  // Sample Appointments Data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      clientName: 'John Doe',
      service: 'Web Development',
      date: '2025-01-25',
      time: '10:00 AM',
      status: 'Confirmed',
    },
    {
      id: 2,
      clientName: 'Jane Smith',
      service: 'App Development',
      date: '2025-01-26',
      time: '02:00 PM',
      status: 'Pending',
    },
    {
      id: 3,
      clientName: 'Sam Wilson',
      service: 'Social Media Marketing',
      date: '2025-01-27',
      time: '11:30 AM',
      status: 'Cancelled',
    },
  ]);

  // Function to handle appointment deletion
  const handleDeleteAppointment = (id) => {
    setAppointments((prevAppointments) =>
      prevAppointments.filter((appointment) => appointment.id !== id)
    );
  };

  return (
    <div className="Manage-App p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Appointments</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Client Name</th>
              <th className="border px-4 py-2">Service</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Time</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="border px-4 py-2">{appointment.id}</td>
                <td className="border px-4 py-2">{appointment.clientName}</td>
                <td className="border px-4 py-2">{appointment.service}</td>
                <td className="border px-4 py-2">{appointment.date}</td>
                <td className="border px-4 py-2">{appointment.time}</td>
                <td className="border px-4 py-2">{appointment.status}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDeleteAppointment(appointment.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminManageApp;
