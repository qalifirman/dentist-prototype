import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CgMenu } from "react-icons/cg";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineDashboard, MdOutlineCalendarToday, MdKeyboardArrowDown } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { LiaToothSolid } from "react-icons/lia";
import { Outlet } from "react-router-dom"; // This will render child routes

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("AdminDashboard");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const sidebarRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const modalRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const toggleProfileModal = () => {
    setIsProfileModalOpen(!isProfileModalOpen);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isSidebarOpen) {
        setIsSidebarOpen(false);
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
            <Link to="/admin/dashboard">
              <img
                src="/pku-logo.png"
                alt="Admin Logo"
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
            src="/profilelogo.png"
            alt="Profile"
            className="h-10 w-10 rounded-lg shadow-lg object-cover"
          />
          <div className="ml-4">
            <p className="font-semibold text-sm">Admin Name</p>
            <p className="text-xs text-gray-600">example@admin.com</p>
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
          <img src="/pku-logo.png" alt="Admin Logo" className="h-16 w-auto" />
          <IoCloseOutline
            onClick={toggleSidebar}
            className="text-gray-600 text-3xl cursor-pointer hover:text-gray-800"
          />
        </div>
        <div className="p-4 space-y-4">
          <nav className="space-y-4">
            <ul className="cursor-pointer space-y-4">
              <Link to="/admin/dashboard">
                <li
                  className={`flex items-center space-x-4 px-3 py-2 rounded-md ${activeLink === "AdminDashboard" ? "bg-gray-300" : "hover:bg-gray-200"} transition-all`}
                  onClick={() => setActiveLink("AdminDashboard")}
                >
                  <MdOutlineDashboard className="text-xl" />
                  {isSidebarOpen && <span className="text-sm font-medium">Dashboard</span>}
                </li>
              </Link>
              <div></div>

              <Link to="/admin/appointments">
                <li
                  className={`flex items-center space-x-4 px-3 py-2 rounded-md ${activeLink === "Appointments" ? "bg-gray-300" : "hover:bg-gray-200"} transition-all`}
                  onClick={() => setActiveLink("Appointments")}
                >
                  <MdOutlineCalendarToday className="text-xl" />
                  {isSidebarOpen && <span className="text-sm font-medium">Appointments</span>}
                </li>
              </Link>
              <div></div>

              <Link to="/admin/patients">
                <li
                  className={`flex items-center space-x-4 px-3 py-2 rounded-md ${activeLink === "Patients" ? "bg-gray-300" : "hover:bg-gray-200"} transition-all`}
                  onClick={() => setActiveLink("Patients")}
                >
                  <LiaToothSolid className="text-xl" />
                  {isSidebarOpen && <span className="text-sm font-medium">Patients</span>}
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
                src="/profilelogo.png"
                alt="Profile"
                className="h-24 w-24 rounded-full object-cover mb-4"
              />
              <div className="text-center w-full mb-4">
                <p className="font-semibold text-xl text-gray-800 mb-2">Admin Name</p>
                <p className="text-gray-600 text-lg">example@admin.com</p>
              </div>
              <div className="border-t border-gray-300 w-full mt-4 pt-4 flex items-center justify-between space-x-4">
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
