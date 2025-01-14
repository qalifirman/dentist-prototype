import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppointmentsProvider } from "./AppointmentsContext";
import LoginPage from "./components/Login";
import RegisterPage from "./RegisterPage";
import HomePage from "./HomePage";
import BookAppointment from "./BookAppointment";
import ViewAppointment from "./ViewAppointment";
import Services from "./Services";
import Layout from "./components/Layout";
import AdminDashboard from "./Admin/AdminDashboard";
import AppointmentsManagement from "./Admin/AppointmentsManagement";
import PatientManagement from "./Admin/PatientManagement";
import AdminLayout from "./Admin/AdminLayout";

const App = () => {
  return (
    <AppointmentsProvider>
      <Router>
        <Routes>
          {/* Route for LoginPage (does not need the layout) */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Routes that need the layout */}
          <Route element={<Layout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route path="/view-appointment" element={<ViewAppointment />} />
            <Route path="/services" element={<Services />} />
          </Route>

          {/* Admin Routes (uses AdminLayout) */}
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/appointments" element={<AppointmentsManagement />} />
            <Route path="/admin/patients" element={<PatientManagement />} />
          </Route>
        </Routes>
      </Router>
    </AppointmentsProvider>
  );
};

export default App;
