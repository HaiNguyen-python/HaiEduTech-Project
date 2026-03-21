import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "vi" | "en";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (vi: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "vi",
  setLang: () => {},
  t: (vi) => vi,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("vi");
  const t = (vi: string, en: string) => (lang === "vi" ? vi : en);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
