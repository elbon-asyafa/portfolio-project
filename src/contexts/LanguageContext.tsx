import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type Language = "en" | "id";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      return localStorage.getItem("portfolio-language") === "id" ? "id" : "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === "id"
      ? "Elbon — Teknisi Jaringan & Pemecah Masalah"
      : "Elbon — Network Technician & Problem Solver";
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) description.content = language === "id"
      ? "Portofolio Elbon Aminalloh Asyafa Lubis Prasetyo, teknisi jaringan dengan pengalaman langsung dalam infrastruktur jaringan."
      : "Portfolio of Elbon Aminalloh Asyafa Lubis Prasetyo. A self-driven technical problem solver with hands-on experience in network infrastructure.";
    try { localStorage.setItem("portfolio-language", language); } catch { /* Storage can be disabled. */ }
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { language, setLanguage } = useLanguage();
  return (
    <div className={`language-toggle ${className}`} role="group" aria-label={language === "id" ? "Pilih bahasa" : "Choose language"}>
      {(["en", "id"] as const).map(option => (
        <button key={option} type="button" onClick={() => setLanguage(option)} aria-pressed={language === option}
          aria-label={option === "en" ? "English" : "Bahasa Indonesia"}>
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function copy(language: Language, english: string, indonesian: string) {
  return language === "id" ? indonesian : english;
}
