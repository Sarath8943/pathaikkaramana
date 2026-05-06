import React from "react";
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
      <main className="mx-auto max-w-6xl">
        <div>
          {/* Stats Grid */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mb-10 lg:grid-cols-3 lg:gap-6">
            {adminCards.map((card) => (
              <div
                key={card.id}
                className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-md sm:p-6 lg:rounded-3xl lg:p-8"
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 sm:h-14 sm:w-14 ${card.color}`}
                >
                  {React.cloneElement(card.icon, { size: 28 })}
                </div>
                <p className="break-words text-xs font-bold tracking-widest text-gray-400 uppercase sm:text-sm">
                  {card.label}
                </p>
                <h3 className="text-3xl font-black mt-1">{card.value}</h3>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
            {/* Gallery Section - Preview */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6 lg:col-span-2 lg:rounded-3xl lg:p-8">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="break-words text-lg font-bold text-gray-800 sm:text-xl">
                  ഗാലറി അപ്‌ഡേറ്റുകൾ
                </h3>
                <button className="flex items-center gap-1 self-start text-sm font-bold text-amber-800 sm:self-auto">
                  കൂടുതൽ <FiPlus />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl bg-gray-100"
                  >
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 transition-opacity group-hover:opacity-100">
                      <FiImage size={24} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events / Calendar */}
            <div className="rounded-2xl bg-amber-800 p-5 text-white shadow-xl shadow-amber-900/20 sm:p-6 lg:rounded-3xl lg:p-8">
              <h3 className="mb-6 flex items-center gap-2 text-lg font-bold sm:text-xl">
                <FiCalendar /> വരാനിരിക്കുന്നവ
              </h3>
              <div className="space-y-6">
                <div className="border-l-2 border-amber-400 pl-4">
                  <p className="text-xs font-bold text-amber-200 uppercase">
                    ഏപ്രിൽ 30
                  </p>
                  <p className="font-bold text-lg">പ്രതിഷ്ഠാ ദിനം</p>
                </div>
                <div className="border-l-2 border-amber-400/30 pl-4 opacity-70">
                  <p className="text-xs font-bold text-amber-200 uppercase">
                    മേയ് 05
                  </p>
                  <p className="font-bold text-lg">വിഷു മഹോത്സവം</p>
                </div>
                <button className="w-full rounded-xl bg-white/10 py-3 text-sm font-bold transition-colors hover:bg-white/20">
                  കലണ്ടർ നോക്കാം
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Overview;
