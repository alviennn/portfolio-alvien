import { useLanguage } from '../../i18n/LanguageContext';

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/alvienridho' },
  { label: 'GitHub', href: 'https://github.com/alvienridho' },
  { label: 'Email', href: 'mailto:alvien.ridho@example.com' },
];

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-light-border dark:border-dark-border">
      <div className="max-w-content mx-auto px-6 md:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-display font-semibold">Alvien Ridho</p>
          <p className="text-sm text-light-muted dark:text-dark-muted">{t('footer.role')}</p>
        </div>

        <ul className="flex items-center gap-6 text-sm font-medium">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="text-xs text-light-muted dark:text-dark-muted">
          © {year} Alvien Ridho. {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
}
