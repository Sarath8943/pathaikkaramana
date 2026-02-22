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
    <footer className="bg-gray-900 text-gray-300 py-12 w-full border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Grid: items-start added for top alignment on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:items-start">
          
          {/* 1. Temple Name Section - Always Row aligned */}
          <div className="flex flex-row items-center justify-center md:justify-start gap-3">
            <FaPrayingHands className="text-amber-400 text-3xl md:text-4xl shrink-0" />
            <h2 className="font-bold text-white uppercase tracking-wider whitespace-nowrap text-[15px] sm:text-lg md:text-xl">
              {t("temple_full_name")}
            </h2>
          </div>

          {/* 2. Contact Info Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-amber-400 mb-6 border-b border-amber-400/30 pb-2 w-full max-w-[300px] md:max-w-none text-center md:text-left">
              {t("contact_info")}
            </h3>
            <ul className="space-y-4 text-sm w-full max-w-[300px] md:max-w-none">
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-amber-400 shrink-0" />
                <a href="tel:+917306327251" className="hover:text-amber-400 transition">+91 73063 27251</a>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="text-green-500 shrink-0 text-lg" />
                <a href="https://wa.me/917306327251" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition">WhatsApp</a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-amber-400 shrink-0" />
                <a href="mailto:pathaikkaramana@gmail.com" className="hover:text-amber-400 transition break-all">pathaikkaramana@gmail.com</a>
              </li>
              <li className="flex items-start gap-3 text-left">
                <FaMapMarkerAlt className="text-amber-400 mt-1 shrink-0" />
                <span className="leading-relaxed">{t("temple_location")}</span>
              </li>
            </ul>
          </div>

          {/* 3. Temple Timings Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-amber-400 mb-6 border-b border-amber-400/30 pb-2 w-full max-w-[300px]">
              {t("temple_timings")}
            </h3>
            <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700 w-full max-w-[300px]">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <FaClock className="text-amber-400" /> {t("morning")}
                  </span>
                  <span className="bg-gray-700 px-3 py-1 rounded text-white font-mono whitespace-nowrap ml-2">6:00-8:30 AM</span>
                </div>
                <div className="flex items-center justify-between text-sm border-t border-gray-700 pt-3">
                  <span className="flex items-center gap-2">
                    <FaClock className="text-amber-400" /> {t("evening")}
                  </span>
                  <span className="bg-gray-700 px-3 py-1 rounded text-white font-mono whitespace-nowrap ml-2">5:00-7:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center border-t border-gray-800 mt-12 pt-8">
          <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest leading-relaxed">
            © {new Date().getFullYear()} {t("temple_full_name")} | {t("all_rights_reserved")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;