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
    <footer className="bg-gray-900 text-gray-300 py-10 w-full border-t border-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Mobile (1 col) -> Desktop (3 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-10">
          
          {/* 1. Temple Name Section */}
          <div className="flex flex-col items-center md:items-start justify-center text-center md:text-left w-full">
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
              <FaPrayingHands className="text-amber-400 text-4xl md:text-5xl shrink-0" />
              {/* Added whitespace-nowrap and responsive text sizes here */}
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-white uppercase tracking-wider whitespace-nowrap">
                {t("temple_full_name")}
              </h2>
            </div>
          </div>

          {/* 2. Contact Info Section */}
          <div className="flex flex-col items-center md:items-start w-full">
            <div className="w-full max-w-xs md:max-w-none">
              <h3 className="text-lg font-semibold text-amber-400 mb-5 border-b border-amber-400/30 pb-2 text-center md:text-left">
                {t("contact_info")}
              </h3>
              <ul className="space-y-4 text-sm w-full">
                <li className="flex items-center gap-3 justify-start">
                  <FaPhoneAlt className="text-amber-400 shrink-0 text-base" />
                  <a href="tel:+917306327251" className="hover:text-amber-400 transition">
                    +91 73063 27251
                  </a>
                </li>
                <li className="flex items-center gap-3 justify-start">
                  <FaWhatsapp className="text-green-500 shrink-0 text-base" />
                  <a href="https://wa.me/917306327251" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition">
                    WhatsApp
                  </a>
                </li>
                <li className="flex items-center gap-3 justify-start">
                  <FaEnvelope className="text-amber-400 shrink-0 text-base" />
                  <a href="mailto:pathaikkaramana@gmail.com" className="hover:text-amber-400 transition break-all">
                    pathaikkaramana@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-3 justify-start">
                  <FaMapMarkerAlt className="text-amber-400 mt-1 shrink-0 text-base" />
                  <span>{t("temple_location")}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 3. Temple Timings Section */}
          <div className="flex flex-col items-center md:items-start w-full">
            <div className="w-full max-w-xs md:max-w-none">
              <h3 className="text-lg font-semibold text-amber-400 mb-5 border-b border-amber-400/30 pb-2 text-center md:text-left">
                {t("temple_timings")}
              </h3>
              <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700 w-full shadow-sm">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <FaClock className="text-amber-400 shrink-0" /> {t("morning")}
                    </span>
                    <span className="bg-gray-700 px-2 py-1 rounded text-white font-mono text-xs sm:text-sm whitespace-nowrap ml-2">
                      6:00-8:30 AM
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm border-t border-gray-700 pt-4">
                    <span className="flex items-center gap-2">
                      <FaClock className="text-amber-400 shrink-0" /> {t("evening")}
                    </span>
                    <span className="bg-gray-700 px-2 py-1 rounded text-white font-mono text-xs sm:text-sm whitespace-nowrap ml-2">
                      5:00-7:00 PM
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="text-center border-t border-gray-800 pt-6 pb-2">
          <p className="text-xs text-gray-500 uppercase tracking-widest">
            © {new Date().getFullYear()} {t("temple_full_name")} | {t("all_rights_reserved")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;