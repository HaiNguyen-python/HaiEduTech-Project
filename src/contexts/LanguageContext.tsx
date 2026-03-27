import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Lang = "vi" | "en";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (vi: string, en: string) => string;
}

const detectDefaultLang = (): Lang => {
  // Check localStorage first
  const saved = localStorage.getItem("app-lang");
  if (saved === "vi" || saved === "en") return saved;

  // Check browser language/timezone for Vietnam
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (tz === "Asia/Ho_Chi_Minh" || tz === "Asia/Saigon") return "vi";

  const browserLang = navigator.language || (navigator as any).userLanguage || "";
  if (browserLang.startsWith("vi")) return "vi";

  return "en";
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (vi) => vi,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(detectDefaultLang);
  const t = (vi: string, en: string) => (lang === "vi" ? vi : en);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("app-lang", newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
