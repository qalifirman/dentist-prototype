import React, { useState, useEffect, useRef } from "react";
import { MdOutlineCalendarToday, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { LuClipboardList } from "react-icons/lu";
import { FaBrush, FaTooth, FaBan, FaLeaf } from "react-icons/fa";

const HomePage = () => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  
  const profileDropdownRef = useRef(null);

  const testimonials = [
    {
      name: "John Doe",
      testimonial:
        "The service here is exceptional. The team really made me feel comfortable during my visit. Highly recommend!",
      role: "Patient",
    },
    {
      name: "Jane Smith",
      testimonial:
        "I’ve never had a better experience at a dental clinic. The staff is friendly, and the environment is so relaxing.",
      role: "Patient",
    },
    {
      name: "Ali Bin Ahmad",
      testimonial:
        "A truly professional experience. I trust them for all my dental needs. The staff and doctors are top-notch!",
      role: "Patient",
    },
  ];

  const nextTestimonial = () => {
    setTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const healthTips = [
    { icon: <FaBrush />, color: 'blue', title: 'Brush Your Teeth Twice a Day', description: 'Brushing helps remove plaque, preventing tooth decay and gum disease. Use fluoride toothpaste for stronger teeth.' },
    { icon: <FaTooth />, color: 'green', title: 'Regular Checkups', description: 'Schedule regular dental checkups every 6 months to keep your smile healthy and catch any potential issues early.' },
    { icon: <FaBan />, color: 'red', title: 'Avoid Sugary Snacks and Drinks', description: 'Sugary foods and drinks can lead to cavities and tooth decay. Choose healthier alternatives for a better smile!' },
    { icon: <FaLeaf />, color: 'yellow', title: 'Maintain a Healthy Diet', description: 'Eating a balanced diet rich in vitamins and minerals supports healthy teeth and gums. Don’t forget your vegetables!' }
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-gray-800 font-poppins relative">

      {/* Content */}
      <section className="px-8 md:px-20 mt-6 space-y-8">
        {/* Personalized Greeting */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, Muhammad Qalif Irman!
          </h1>
          <p className="text-gray-600 mt-2">Here's your dashboard overview:</p>
        </div>

        {/* Appointment Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Combined Appointment Cards */}
          <div className="bg-white p-6 shadow-md hover:shadow-lg rounded-lg text-center">
            <MdOutlineCalendarToday className="text-4xl text-blue-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700">Next Appointment</h2>
            <p className="text-gray-500 mt-2">Monday, 25th December 2024</p>
            <p className="text-gray-500">10:00 AM with Dr. Aida Zainal</p>
          </div>

          <div className="bg-white p-6 shadow-md hover:shadow-lg rounded-lg text-center">
            <LuClipboardList className="text-4xl text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700">Upcoming Appointments</h2>
            <p className="text-gray-500 mt-2">3 Appointments</p>
            <ul className="list-disc list-inside text-gray-500 mt-2">
              <li>John Doe - 26th Dec, 10:00 AM</li>
              <li>Jane Smith - 28th Dec, 11:00 AM</li>
              <li>Ali Bin Ahmad - 30th Dec, 1:00 PM</li>
            </ul>
          </div>

          <div className="bg-white p-6 shadow-md hover:shadow-lg rounded-lg text-center">
            <LuClipboardList className="text-4xl text-yellow-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700">Total Appointments</h2>
            <p className="text-gray-500 mt-2">This Month: 25</p>
            <p className="text-gray-500">Overall: 230</p>
          </div>
        </div>

        {/* Health Tips */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Health Tips</h2>
          <div className="space-y-6">
            {healthTips.map((tip, index) => (
              <div key={index} className={`flex items-start space-x-4 p-4 bg-${tip.color}-50 hover:bg-${tip.color}-100 transition-all rounded-lg shadow-lg hover:scale-105 transform duration-300 ease-in-out`}>
                <div className={`text-${tip.color}-500 text-3xl transition-transform transform hover:scale-125`}>
                  {tip.icon}
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 text-lg">{tip.title}</h3>
                  <p className="text-gray-500 mt-2">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Testimonials Carousel */}
        <div className="bg-white p-6 shadow-md rounded-lg mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">What Our Patients Say</h2>
          <div className="relative text-center">
            <div className="text-gray-800 italic">
              <p className="text-lg font-medium">“{testimonials[testimonialIndex].testimonial}”</p>
              <p className="mt-4 text-sm text-gray-500">
                - {testimonials[testimonialIndex].name}, <span className="text-gray-400">{testimonials[testimonialIndex].role}</span>
              </p>
            </div>
            <div className="absolute top-0 left-0 right-0 flex justify-between w-full mt-6">
              <button
                onClick={prevTestimonial}
                className="text-gray-600 text-3xl p-2 hover:text-gray-800"
              >
                <MdKeyboardArrowLeft />
              </button>
              <button
                onClick={nextTestimonial}
                className="text-gray-600 text-3xl p-2 hover:text-gray-800"
              >
                <MdKeyboardArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
