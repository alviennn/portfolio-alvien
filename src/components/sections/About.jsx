import { useLanguage } from '../../i18n/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="section-wrapper">
      <h2 className="section-title">{t('about.title')}</h2>
      <div className="mt-6 space-y-4 max-w-prose">
        <p className="text-base leading-relaxed text-light-muted dark:text-dark-muted">
          {t('about.paragraph1')}
        </p>
        <p className="text-base leading-relaxed text-light-muted dark:text-dark-muted">
          {t('about.paragraph2')}
        </p>
      </div>
    </section>
  );
}
