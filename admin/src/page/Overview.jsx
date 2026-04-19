import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiUploadCloud, FiSettings, FiLogOut } from 'react-icons/fi';

 export const Overview = () => {
  const stats = [
    { id: 1, label: 'Total Users', value: '1,250', icon: <FiUsers /> },
    { id: 2, label: 'Media Uploads', value: '450', icon: <FiUploadCloud /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <nav className="flex items-center justify-between px-8 py-6 bg-white border-b border-gray-100">
        <h1 className="text-xl font-semibold tracking-tight">Admin Console</h1>
        <div className="flex items-center gap-6">
          <button className="p-2 text-gray-500 hover:text-black transition-colors">
            <FiSettings size={20} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-all">
            <FiLogOut size={16} />
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto mt-12 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header className="mb-10">
            <h2 className="text-3xl font-bold">Welcome back, Admin</h2>
            <p className="text-gray-500 mt-2">Here is what's happening with your projects today.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {stats.map((stat) => (
              <div 
                key={stat.id} 
                className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl mb-4 text-gray-700">
                  {stat.icon}
                </div>
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
            ))}
            
            <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl flex flex-col justify-center items-center cursor-pointer hover:bg-blue-100 transition-colors">
              <span className="text-blue-600 font-medium">+ New Upload</span>
            </div>
          </div>

          <section className="bg-white border border-gray-100 rounded-2xl p-8">
            <h3 className="text-lg font-semibold mb-6">Recent Activity</h3>
            <div className="space-y-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <p className="text-sm text-gray-600">Database connection successful</p>
                  </div>
                  <span className="text-xs text-gray-400">2 mins ago</span>
                </div>
              ))}
            </div>
          </section>
        </motion.div>
      </main>
    </div>
  );
};

export default Overview;
