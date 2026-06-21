import { useLanguage } from '../../i18n/LanguageContext';

const SKILL_GROUPS = [
  { key: 'design', items: ['UI Design', 'UX Flow', 'Wireframing', 'Prototyping'] },
  { key: 'frontend', items: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'] },
  { key: 'development', items: ['Git', 'GitHub', 'API Integration', 'System Analysis'] },
];

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="section-wrapper bg-light-bgSecondary dark:bg-dark-bgSecondary">
      <h2 className="section-title">{t('skills.title')}</h2>
      <p className="section-subtitle">{t('skills.description')}</p>

      <div className="mt-12 grid md:grid-cols-3 gap-10">
        {SKILL_GROUPS.map((group) => (
          <div key={group.key}>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-accent-green mb-4">
              {t(`skills.groups.${group.key}`)}
            </h3>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li key={item} className="text-sm text-light-muted dark:text-dark-muted">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
