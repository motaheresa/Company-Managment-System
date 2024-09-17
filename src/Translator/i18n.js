import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationAR from "./Local/ar.json"
import translationEN from "./Local/en.json"
import LanguageDetector from 'i18next-browser-languagedetector'
const resources = {
  en: {
    translation: translationEN
  },
  ar: {
    translation: translationAR
  }
};
i18n
.use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem("i18nextLng"), 
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    react:{
        useSuspense:false
    }
  });

  export default i18n;