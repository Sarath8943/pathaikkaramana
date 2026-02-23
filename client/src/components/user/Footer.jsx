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
    <footer className="bg-gray-900 text-gray-300 py-10 w-full border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-[max-content_1fr_1fr] gap-y-8 md:gap-x-16 items-start">
          <div className="flex items-center justify-center md:justify-start gap-2 w-full overflow-hidden">
            <FaPrayingHands className="text-amber-400 text-2xl sm:text-3xl shrink-0" />
            <h2 className="font-bold text-white uppercase tracking-wide text-xs sm:text-sm md:text-lg lg:text-2xl whitespace-nowrap overflow-hidden text-ellipsis">
              {t("temple_full_name")}
            </h2>
          </div>
          <div className="flex flex-col items-center md:items-start w-full">
            <div className="w-fit">
              <h3 className="text-md font-semibold text-amber-400 mb-4 border-b border-amber-400/20 pb-2 text-center md:text-left uppercase tracking-wider">
                {t("contact_info")}
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <FaPhoneAlt className="text-amber-400 text-xs shrink-0" />
                  <a
                    href="tel:+917306327251"
                    className="hover:text-amber-400 transition"
                  >
                    +91 73063 27251
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <FaWhatsapp className="text-green-500 text-lg shrink-0" />
                  <a
                    href="https://wa.me/917306327251"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-400 transition"
                  >
                    WhatsApp
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <FaEnvelope className="text-amber-400 text-xs shrink-0" />
                  <a
                    href="mailto:pathaikkaramana@gmail.com"
                    className="hover:text-amber-400 transition break-all"
                  >
                    pathaikkaramana@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-3 text-left">
                  <FaMapMarkerAlt className="text-amber-400 text-xs mt-1 shrink-0" />
                  <span className="leading-snug wrap-break-word">
                    {t("temple_location")}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start w-full">
            <div className="w-full max-w-[320px] md:max-w-none">
              <h3 className="text-md font-semibold text-amber-400 mb-4 border-b border-amber-400/20 pb-2 text-center md:text-left uppercase tracking-wider">
                {t("temple_timings")}
              </h3>
              <div className="bg-gray-800/40 p-5 rounded-xl border border-gray-700/50">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs sm:text-sm gap-4">
                    <span className="flex items-center gap-2">
                      <FaClock className="text-amber-400" /> {t("morning")}
                    </span>
                    <span className="font-mono text-white bg-gray-700 px-2 py-1 rounded">
                      6:00-8:30 AM
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm border-t border-gray-700/50 pt-4 gap-4">
                    <span className="flex items-center gap-2">
                      <FaClock className="text-amber-400" /> {t("evening")}
                    </span>
                    <span className="font-mono text-white bg-gray-700 px-2 py-1 rounded">
                      5:00-7:00 PM
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="text-center border-t border-gray-800 mt-12 pt-8">
          <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-[0.2em] leading-relaxed">
            © {new Date().getFullYear()} {t("temple_full_name")} |{" "}
            {t("all_rights_reserved")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
