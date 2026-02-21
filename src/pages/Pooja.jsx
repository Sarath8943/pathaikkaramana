import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const Pooja = () => {
  const { t, i18n } = useTranslation();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev === 0 ? 1 : 0));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const morningList =
    t("pooja_timings_section.morningPoojas", { returnObjects: true }) || [];
  const eveningList =
    t("pooja_timings_section.eveningPoojas", { returnObjects: true }) || [];

  return (
    <div className="min-h-screen  bg-slate-50">
      <div className="relative bg-linear-to-r text-black py-12 px-4 overflow-hidden">
        <div className="relative w-full h-162.5 md:h-187.5 lg:h-212.5 rounded-lg overflow-hidden bg-black shadow-2xl">
          <img
            src="/pathaikkara.jpg"
            alt="Temple"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === 0 ? "opacity-100" : "opacity-0"}`}
          />
          <img
            src="/pathikkara manna.jpg"
            alt="Temple"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === 1 ? "opacity-100" : "opacity-0"}`}
          />
        </div>
      </div>

      <div className="relative text-center max-w-4xl mx-auto mt-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight text-gray-800">
          {t("pooja_timings_section.title")}
        </h1>
        <div className="w-24 h-1 mx-auto mb-3 bg-gray-300"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <div className="transform hover:scale-[1.01] transition-transform duration-300">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border-t-4 border-indigo-600">
            <div className="bg-linear-to-r from-orange-100 to-amber-100 px-4 py-3 flex items-center">
              <h2 className="text-xl font-semibold tracking-wide">
                {t("pooja_timings_section.morning")}
              </h2>
            </div>
            <div className="p-4">
              <div className="grid gap-3">
                {Array.isArray(morningList) &&
                  morningList.map((pooja, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-2 px-3 rounded-md hover:bg-orange-50 transition-colors border-l-4 border-orange-200"
                    >
                      <span className="text-sm text-gray-800 font-medium">
                        {pooja.name}
                      </span>
                      <span className="font-mono text-sm text-indigo-700 font-semibold bg-orange-50 px-2 py-1 rounded-md">
                        {pooja.time}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="transform hover:scale-[1.01] transition-transform duration-300">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border-t-4 border-indigo-600">
            <div className="bg-linear-to-r from-indigo-100 to-purple-100 px-4 py-3 flex items-center">
              <h2 className="text-xl font-semibold tracking-wide">
                {t("pooja_timings_section.evening")}
              </h2>
            </div>
            <div className="p-4">
              <div className="grid gap-3">
                {Array.isArray(eveningList) &&
                  eveningList.map((pooja, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-2 px-3 rounded-md hover:bg-indigo-50 transition-colors border-l-4 border-indigo-200"
                    >
                      <span className="text-sm text-gray-800 font-medium">
                        {pooja.name}
                      </span>
                      <span className="font-mono text-sm text-indigo-700 font-semibold bg-indigo-50 px-2 py-1 rounded-md">
                        {pooja.time}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-linear-to-r from-amber-100 to-yellow-100 rounded-2xl shadow-md p-4 border-l-4 border-amber-500">
          <div className="flex items-start gap-3">
            <div className="text-2xl">⚠️</div>
            <div>
              <h3 className="text-sm font-semibold text-amber-900 mb-1">
                {t("pooja_timings_section.noticeTitle")}
              </h3>
              <p className="text-xs text-amber-800 leading-snug">
                {t("pooja_timings_section.noticeDesc")}
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 py-6">
          <img
            src="/Bhagawathy.jpg"
            alt="Deity"
            className="mx-auto w-12 h-12 mb-2 rounded-full object-cover shadow-md border-2 border-amber-400"
          />
          <p className="text-sm text-gray-600 font-medium">
            {t("pooja_timings_section.footerText")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pooja;
