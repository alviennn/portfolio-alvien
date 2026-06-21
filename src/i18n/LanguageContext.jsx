import { createContext, useContext, useEffect, useState } from 'react';
import { translations } from './translations';

const LanguageContext = createContext(undefined);

const STORAGE_KEY = 'alvien-portfolio-lang';

function getInitialLanguage() {
  if (typeof window === 'undefined') return 'en';
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'en' || stored === 'id') return stored;
  return 'en';
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'id' : 'en'));
  };

  // t('hero.title') -> resolves nested key from translations[language]
  const t = (key) => {
    const value = getNestedValue(translations[language], key);
    if (value === undefined) {
      // fallback: try the other language so the UI never shows a raw key
      const fallback = getNestedValue(translations.en, key);
      return fallback !== undefined ? fallback : key;
    }
    return value;
  };

  // Helper for bilingual content fields stored in Firestore (title_en / title_id, etc.)
  const tField = (item, fieldBase) => {
    if (!item) return '';
    const primary = item[`${fieldBase}_${language}`];
    const fallbackLang = language === 'en' ? 'id' : 'en';
    const fallback = item[`${fieldBase}_${fallbackLang}`];
    return primary || fallback || '';
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage, t, tField }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
