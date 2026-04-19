import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "ml";
    if (i18n.language !== savedLang) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    setIsOpen(false);
  };

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

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
    <header className="bg-[#5d3101] text-white shadow-lg relative z-50 w-full">
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="flex justify-between items-center h-20 lg:h-24 gap-2">
          
          {/* 1. Temple Name and Logo - Mobile-il kurachukoodi space nalki */}
          <Link to="/home" className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 sm:w-12 lg:w-16 lg:h-16 rounded-full border-2 border-yellow-500 overflow-hidden shrink-0 shadow-md">
              <img src="/Bhagawathy.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            {/* whitespace-normal nalkiyathukondu name randu variyayi kaanum, athu murinju pokilla */}
            <h1 className="font-bold text-[13px] sm:text-lg lg:text-xl xl:text-2xl tracking-tight leading-tight whitespace-normal break-words">
              {t("temple_name")}
            </h1>
          </Link>

          {/* 2. Desktop Navigation */}
          <nav className="hidden xl:flex flex-[2] mx-4">
            <ul className="flex items-center justify-between w-full list-none m-0 p-0 gap-4">
              {navItems.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.href}
                    className="text-[14px] lg:text-[16px] font-bold hover:text-yellow-400 transition-colors whitespace-nowrap"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 3. Right Side Elements */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Desktop Language Selector (hidden on mobile) */}
            <div className="hidden md:flex gap-1 bg-black/20 p-1 rounded-md">
              {["ml", "en"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => changeLanguage(lang)}
                  className={`px-3 py-1 rounded text-[11px] font-bold transition-all ${
                    i18n.language.includes(lang) ? "bg-yellow-500 text-black" : "text-white"
                  }`}
                >
                  {lang === "ml" ? "മലയാളം" : "EN"}
                </button>
              ))}
            </div>

            {/* Hamburger Button */}
            <button
              ref={buttonRef}
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden p-1 text-3xl text-yellow-500"
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Mobile Dropdown Menu (Language buttons menuvinullil varunnidathu) */}
      <div
        ref={menuRef}
        className={`xl:hidden absolute top-full left-0 w-full bg-[#3d2001] border-t border-white/10 transition-all duration-300 ${
          isOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-2 opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col p-4 space-y-1">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.href}
              onClick={() => setIsOpen(false)}
              className="py-3 px-4 text-white hover:bg-yellow-900 border-b border-white/5 font-bold last:border-0"
            >
              {item.name}
            </Link>
          ))}

          {/* Mobile-il language buttons menuvinullilekku maattiyathu */}
          <div className="flex gap-2 pt-4 md:hidden border-t border-white/10 mt-2">
            {["ml", "en"].map((lang) => (
              <button
                key={lang}
                onClick={() => changeLanguage(lang)}
                className={`flex-1 py-3 rounded-md text-sm font-bold border ${
                  i18n.language.includes(lang)
                    ? "bg-yellow-500 text-black border-yellow-500"
                    : "border-white/20 text-white"
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