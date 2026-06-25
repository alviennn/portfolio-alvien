import { useState, useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import ThemeToggle from '../ui/ThemeToggle';
import LanguageToggle from '../ui/LanguageToggle';

const NAV_ITEMS = [
  { key: 'about', href: '#about' },
  { key: 'projects', href: '#projects' },
  { key: 'experience', href: '#experience' },
  { key: 'certifications', href: '#certifications' },
  { key: 'skills', href: '#skills' },
  { key: 'contact', href: '#contact' },
];

export default function Navbar() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = () => setIsOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-light-border dark:border-dark-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-content mx-auto px-6 md:px-1 h-16 flex items-center justify-between">
        <a href="#" className="font-display font-semibold text-base">
          Alvien Ridho Nanda Pryastika
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-light-muted dark:text-dark-muted">
          {NAV_ITEMS.map((item) => (
            <li key={item.key}>
              <a
                href={item.href}
                className="hover:text-light-text dark:hover:text-dark-text transition-colors duration-200"
              >
                {t(`nav.${item.key}`)}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-light-border dark:border-dark-border"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {isOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg">
          <ul className="px-6 py-4 flex flex-col gap-4 text-sm font-medium">
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <a href={item.href} onClick={handleNavClick}>
                  {t(`nav.${item.key}`)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
