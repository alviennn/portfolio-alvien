import { useLanguage } from '../../i18n/LanguageContext';

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      aria-label="Toggle language"
      className="w-9 h-9 flex items-center justify-center rounded-full border border-light-border dark:border-dark-border hover:bg-light-bgSecondary dark:hover:bg-dark-bgSecondary transition-colors duration-200 text-xs font-semibold tracking-wide"
    >
      {language === 'en' ? 'EN' : 'ID'}
    </button>
  );
}
