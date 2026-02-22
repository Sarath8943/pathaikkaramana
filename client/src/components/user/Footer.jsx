import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaPrayingHands,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 w-full border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Grid: മൊബൈലിൽ gap-12 നൽകി ഓരോ വിഭാഗവും തമ്മിൽ വ്യക്തമായ അകലം നൽകി */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Section 1: Logo/Name */}
          <div className="flex flex-col items-center text-center">
            <div className="flex flex-col items-center justify-center">
              <FaPrayingHands className="text-amber-400 text-3xl mb-3" />
              <h2 className="text-lg font-bold text-white uppercase tracking-wider">
                {t("temple_full_name")}
              </h2>
            </div>
          </div>

          {/* Section 2: Contact Info */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-lg font-semibold text-amber-400 mb-6 border-b border-amber-400/30 pb-2 w-full max-w-[200px]">
              {t("contact_info")}
            </h3>
            <ul className="space-y-5 text-sm w-full">
              <li className="flex flex-col items-center justify-center gap-2">
                <FaPhoneAlt className="text-amber-400" />
                <a href="tel:+917306327251" className="hover:text-amber-400 transition">
                  +91 73063 27251
                </a>
              </li>
              <li className="flex flex-col items-center justify-center gap-2">
                <FaEnvelope className="text-amber-400" />
                <a href="mailto:pathaikkaramana@gmail.com" className="hover:text-amber-400 transition break-all">
                  pathaikkaramana@gmail.com
                </a>
              </li>
              <li className="flex flex-col items-center justify-center gap-2">
                <FaMapMarkerAlt className="text-amber-400" />
                <span className="max-w-[250px]">
                  {t("temple_location") || "Pathaikkara Mana, Perinthalmanna, Kerala 679322, India"}
                </span>
              </li>
            </ul>
          </div>

          {/* Section 3: Timings */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-lg font-semibold text-amber-400 mb-6 border-b border-amber-400/30 pb-2 w-full max-w-[200px]">
              {t("temple_timings")}
            </h3>
            <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700 w-full max-w-[280px]">
              <div className="space-y-4">
                <div className="flex flex-col items-center gap-2">
                  <span className="flex items-center gap-2 text-gray-400">
                    <FaClock className="text-amber-400" /> {t("morning")}
                  </span>
                  <span className="bg-gray-700 px-3 py-1 rounded text-white font-mono text-sm">
                    6:00 - 8:30 AM
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2 border-t border-gray-700 pt-3">
                  <span className="flex items-center gap-2 text-gray-400">
                    <FaClock className="text-amber-400" /> {t("evening")}
                  </span>
                  <span className="bg-gray-700 px-3 py-1 rounded text-white font-mono text-sm">
                    5:00 - 7:00 PM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
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