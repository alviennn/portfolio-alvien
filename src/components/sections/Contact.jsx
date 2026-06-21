import { useLanguage } from '../../i18n/LanguageContext';

const CONTACT_LINKS = [
  { key: 'emailMe', href: 'mailto:alvien.rnp@gmail.com', primary: true },
  { key: 'linkedin', href: 'https://www.linkedin.com/in/alvienrnp/' },
  { key: 'github', href: 'https://github.com/alviennn' },
  { key: 'downloadCV', href: '/cv-alvien-ridho.pdf' },
];

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="section-wrapper">
      <div className="max-w-2xl">
        <h2 className="section-title">{t('contact.title')}</h2>
        <p className="section-subtitle">{t('contact.description')}</p>

        <div className="mt-10 flex flex-wrap gap-4">
          {CONTACT_LINKS.map((link) => (
            <a
              key={link.key}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className={link.primary ? 'btn-primary' : 'btn-secondary'}
            >
              {t(`contact.${link.key}`)}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
