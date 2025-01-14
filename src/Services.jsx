import React from "react";
import { Link } from "react-router-dom";
import { FaTooth, FaSmile, FaHeart } from "react-icons/fa";

const Services = () => {
  const services = [
    {
      icon: <FaTooth className="text-blue-600 text-5xl" />,
      title: "General Dentistry",
      description: "Regular checkups and cleanings to maintain a healthy smile.",
    },
    {
      icon: <FaSmile className="text-green-600 text-5xl" />,
      title: "Cosmetic Dentistry",
      description: "Enhance your smile with our whitening and aesthetic services.",
    },
    {
      icon: <FaHeart className="text-red-600 text-5xl" />,
      title: "Specialized Care",
      description: "Advanced treatments tailored to your unique dental needs.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-gray-800 font-poppins">
        
      {/* Header */}
      <header className="bg-white shadow-md py-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">Our Services</h1>
          <p className="text-gray-500 text-lg">
            Explore a range of dental services designed to keep your smile healthy and radiant.
          </p>
        </div>
      </header>

      {/* Services Section */}
      <section className="px-8 md:px-20 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
            >
              <div className="flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
                {service.title}
              </h2>
              <p className="text-gray-600 text-center leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-10 text-center rounded-md shadow-lg mx-8 md:mx-20">
        <h2 className="text-3xl font-semibold mb-4">
          Ready for a healthier smile?
        </h2>
        <Link to="/book-appointment">
          <button className="bg-white text-blue-500 font-semibold py-3 px-8 rounded-full shadow-md hover:bg-gray-100 transition duration-300">
            Book Your Appointment
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Services;
