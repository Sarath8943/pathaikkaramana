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
      <div className="max-w-[1600px] mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center h-16 sm:h-20 lg:h-24 gap-4">
          
          {/* 1. ലോഗോയും പേരും - എല്ലാ സ്ക്രീനിലും Straight ആയി നിൽക്കാൻ whitespace-nowrap */}
          <Link to="/home" className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="w-10 h-10 sm:w-12 lg:w-16 lg:h-16 rounded-full border-2 border-yellow-500 overflow-hidden shadow-md shrink-0">
              <img src="/Bhagawathy.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <h1 className="font-bold text-[13px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] tracking-tight whitespace-nowrap">
              {t("temple_name")}
            </h1>
          </Link>

          {/* 2. ഡെസ്ക്ടോപ്പ് മെനു (xl സ്ക്രീനിൽ മാത്രം) */}
          <nav className="hidden xl:flex flex-1 justify-center mx-4">
            <ul className={`flex items-center justify-between w-full max-w-4xl list-none m-0 p-0 ${
              i18n.language.includes('en') ? 'gap-8' : 'gap-4'
            }`}>
              {navItems.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.href}
                    className="text-[14px] lg:text-[15px] font-bold hover:text-yellow-400 transition-colors whitespace-nowrap uppercase tracking-wider"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 3. റൈറ്റ് സൈഡ് എലമെന്റ്സ് */}
          <div className="flex items-center gap-3 shrink-0">
            {/* വലിയ സ്ക്രീനുകളിൽ മാത്രം കാണുന്ന ലാംഗ്വേജ് ബട്ടൺ */}
            <div className="hidden xl:flex gap-1 bg-black/20 p-1 rounded-md border border-white/10">
              {["ml", "en"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => changeLanguage(lang)}
                  className={`px-3 py-1.5 rounded text-[11px] font-bold transition-all ${
                    i18n.language.includes(lang) ? "bg-yellow-500 text-black shadow-sm" : "text-gray-300 hover:text-white"
                  }`}
                >
                  {lang === "ml" ? "മലയാളം" : "EN"}
                </button>
              ))}
            </div>

            {/* ഹാംബർഗർ ബട്ടൺ (മൊബൈൽ, പാഡ്, ലാപ്ടോപ്പ് - xl സ്ക്രീനിന് താഴെയുള്ളവ) */}
            <button
              ref={buttonRef}
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden p-1 text-3xl text-yellow-500 hover:bg-yellow-900/50 rounded-lg"
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* 4. ഡ്രോപ്പ്ഡൗൺ മെനു (ചെറിയ ഡിവൈസുകളിൽ ലാംഗ്വേജ് ബട്ടൺ ഇതിനുള്ളിലാകും) */}
      <div
        ref={menuRef}
        className={`xl:hidden absolute top-full left-0 w-full bg-[#3d2001] border-t border-white/10 transition-all duration-300 shadow-2xl ${
          isOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-2 opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col p-5 space-y-1">
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

          {/* ലാംഗ്വേജ് ബട്ടണുകൾ മെനുവിന്റെ ഉള്ളിൽ കൃത്യമായി സെറ്റ് ചെയ്തു */}
          <div className="flex gap-2 pt-5 border-t border-white/10 mt-3">
            {["ml", "en"].map((lang) => (
              <button
                key={lang}
                onClick={() => changeLanguage(lang)}
                className={`flex-1 py-3 rounded-md text-sm font-bold border-2 transition-all ${
                  i18n.language.includes(lang)
                    ? "bg-yellow-400 text-black border-yellow-400"
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