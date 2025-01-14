import React, { useState } from 'react';
import { useAppointments } from './AppointmentsContext'; // Import the custom hook
import { Link } from 'react-router-dom'; // Import Link for navigation
import { v4 as uuidv4 } from 'uuid'; // Import UUID
import emailjs from '@emailjs/browser';

const BookAppointment = () => {
  const { addAppointment } = useAppointments();
  const [formData, setFormData] = useState({
    name: '',
    email: '', // Added email field
    date: '',
    time: '',
    service: '',
  });

  const [times, setTimes] = useState([]);
  const [error, setError] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [isBooking, setIsBooking] = useState(false);

  const availability = {
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

  const services = [
    "General Dentistry",
    "Cosmetic Dentistry",
    "Orthodontics",
    "Teeth Whitening",
    "Emergency Dental Care",
  ];

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setFormData({ ...formData, date: selectedDate });

    if (availability[selectedDate]) {
      setTimes(availability[selectedDate]);
      setError('');
    } else {
      setTimes([]);
      setError('No available times for this date.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.name || !formData.email || !formData.date || !formData.time || !formData.service) {
      alert("Please fill in all fields.");
      return;
    }
  
    if (!availability[formData.date] || !availability[formData.date].includes(formData.time)) {
      alert("Selected time slot is no longer available.");
      return;
    }
  
    setIsBooking(true);
  
    setTimeout(async () => {
      const newAppointment = {
        id: uuidv4(), // Assign a unique ID
        ...formData,
      };
  
      addAppointment(newAppointment); // Add the appointment with unique ID and default status "Pending"
  
      // Send confirmation email using EmailJS
      try {
        await emailjs.send(
          'service_jivdm6t', // service ID
          'template_l2u5ocl', // template ID
          {
            user_name: formData.name,
            user_email: formData.email,
            appointment_date: formData.date,
            appointment_time: formData.time,
            appointment_service: formData.service,
          },
          'taKSdep9CU6grCdEC' // user ID
        );
        setConfirmationMessage(`Your appointment has been booked successfully for ${formData.name} on ${formData.date} at ${formData.time} for ${formData.service}. A confirmation email has been sent to ${formData.email}.`);
      } catch (error) {
        setConfirmationMessage('There was an issue sending the confirmation email.');
        console.error('EmailJS error:', error);
      }
  
      setFormData({
        name: '',
        email: '',
        date: '',
        time: '',
        service: '',
      });
      setTimes([]);
      setIsBooking(false);
    }, 1000);
  };
  

  return (
    <div className="min-h-screen font-poppins text-gray-800">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Book Your Appointment Now!</h1>
        <p className="text-gray-600 mt-2">Fill in the form below:</p>
      </div>

      <section className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8 space-y-8 border">
        <div className="flex justify-center mb-6">
          <img src="/pku-logo.png" alt="Logo" className="h-40 object-contain" />
        </div>

        <h2 className="text-2xl font-medium text-center text-gray-800 mb-6">
          Book Your Dental Appointment
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Preferred Date</label>
            <input
              type="date"
              name="date"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.date}
              onChange={handleDateChange}
            />
          </div>

          {/* Time Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Available Times</label>
            {times.length > 0 ? (
              <select
                name="time"
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.time}
                onChange={handleInputChange}
              >
                <option value="">Select a time</option>
                {times.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            ) : (
              <p className="mt-2 text-red-500">{error || "Select a date to see available times."}</p>
            )}
          </div>

          {/* Service Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Select a Service</label>
            <select
              name="service"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.service}
              onChange={handleInputChange}
            >
              <option value="">Choose a service</option>
              {services.map((service, index) => (
                <option key={index} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-semibold tracking-wide hover:bg-blue-700 shadow-sm transition-all duration-300"
            disabled={isBooking}
          >
            {isBooking ? 'Booking...' : 'Book Appointment'}
          </button>
        </form>

        {confirmationMessage && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-md">
            <p>{confirmationMessage}</p>
          </div>
        )}

        {/* Link to View Appointments */}
        <div className="mt-4 text-center">
          <Link to="/view-appointment" className="text-blue-600 hover:underline">
            View Your Appointments
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BookAppointment;
