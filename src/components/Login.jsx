import React, { useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { GoLock } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("");

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "email") {
      setEmail(value);
    } else if (id === "password") {
      setPassword(value);
    }
  };

  // Handle role selection changes (radio buttons)
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  // Handle login (check credentials in localStorage)
  const handleLogin = (e) => {
    e.preventDefault();

    // Check if email and password are provided
    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    // Check if the email format is valid
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Retrieve registered users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = existingUsers.find((user) => user.email === email && user.password === password);

    if (user) {
      if (role === "staff") {
        // Navigate to staff dashboard
        navigate("/admin/dashboard");
      } else if (role === "patient") {
        // Navigate to patient home page
        navigate("/home");
      } else {
        setError("Please select your role (Staff or Patient).");
      }
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  // Navigate to register page
  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/uthm-bg3.jpg')] bg-cover bg-center">
      <div className="bg-white px-8 pt-4 pb-8 rounded-lg shadow-lg max-w-sm w-full mt-20">
        <div className="flex justify-center mt-[-30px]">
          <img src="./public/pku-logo.png" alt="Pku Logo" className="h-40 w-auto" />
        </div>
        <h2 className="text-2xl font-poppins mt-[-20px] mb-2 text-center">Login</h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <input
                type="text"
                id="email"
                value={email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
              <IoPersonOutline className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
              <GoLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Select Role</label>
            <div className="flex items-center">
              <input
                type="radio"
                id="staff"
                name="role"
                value="staff"
                checked={role === "staff"}
                onChange={handleRoleChange}
                className="mr-2"
              />
              <label htmlFor="staff" className="mr-4">Staff</label>

              <input
                type="radio"
                id="patient"
                name="role"
                value="patient"
                checked={role === "patient"}
                onChange={handleRoleChange}
                className="mr-2"
              />
              <label htmlFor="patient">Patient</label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={handleRegisterRedirect}
              className="text-blue-500 hover:underline"
            >
              Don't have an account? Register here
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
