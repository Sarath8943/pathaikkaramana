import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaClock,
  FaPrayingHands,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-gray-300 py-10 md:py-16 w-full overflow-x-hidden border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Grid: മൊബൈലിൽ 1 കോളം, ടാബ്‌ലെറ്റിൽ 3 കോളം */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12 justify-items-center">
          
          {/* Section 1: Logo/Name */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start w-full">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <FaPrayingHands className="text-amber-400 text-2xl mr-3 shrink-0" />
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                {t("temple_full_name")}
              </h2>
            </div>
          </div>

          {/* Section 2: Contact Info */}
          <div className="flex flex-col items-center md:items-start w-full">
            <h3 className="text-lg font-semibold text-amber-400 mb-5 border-b border-amber-400/30 pb-1 w-full text-center md:text-left">
              {t("contact_info")}
            </h3>
            <ul className="space-y-4 text-sm w-full flex flex-col items-center md:items-start">
              <li className="flex items-center space-x-3">
                <FaPhoneAlt className="text-amber-400 shrink-0" />
                <a href="tel:+917306327251" className="hover:text-amber-400 transition">
                  +91 73063 27251
                </a>
              </li>
              <li className="flex items-center space-x-3 w-full justify-center md:justify-start px-2">
                <FaEnvelope className="text-amber-400 shrink-0" />
                <a href="mailto:pathaikkaramana@gmail.com" className="hover:text-amber-400 transition break-all text-center md:text-left">
                  pathaikkaramana@gmail.com
                </a>
              </li>
              <li className="flex items-start justify-center md:justify-start space-x-3 text-center md:text-left px-4 md:px-0">
                <FaMapMarkerAlt className="text-amber-400 mt-1 shrink-0" />
                <span className="max-w-[280px]">
                  {t("temple_location") || "Pathaikkara Mana, Perinthalmanna, Kerala 679322, India"}
                </span>
              </li>
            </ul>
          </div>

          {/* Section 3: Timings */}
          <div className="flex flex-col items-center md:items-start w-full">
            <h3 className="text-lg font-semibold text-amber-400 mb-5 border-b border-amber-400/30 pb-1 w-full text-center md:text-left">
              {t("temple_timings")}
            </h3>
            <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 w-full max-w-[300px]">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center gap-2">
                    <FaClock className="text-amber-400" /> {t("morning")}
                  </span>
                  <span className="bg-gray-700 px-2 py-1 rounded text-white font-mono">
                    6:00-8:30 AM
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center gap-2">
                    <FaClock className="text-amber-400" /> {t("evening")}
                  </span>
                  <span className="bg-gray-700 px-2 py-1 rounded text-white font-mono">
                    5:00-7:00 PM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center border-t border-gray-800 pt-8">
          <p className="text-xs text-gray-500 uppercase tracking-widest">
            © {new Date().getFullYear()} {t("temple_full_name")} | {t("all_rights_reserved")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;