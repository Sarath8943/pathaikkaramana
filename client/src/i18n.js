import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// ✅ നിങ്ങളുടെ ഭാഷ ഫയലുകൾ import ചെയ്യുക
import en from "./locales/en.json";
import ml from "./locales/ml.json";

// ✅ Local Storage-ലുള്ള last selected language load ചെയ്യുക
const savedLang = localStorage.getItem("lang") || "ml";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ml: { translation: ml },
    },
    lng: savedLang, // ✅ ശരിയായി Set
    fallbackLng: "ml",
    interpolation: { escapeValue: false },
  });

export default i18n;
