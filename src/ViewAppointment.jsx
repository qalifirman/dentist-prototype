import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { useAppointments } from './AppointmentsContext';
import emailjs from '@emailjs/browser';

// Define available times for rescheduling
const availableTimeSlots = {
  "2025-01-01": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-01-02": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-01-03": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-01-04": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-01-05": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-01-06": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-01-07": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-01-08": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-01-09": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-01-10": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-01-11": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-01-12": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-01-13": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-01-14": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-01-15": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-01-16": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-01-17": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-01-18": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-01-19": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-01-20": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-01-21": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-01-22": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-01-23": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-01-24": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-01-25": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-01-26": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-01-27": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-01-28": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-01-29": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-01-30": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-01-31": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-02-01": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-02-02": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-02-03": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-02-04": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-02-05": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-02-06": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-02-07": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-02-08": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-02-09": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-02-10": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-02-11": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-02-12": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-02-13": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-02-14": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-02-15": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-02-16": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-02-17": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-02-18": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-02-19": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-02-20": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-02-21": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-02-22": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-02-23": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-02-24": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-02-25": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-02-26": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-02-27": ["9:00 AM", "11:00 AM", "1:00 PM"],
    "2025-02-28": ["9:00 AM", "11:00 AM", "1:00 PM"]
};

const RescheduleModal = ({ appointment, onClose, onReschedule }) => {
  const [newDate, setNewDate] = useState(appointment.date);
  const [newTime, setNewTime] = useState(appointment.time);
  const [availableTimes, setAvailableTimes] = useState(availableTimeSlots[appointment.date] || []);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setNewDate(selectedDate);
    setAvailableTimes(availableTimeSlots[selectedDate] || []);
  };

  const handleReschedule = () => {
    if (newTime) {
      onReschedule(appointment.id, newDate, newTime); // Pass updated date and time
      onClose();
    } else {
      alert("Please select a time.");
    }
  };

  return (
    <div className="fixed inset-0 font-poppins bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-sm">
        <h3 className="text-xl font-semibold mb-4 text-center">Reschedule Appointment</h3>
        <div>
          <label htmlFor="date" className="block text-sm text-gray-700">New Date</label>
          <input
            type="date"
            id="date"
            value={newDate}
            onChange={handleDateChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="time" className="block text-sm text-gray-700 mt-4">New Time</label>
          <select
            id="time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {availableTimes.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={handleReschedule}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Reschedule
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const AppointmentCard = ({ appointment }) => {
  const { removeAppointment, updateAppointment } = useAppointments();
  const [isEditing, setIsEditing] = useState(false);

  const handleCancel = () => {
    removeAppointment(appointment.id);
  };

  const handleReschedule = (id, newDate, newTime) => {
    updateAppointment(id, newDate, newTime); // Update the appointment with new date and time
    sendRescheduleEmail(appointment.email, appointment.name, newDate, newTime); // Send email to user
  };

  // EmailJS function for sending email on reschedule
  const sendRescheduleEmail = (userEmail, userName, newDate, newTime) => {
    const emailTemplate = {
      user_email: userEmail,
      user_name: userName,
      appointment_date: newDate,
      appointment_time: newTime,
    };

    emailjs
      .send("service_ix8kc3a", "template_3o862um", emailTemplate, "AQk6TjM6f9ChSZchJ")
      .then(
        (response) => {
          console.log("Email sent successfully:", response);
        },
        (error) => {
          console.error("Failed to send email:", error);
        }
      );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6 hover:shadow-xl transition duration-300 ease-in-out">
      <p className="text-gray-800 font-semibold text-lg"><strong>Name:</strong> {appointment.name}</p>
      <p className="text-gray-600"><strong>Date:</strong> {appointment.date}</p>
      <p className="text-gray-600"><strong>Time:</strong> {appointment.time}</p>
      <p className="text-gray-600"><strong>Service:</strong> {appointment.service}</p>

      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setIsEditing(true)}
          className="text-blue-600 flex items-center hover:text-blue-800 transition duration-200"
        >
          <FaRegEdit className="mr-2" /> Edit
        </button>
        <button
          onClick={handleCancel}
          className="text-red-600 flex items-center hover:text-red-800 transition duration-200"
        >
          <IoTrashOutline className="mr-2" /> Cancel
        </button>
      </div>

      {isEditing && (
        <RescheduleModal
          appointment={appointment}
          onClose={() => setIsEditing(false)}
          onReschedule={handleReschedule}
        />
      )}
    </div>
  );
};

const ViewAppointment = () => {
  const { appointments } = useAppointments();

  return (
    <div className="min-h-screen font-poppins text-gray-800 bg-gray-100 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Your Appointments</h1>
      </div>

      {appointments.length > 0 ? (
        <div className="max-w-4xl mx-auto">
          {appointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No appointments booked yet.</p>
      )}
    </div>
  );
};

export default ViewAppointment;
