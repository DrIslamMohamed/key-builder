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

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "ar" || saved === "en") {
      applyLang(saved);
      setLangState(saved);
    }
  }, []);

  function applyLang(l: Lang) {
    document.documentElement.lang = l;
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
  }

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem("lang", l);
    applyLang(l);
  }

  const translations = getTranslations(lang);
  function t(key: TranslationKey): string {
    return translations[key];
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
