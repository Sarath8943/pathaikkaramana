import React from "react";
import { motion } from "framer-motion";
import {
  FiImage,
  FiMail,
  FiCalendar,
  FiSettings,
  FiLogOut,
  FiPlus,
  FiCheckCircle,
} from "react-icons/fi";
import { HiOutlineSpeakerphone } from "react-icons/hi"; // അറിയിപ്പുകൾക്കായി

export const Overview = () => {
  const adminCards = [
    {
      id: 1,
      label: "ഫോട്ടോകൾ",
      value: "142",
      icon: <FiImage />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      id: 2,
      label: "മെസേജുകൾ",
      value: "12",
      icon: <FiMail />,
      color: "bg-amber-50 text-amber-600",
    },
    {
      id: 3,
      label: "അറിയിപ്പുകൾ",
      value: "05",
      icon: <HiOutlineSpeakerphone />,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div className="font-sans text-gray-900">
      {/* Top Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30 shadow-sm -mx-8 -mt-8 mb-8">
        <h1 className="text-xl font-bold tracking-tight text-amber-900 uppercase">
          Temple Admin
        </h1>
        <div className="flex items-center gap-4"></div>
      </nav>

      <main className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {adminCards.map((card) => (
              <div
                key={card.id}
                className="p-8 bg-white border border-gray-100 rounded-[32px] shadow-sm hover:shadow-md transition-all group"
              >
                <div
                  className={`w-14 h-14 flex items-center justify-center rounded-2xl mb-5 transition-transform group-hover:scale-110 ${card.color}`}
                >
                  {React.cloneElement(card.icon, { size: 28 })}
                </div>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">
                  {card.label}
                </p>
                <h3 className="text-3xl font-black mt-1">{card.value}</h3>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Gallery Section - Preview */}
            <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  ഗാലറി അപ്‌ഡേറ്റുകൾ
                </h3>
                <button className="text-amber-800 text-sm font-bold flex items-center gap-1">
                  കൂടുതൽ <FiPlus />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-100 rounded-2xl overflow-hidden relative group cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <FiImage size={24} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events / Calendar */}
            <div className="bg-amber-800 p-8 rounded-[32px] text-white shadow-xl shadow-amber-900/20">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <FiCalendar /> വരാനിരിക്കുന്നവ
              </h3>
              <div className="space-y-6">
                <div className="border-l-2 border-amber-400 pl-4">
                  <p className="text-xs text-amber-200 font-bold uppercase">
                    ഏപ്രിൽ 30
                  </p>
                  <p className="font-bold text-lg">പ്രതിഷ്ഠാ ദിനം</p>
                </div>
                <div className="border-l-2 border-amber-400/30 pl-4 opacity-70">
                  <p className="text-xs text-amber-200 font-bold uppercase">
                    മേയ് 05
                  </p>
                  <p className="font-bold text-lg">വിഷു മഹോത്സവം</p>
                </div>
                <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-colors">
                  കലണ്ടർ നോക്കാം
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Overview;
