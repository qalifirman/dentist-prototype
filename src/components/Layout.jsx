import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CgMenu } from "react-icons/cg";
import { IoCloseOutline } from "react-icons/io5";
import { LiaToothSolid } from "react-icons/lia";
import { GoHome } from "react-icons/go";
import { LuClipboardList } from "react-icons/lu";
import { MdOutlineCalendarToday, MdKeyboardArrowDown } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { Outlet } from "react-router-dom"; // This will render child routes

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Dashboard");
  const [isAppointmentDropdownOpen, setIsAppointmentDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);  // New state for profile modal
  
  const [name, setName] = useState("MUHAMMAD QALIF IRMAN BIN MOHD FAHMY");
  const [studentId, setStudentId] = useState("DI230114");
  const [email, setEmail] = useState("qalifirman@gmail.com");

  const sidebarRef = useRef(null); // Ref for the sidebar
  const profileDropdownRef = useRef(null);
  const modalRef = useRef(null);  // Ref for the modal

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleAppointmentDropdown = () => {
    setIsAppointmentDropdownOpen(!isAppointmentDropdownOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const toggleProfileModal = () => {
    setIsProfileModalOpen(!isProfileModalOpen);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Handle profile update logic (e.g., save to the backend, update state, etc.)
    console.log("Profile updated:", { name, email });
    // Close modal after updating
    setIsProfileModalOpen(false);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isSidebarOpen) {
        setIsSidebarOpen(false); // Close the sidebar when clicking outside
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsProfileModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-gray-800 font-poppins relative">
      {/* Header */}
      <header className="flex items-center justify-between bg-white p-4 shadow-md h-20">
        <div className="flex items-center space-x-4">
          {!isSidebarOpen && (
            <Link to="/home">
              <img
                src="/pku-logo.png"
                alt="PKU Logo"
                className="h-16 w-auto"
              />
            </Link>
          )}
          <button
            onClick={toggleSidebar}
            className="text-black text-2xl"
            aria-label="Toggle Sidebar"
          >
            {isSidebarOpen ? <IoCloseOutline /> : <CgMenu />}
          </button>
        </div>

        {/* Profile Section */}
        <div className="flex items-center space-x-4 cursor-pointer relative" onClick={toggleProfileDropdown}>
          <img
            src="/profile.png"
            alt="Profile"
            className="h-10 w-10 rounded-lg shadow-lg object-cover"
          />
          <div className="ml-4">
            <p className="font-semibold text-sm">{name}</p>
            <p className="text-xs text-gray-600">{studentId}</p>
          </div>
          <MdKeyboardArrowDown />
          
          {/* Profile Dropdown */}
          {isProfileDropdownOpen && (
            <div ref={profileDropdownRef} className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md z-50" style={{ top: '40px' }}>
              <ul>
                <li className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer" onClick={toggleProfileModal}>Profile</li>
                <Link to="/">
                  <li className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer">Logout</li>
                </Link>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full bg-gray-100 text-gray-800 shadow-lg ${isSidebarOpen ? "w-64" : "w-0"} transition-all duration-300 ease-in-out overflow-hidden z-40`}
      >
        <div className="bg-white flex items-center justify-between h-20 px-4 shadow-md">
          <img src="/pku-logo.png" alt="PKU Logo" className="h-16 w-auto" />
          <IoCloseOutline
            onClick={toggleSidebar}
            className="text-gray-600 text-3xl cursor-pointer hover:text-gray-800"
          />
        </div>
        <div className="p-4 space-y-4">
          <nav>
            <ul className="cursor-pointer space-y-4">
              <Link to="/home">
                <li
                  className={`flex items-center space-x-4 px-3 py-2 rounded-md ${activeLink === "Dashboard" ? "bg-gray-300" : "hover:bg-gray-200"} transition-all`}
                  onClick={() => setActiveLink("Dashboard")}
                >
                  <GoHome className="text-xl" />
                  {isSidebarOpen && <span className="text-sm font-medium">Dashboard</span>}
                </li>
              </Link>
              <li
                className={`flex items-center space-x-4 px-3 py-2 rounded-md ${activeLink === "Appointment" || activeLink.includes("Appointment") ? "bg-gray-300" : "hover:bg-gray-200"} transition-all`}
                onClick={toggleAppointmentDropdown}
              >
                <LiaToothSolid className="text-xl" />
                {isSidebarOpen && (
                  <div className="flex items-center justify-between w-full">
                    <span className="text-sm font-medium">Appointment</span>
                    <MdKeyboardArrowDown
                      className={`text-sm text-gray-600 transition-transform ${isAppointmentDropdownOpen ? "rotate-180" : "rotate-0"}`}
                    />
                  </div>
                )}
              </li>
              {isAppointmentDropdownOpen && isSidebarOpen && (
                <ul className="ml-8 mt-2 space-y-2">
                  <Link to="/book-appointment" className="text-sm font-medium">
                    <li
                      className={`flex items-center space-x-4 px-3 py-2 rounded-md ${activeLink === "BookAppointment" ? "bg-gray-300" : "hover:bg-gray-200"} transition-all`}
                      onClick={() => setActiveLink("BookAppointment")}
                    >
                      <span className="text-sm font-medium">Book Appointment</span>
                    </li>
                  </Link>
                  <Link to="/view-appointment" className="text-sm font-medium">
                    <li
                      className={`flex items-center space-x-4 px-3 py-2 rounded-md ${activeLink === "ViewAppointment" ? "bg-gray-300" : "hover:bg-gray-200"} transition-all`}
                      onClick={() => setActiveLink("ViewAppointment")}
                    >
                      <span className="text-sm font-medium">View Appointment</span>
                    </li>
                  </Link>
                </ul>
              )}

              <div className=""></div>
              <Link to="/services" className="text-sm font-medium">
                <li
                  className={`flex items-center space-x-4 px-3 py-2 rounded-md ${activeLink === "Services" ? "bg-gray-300" : "hover:bg-gray-200"} transition-all`}
                  onClick={() => setActiveLink("Services")}
                >
                  <LuClipboardList className="text-xl" />
                  {isSidebarOpen && <span className="text-sm font-medium">Services</span>}
                </li>
              </Link>
            </ul>
          </nav>
        </div>
      </div>

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-xl shadow-xl max-w-[400px] w-full flex flex-col relative"
          >
            <button
              onClick={toggleProfileModal}
              className="absolute top-4 right-4 text-xl text-gray-600 hover:text-gray-800 transition"
            >
              <IoCloseOutline />
            </button>
            <div className="flex flex-col items-center mb-4">
              <img
                src="/profile.png"
                alt="Profile"
                className="h-24 w-24 rounded-full object-cover mb-4"
              />
              <div className="w-full mb-4">
                <form onSubmit={handleProfileUpdate}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium">Name</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600">
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <Outlet />
    </div>
  );
};

export default Layout;
