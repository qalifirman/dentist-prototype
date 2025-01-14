import React, { useState } from 'react';
import { useAppointments } from "../AppointmentsContext";
import { FaRegEdit } from "react-icons/fa";
import { createPortal } from "react-dom";
import emailjs from '@emailjs/browser';

const Dropdown = ({ position, onClose, onAccept, onCancel, isVisible }) => {
  if (!isVisible) return null;

  return createPortal(
    <div
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        zIndex: 9999,
      }}
      className="w-32 bg-white font-poppins border border-gray-200 rounded-lg shadow-lg"
    >
      <button
        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
        onClick={() => {
          onAccept();
          onClose();
        }}
      >
        Accept
      </button>
      <button
        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
        onClick={() => {
          onCancel();
          onClose();
        }}
      >
        Cancel
      </button>
    </div>,
    document.body
  );
};

const AppointmentsManagement = () => {
  const { appointments, updateAppointmentStatus } = useAppointments();

  console.log(appointments);

  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const confirmedAppointments = appointments.filter((appointment) => appointment.status === "Confirmed");
  const otherAppointments = appointments.filter((appointment) => appointment.status !== "Confirmed");

  const sendEmail = async (email, name, status, date, time, service) => {
    try {
      await emailjs.send(
        'service_jivdm6t',
        'template_eu3l758',
        {
          user_name: name,
          user_email: email,
          status: status,
          appointment_date: date,
          appointment_time: time,
          appointment_service: service,
        },
        'taKSdep9CU6grCdEC'
      );
      console.log('Email sent successfully!');
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  };

  const handleDropdownClick = (id, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setDropdownPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setDropdownVisible(dropdownVisible === id ? null : id);
  };

  const handleAccept = (appointment) => {
    updateAppointmentStatus(appointment.id, "Confirmed");
    sendEmail(appointment.email, appointment.name, "Confirmed", appointment.date, appointment.time, appointment.service);
  };

  const handleCancel = (appointment) => {
    updateAppointmentStatus(appointment.id, "Canceled");
    sendEmail(appointment.email, appointment.name, "Canceled", appointment.date, appointment.time, appointment.service);
  };

  return (
    <div className="p-6 font-poppins bg-gray-50 rounded-lg shadow-lg relative">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Appointments Management</h2>

      {/* Pending Appointments */}
      <div className="overflow-x-auto mb-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Pending Appointments</h3>
        <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-blue-100 text-gray-700">
              <th className="px-6 py-3 text-left font-medium">Patient Name</th>
              <th className="px-6 py-3 text-left font-medium">Date</th>
              <th className="px-6 py-3 text-left font-medium">Time</th>
              <th className="px-6 py-3 text-left font-medium">Status</th>
              <th className="px-6 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {otherAppointments.map(({ id, name, email, date, time, status, service }) => (
              <tr key={id} className="hover:bg-blue-50 transition duration-300 ease-in-out">
                <td className="px-6 py-4 text-gray-700">{name}</td>
                <td className="px-6 py-4 text-gray-700">{date}</td>
                <td className="px-6 py-4 text-gray-700">{time}</td>
                <td className="px-6 py-4">
                  <span
                    className={`py-1 px-3 rounded-full text-sm ${
                      status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : status === "Confirmed"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {status}
                  </span>
                </td>
                <td className="px-6 py-4 relative">
                  <button
                    className="dropdown-trigger text-gray-600 hover:text-blue-600 cursor-pointer transition duration-200"
                    onClick={(event) => handleDropdownClick(id, event)}
                  >
                    <FaRegEdit />
                  </button>
                  <Dropdown
                    position={dropdownPosition}
                    onClose={() => setDropdownVisible(null)}
                    isVisible={dropdownVisible === id}
                    onAccept={() => handleAccept({ id, name, email, date, time, status, service })}
                    onCancel={() => handleCancel({ id, name, email, date, time, status, service })}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmed Appointments */}
      <div className="overflow-x-auto">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Confirmed Appointments</h3>
        <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-green-100 text-gray-700">
              <th className="px-6 py-3 text-left font-medium">Patient Name</th>
              <th className="px-6 py-3 text-left font-medium">Date</th>
              <th className="px-6 py-3 text-left font-medium">Time</th>
            </tr>
          </thead>
          <tbody>
            {confirmedAppointments.map(({ id, name, date, time }) => (
              <tr key={id} className="hover:bg-green-50 transition duration-300 ease-in-out">
                <td className="px-6 py-4 text-gray-700">{name}</td>
                <td className="px-6 py-4 text-gray-700">{date}</td>
                <td className="px-6 py-4 text-gray-700">{time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentsManagement;
