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
    <footer className="bg-linear-to-b from-gray-900 to-black text-gray-300 py-10 md:py-16 relative w-full border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center mb-4">
              <FaPrayingHands className="text-amber-400 text-2xl mr-3" />
              <h2 className="text-sm md:text-base font-bold text-white uppercase tracking-wider">
                {t("temple_full_name")}
              </h2>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-amber-400 mb-5 border-b border-amber-400/30 pb-1">
              {t("contact_info")}
            </h3>
            <ul className="space-y-4 text-sm w-full">
              <li className="flex items-center justify-center md:justify-start space-x-3">
                <FaPhoneAlt className="text-amber-400 shrink-0" />
                <a
                  href="tel:+917306327251"
                  className="hover:text-amber-400 transition"
                >
                  +91 73063 27251
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-3">
                <FaEnvelope className="text-amber-400 shrink-0" />
                <a
                  href="mailto:pathaikkaramana@gmail.com"
                  className="hover:text-amber-400 transition"
                >
                  pathaikkaramana@gmail.com
                </a>
              </li>
              <li className="flex items-start justify-center md:justify-start space-x-3 text-center md:text-left">
                <FaMapMarkerAlt className="text-amber-400 mt-1 shrink-0" />
                <a
                  href="#"
                  className="hover:text-amber-400 transition max-w-[250px]"
                >
                  {t("temple_location") ||
                    "Pathaikkara Mana, Perinthalmanna, Kerala 679322"}
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-amber-400 mb-5 border-b border-amber-400/30 pb-1">
              {t("temple_timings")}
            </h3>
            <div className="bg-gray-800/30 p-5 rounded-2xl border border-gray-700 w-full max-w-[300px]">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium flex items-center gap-2">
                    <FaClock className="text-amber-400" /> {t("morning")}
                  </span>
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                    6:00 - 8:30
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium flex items-center gap-2">
                    <FaClock className="text-amber-400" /> {t("evening")}
                  </span>
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                    5:00 - 7:00
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center border-t border-gray-800 pt-8">
          <p className="text-xs text-gray-500 uppercase tracking-widest">
            © {new Date().getFullYear()} {t("temple_full_name")} |{" "}
            {t("all_rights_reserved")}
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
