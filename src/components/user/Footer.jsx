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
    <footer className="bg-linear-to-b from-gray-900 to-black text-gray-300 py-10 md:py-16 relative w-full overflow-hidden border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <FaPrayingHands className="text-amber-400 text-2xl mr-3 shrink-0" />
              <h2 className="text-sm md:text-base font-bold text-white uppercase tracking-wider">
                {t("temple_full_name")}
              </h2>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-amber-400 mb-5 border-b border-amber-400/30 pb-1 w-fit">
              {t("contact_info")}
            </h3>
            <ul className="space-y-4 text-sm w-full">
              <li className="flex items-center justify-center md:justify-start space-x-3 group">
                <FaPhoneAlt className="text-amber-400 shrink-0" />
                <a
                  href="tel:+917306327251"
                  className="hover:text-amber-400 transition"
                >
                  +91 73063 27251
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-3 group">
                <FaEnvelope className="text-amber-400 shrink-0" />
                <a
                  href="mailto:pathaikkaramana@gmail.com"
                  className="hover:text-amber-400 transition break-all px-2 md:px-0"
                >
                  pathaikkaramana@gmail.com
                </a>
              </li>
              <li className="flex items-start justify-center md:justify-start space-x-3 group">
                <FaMapMarkerAlt className="text-amber-400 mt-1 shrink-0" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Pathaikkara+Mana+Perinthalmanna"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition leading-snug text-center md:text-left max-w-62.5"
                >
                  {t("temple_location") ||
                    "Pathaikkara Mana, Perinthalmanna, Kerala 679322, India"}
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-3">
                <FaWhatsapp className="text-green-400 shrink-0" />
                <a
                  href="https://wa.me/917306327251"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition font-medium"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-amber-400 mb-5 border-b border-amber-400/30 pb-1 w-fit">
              {t("temple_timings")}
            </h3>
            <div className="bg-gray-800/30 p-5 rounded-2xl border border-gray-700 w-full max-w-[320px] md:max-w-none shadow-inner">
              <div className="space-y-4">
                <div className="flex justify-between items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <FaClock className="text-amber-400 shrink-0" />
                    <span className="font-medium text-white">
                      {t("morning")}
                    </span>
                  </div>
                  <span className="text-[11px] md:text-xs text-gray-300 bg-gray-700 px-2 py-1 rounded whitespace-nowrap">
                    6:00 AM - 8:30 AM
                  </span>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <FaClock className="text-amber-400 shrink-0" />
                    <span className="font-medium text-white">
                      {t("evening")}
                    </span>
                  </div>
                  <span className="text-[11px] md:text-xs text-gray-300 bg-gray-700 px-2 py-1 rounded whitespace-nowrap">
                    5:00 PM - 7:00 PM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center border-t border-gray-800 pt-8">
          <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-[0.2em] leading-relaxed">
            © {new Date().getFullYear()}
            <span className="text-amber-500 font-bold mx-2">
              {t("temple_full_name")}
            </span>
            <span className="block md:inline mt-2 md:mt-0 opacity-60 italic">
              | {t("all_rights_reserved")}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
