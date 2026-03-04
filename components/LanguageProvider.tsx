"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Lang, getTranslations, TranslationKey } from "@/lib/i18n";

type LanguageContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Load saved language from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "ar" || saved === "en") {
      setLangState(saved);
    }
  }, []);

  // Sync <html> lang + dir attributes whenever lang changes
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem("lang", l);
  }

  const t = (key: TranslationKey): string => getTranslations(lang)[key];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
