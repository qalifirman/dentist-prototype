import { useState } from "react";
import { useAppointments } from "../AppointmentsContext";
import { CiSearch } from "react-icons/ci";

const PatientManagement = () => {
  const { appointments } = useAppointments();
  
  // State for search query
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter the appointments based on the search query
  const filteredAppointments = appointments.filter((appointment) =>
    appointment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    appointment.date.toLowerCase().includes(searchQuery.toLowerCase()) || // You can also search by appointment date
    appointment.service.toLowerCase().includes(searchQuery.toLowerCase()) // Or by service
  );

  return (
    <div className="p-6 font-poppins bg-gray-50 rounded-lg shadow-lg relative">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Patient Management</h2>

      {/* Search Bar */}
      <div className="absolute top-6 right-6 flex items-center">
        <div className="relative">
          <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Patient Name, Date, or Service"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto mt-12">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">All Patients</h3>
        <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-6 py-3 text-left font-medium">Patient Name</th>
              <th className="px-6 py-3 text-left font-medium">Appointment Date</th>
              <th className="px-6 py-3 text-left font-medium">Appointment Time</th>
              <th className="px-6 py-3 text-left font-medium">Service</th>
              <th className="px-6 py-3 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map(({ id, name, date, time, service, status }) => (
              <tr key={id} className="hover:bg-gray-50 transition duration-300 ease-in-out">
                <td className="px-6 py-4 text-gray-700">{name}</td>
                <td className="px-6 py-4 text-gray-700">{date}</td>
                <td className="px-6 py-4 text-gray-700">{time}</td>
                <td className="px-6 py-4 text-gray-700">{service}</td>
                <td className="px-6 py-4">
                  <span
                    className={`py-1 px-3 rounded-full text-sm ${
                      status === "Confirmed"
                        ? "bg-green-100 text-green-600"
                        : status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientManagement;
