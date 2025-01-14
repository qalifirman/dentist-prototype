const AdminDashboard = () => {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Admin Dashboard</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card for Upcoming Appointments */}
          <div className="bg-white p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-medium text-gray-700">Upcoming Appointments</h3>
              <p className="mt-3 text-2xl text-blue-600 font-bold">5</p>
            </div>
            <button className="mt-4 text-sm text-blue-500 hover:underline">View Details</button>
          </div>
  
          {/* Card for Total Patients */}
          <div className="bg-white p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-medium text-gray-700">Total Patients</h3>
              <p className="mt-3 text-2xl text-green-600 font-bold">120</p>
            </div>
            <button className="mt-4 text-sm text-green-500 hover:underline">Manage Patients</button>
          </div>
  
          {/* Card for Services Booked */}
          <div className="bg-white p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-medium text-gray-700">Services Booked</h3>
              <p className="mt-3 text-2xl text-purple-600 font-bold">50</p>
            </div>
            <button className="mt-4 text-sm text-purple-500 hover:underline">View Services</button>
          </div>
        </div>
  
        {/* Data Analytics Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col justify-between">
            <h3 className="text-xl font-medium text-gray-700">Appointment Trends</h3>
            <div className="h-48 mt-4 bg-gradient-to-r from-green-200 to-green-400 rounded-lg"></div> {/* Placeholder for chart */}
            <p className="mt-2 text-sm text-gray-500">Track the number of appointments over time</p>
          </div>
  
          <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col justify-between">
            <h3 className="text-xl font-medium text-gray-700">Patients Growth</h3>
            <div className="h-48 mt-4 bg-gradient-to-r from-blue-200 to-blue-400 rounded-lg"></div> {/* Placeholder for chart */}
            <p className="mt-2 text-sm text-gray-500">Monitor the growth of patient sign-ups</p>
          </div>
  
          <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col justify-between">
            <h3 className="text-xl font-medium text-gray-700">Services Analysis</h3>
            <div className="h-48 mt-4 bg-gradient-to-r from-purple-200 to-purple-400 rounded-lg"></div> {/* Placeholder for chart */}
            <p className="mt-2 text-sm text-gray-500">Analyze popular services booked by patients</p>
          </div>
        </div>
  
        {/* Notifications Section */}
        <div className="mt-12 bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-medium text-gray-700">Recent Notifications</h3>
          <ul className="mt-4 space-y-2">
            <li className="text-sm text-gray-600">Patient John Doe booked an appointment for Cleaning.</li>
            <li className="text-sm text-gray-600">Service "Teeth Whitening" is now available for booking.</li>
            <li className="text-sm text-gray-600">Appointment reminder sent for Jane Smith on 12/30.</li>
          </ul>
          <button className="mt-4 text-sm text-blue-500 hover:underline">View All Notifications</button>
        </div>
      </div>
    );
  };
  
  export default AdminDashboard;
  