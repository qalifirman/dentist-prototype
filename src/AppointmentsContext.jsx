import React, { createContext, useState, useContext } from 'react';

// Create the context
const AppointmentsContext = createContext();

// Custom hook to use the context
export const useAppointments = () => {
  return useContext(AppointmentsContext);
};

// AppointmentsProvider component to provide the context value
export const AppointmentsProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  const addAppointment = (appointment) => {
    // Ensure the new appointment has a status of "Pending" by default
    const newAppointment = { ...appointment, status: "Pending" };
    setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
  };

  const removeAppointment = (id) => {
    setAppointments((prevAppointments) =>
      prevAppointments.filter((appointment) => appointment.id !== id)
    );
  };

  const updateAppointment = (id, newDate, newTime) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, date: newDate, time: newTime }
          : appointment
      )
    );
  };

  const updateAppointmentStatus = (id, newStatus) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: newStatus }
          : appointment
      )
    );
  };

  return (
    <AppointmentsContext.Provider
      value={{
        appointments,
        addAppointment,
        removeAppointment,
        updateAppointment,
        updateAppointmentStatus, // Provide the new function
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
};
