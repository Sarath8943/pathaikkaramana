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
    <footer className="bg-gray-900 text-gray-300 py-10 w-full border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* മൊബൈലിൽ എല്ലാം ഒന്നിനു താഴെ ഒന്നായി വരാൻ grid-cols-1 ഉപയോഗിച്ചു */}
        <div className="grid grid-cols-1 gap-10">
          
          {/* Section 1: Logo/Name */}
          <div className="flex flex-col items-center text-center">
            <FaPrayingHands className="text-amber-400 text-4xl mb-4" />
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">
              {t("temple_full_name")}
            </h2>
          </div>

          {/* Section 2: Contact Info */}
          <div className="flex flex-col items-center text-center w-full">
            <h3 className="text-lg font-semibold text-amber-400 mb-6 border-b border-amber-400/30 pb-2 w-full max-w-[250px]">
              {t("contact_info")}
            </h3>
            <ul className="space-y-4 text-sm w-full">
              <li className="flex flex-row items-center justify-center gap-3">
                <FaPhoneAlt className="text-amber-400 shrink-0" />
                <a href="tel:+917306327251" className="hover:text-amber-400 transition">
                  +91 73063 27251
                </a>
              </li>
              <li className="flex flex-row items-center justify-center gap-3">
                <FaEnvelope className="text-amber-400 shrink-0" />
                <a href="mailto:pathaikkaramana@gmail.com" className="hover:text-amber-400 transition break-all">
                  pathaikkaramana@gmail.com
                </a>
              </li>
              <li className="flex flex-row items-start justify-center gap-3 px-4">
                <FaMapMarkerAlt className="text-amber-400 mt-1 shrink-0" />
                <span className="max-w-[280px]">
                  {t("temple_location") || "Pathaikkara Mana, Perinthalmanna, Kerala 679322, India"}
                </span>
              </li>
            </ul>
          </div>

          {/* Section 3: Timings */}
          <div className="flex flex-col items-center text-center w-full">
            <h3 className="text-lg font-semibold text-amber-400 mb-6 border-b border-amber-400/30 pb-2 w-full max-w-[250px]">
              {t("temple_timings")}
            </h3>
            <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 w-full max-w-[280px]">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-gray-400">
                    <FaClock className="text-amber-400" /> {t("morning")}
                  </span>
                  <span className="bg-gray-700 px-3 py-1 rounded text-white font-mono">6:00-8:30 AM</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-gray-400">
                    <FaClock className="text-amber-400" /> {t("evening")}
                  </span>
                  <span className="bg-gray-700 px-3 py-1 rounded text-white font-mono">5:00-7:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center border-t border-gray-800 mt-10 pt-8">
          <p className="text-xs text-gray-500 uppercase tracking-widest">
            © {new Date().getFullYear()} {t("temple_full_name")} | {t("all_rights_reserved")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;