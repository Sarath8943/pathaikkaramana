import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "ml";
    i18n.changeLanguage(savedLang);
  }, [i18n]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const navItems = [
    { name: t("home_nav"), href: "/home" },
    { name: t("history"), href: "/history" },
    { name: t("pooja"), href: "/pooja" },
    { name: t("offering"), href: "/offering" },
    { name: t("festival"), href: "/festival" },
    { name: t("gallery"), href: "/gallery" },
    { name: t("contact"), href: "/contact" },
  ];

  return (
    <header
      className="bg-yellow-800 text-white shadow-lg relative z-50"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(133,77,14,0.95), rgba(161,98,7,0.90))",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-screen-2xl mx-auto px-3 sm:px-5 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20 lg:h-24 gap-2 sm:gap-4">
          <Link
            to="/home"
            className="shrink-0 flex items-center gap-2 sm:gap-3 cursor-pointer transition-opacity hover:opacity-80 min-w-0"
            aria-label={t("temple_name")}
            title={t("temple_name")}
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 lg:w-14 lg:h-14 rounded-full border-2 border-yellow-400 overflow-hidden shadow-lg shrink-0">
              <img
                src="/Bhagawathy.jpg"
                alt="Logo"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>

            <span className="font-bold text-[13px] sm:text-base lg:text-xl leading-tight text-white whitespace-nowrap truncate max-w-[150px] sm:max-w-[240px] md:max-w-full">
              {t("temple_name")}
            </span>
          </Link>

          <nav className="hidden lg:flex grow justify-center px-2 min-w-0">
            <ul className="flex items-center w-full max-w-5xl justify-between list-none m-0 p-0">
              {navItems.map((item, idx) => (
                <li key={idx} className="flex-1 text-center">
                  <Link
                    to={item.href}
                    className="text-[13px] xl:text-[15px] font-bold hover:text-yellow-300 transition duration-300 whitespace-nowrap px-1.5 py-2 relative group inline-block"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 transition-all group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <div className="hidden sm:flex gap-1.5">
              {["ml", "en"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => changeLanguage(lang)}
                  className={`px-2.5 py-1 rounded text-[10px] sm:text-[11px] font-bold border transition ${
                    i18n.language === lang
                      ? "bg-yellow-400 text-black border-yellow-400"
                      : "border-yellow-500 text-yellow-100"
                  }`}
                >
                  {lang === "ml" ? "മലയാളം" : "English"}
                </button>
              ))}
            </div>

            <button
              ref={buttonRef}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-xl sm:text-2xl text-yellow-400 hover:bg-yellow-700/50 rounded-lg transition"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      <div
        ref={menuRef}
        className={`lg:hidden absolute top-full left-0 w-full bg-yellow-900 border-t border-yellow-700 transition-all duration-300 shadow-xl ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col p-4 max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-5rem)] overflow-y-auto">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.href}
              onClick={() => setIsOpen(false)}
              className="py-3 px-4 hover:bg-yellow-800 rounded font-bold border-b border-yellow-800/50"
            >
              {item.name}
            </Link>
          ))}

          <div className="flex gap-2 mt-4 sm:hidden">
            {["ml", "en"].map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  changeLanguage(lang);
                  setIsOpen(false);
                }}
                className={`flex-1 py-2 rounded text-xs font-bold border ${
                  i18n.language === lang
                    ? "bg-yellow-400 text-black border-yellow-400"
                    : "border-yellow-500"
                }`}
              >
                {lang === "ml" ? "മലയാളം" : "English"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
