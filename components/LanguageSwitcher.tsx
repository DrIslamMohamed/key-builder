"use client";

import { useLanguage } from "./LanguageProvider";

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <button
      onClick={() => setLang(lang === "en" ? "ar" : "en")}
      className={`px-2 py-1 text-xs font-semibold rounded border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors ${className}`}
      title={lang === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}
    >
      {lang === "en" ? "AR" : "EN"}
    </button>
  );
}
