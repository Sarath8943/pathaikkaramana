const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-amber-800 mb-6">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-amber-800">
          <h3 className="text-gray-500">Total Users</h3>
          <p className="text-3xl font-bold mt-2 text-amber-800">1,250</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-amber-800">
          <h3 className="text-gray-500">Orders</h3>
          <p className="text-3xl font-bold mt-2 text-amber-800">320</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-amber-800">
          <h3 className="text-gray-500">Revenue</h3>
          <p className="text-3xl font-bold mt-2 text-amber-800">$12,500</p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;