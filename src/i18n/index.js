import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import ptBR from "./locales/pt-BR.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en }, "pt-BR": { translation: ptBR } },
    fallbackLng: "en",
    supportedLngs: ["en", "pt-BR"],
    nonExplicitSupportedLngs: false,
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "portfolio-language",
      caches: [],
      convertDetectedLanguage: (language) => {
        if (language?.toLowerCase().startsWith("pt")) return "pt-BR";
        if (language?.toLowerCase().startsWith("en")) return "en";
        return "en";
      },
    },
  });

export const setLanguage = (language) => {
  try { localStorage.setItem("portfolio-language", language); } catch { /* Storage can be unavailable. */ }
  i18n.changeLanguage(language);
};

export default i18n;
