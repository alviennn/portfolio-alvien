import { useLanguage } from '../../i18n/LanguageContext';
import { useFirestoreCollection } from '../../hooks/useFirestoreCollection';
import { experiencesService } from '../../services/firestoreService';
import { seedExperiences } from '../../data/seedData';
import { LoadingState, EmptyState, ErrorState } from '../ui/StatusStates';

function formatDate(value) {
  if (!value) return 'Present';
  const [year, month] = value.split('-');
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function ExperienceItem({ item, isLast }) {
  const { tField } = useLanguage();

  return (
    <div className="relative pl-8">
      {!isLast && (
        <span className="absolute left-[5px] top-5 bottom-0 w-px bg-light-border dark:bg-dark-border" />
      )}
      <span className="absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full bg-accent-green" />

      <p className="text-xs font-medium text-light-muted dark:text-dark-muted">
        {formatDate(item.startDate)} — {formatDate(item.endDate)}
      </p>
      <h3 className="mt-1 font-display text-lg font-semibold">{tField(item, 'title')}</h3>
      <p className="text-sm font-medium text-accent-green">{item.company}</p>
      <p className="mt-2 text-sm leading-relaxed text-light-muted dark:text-dark-muted max-w-prose">
        {tField(item, 'description')}
      </p>
    </div>
  );
}

export default function Experience() {
  const { t } = useLanguage();
  const { data, loading, error } = useFirestoreCollection(experiencesService);

  const experiences = !loading && !error && data.length > 0 ? data : seedExperiences;

  return (
    <section id="experience" className="section-wrapper bg-light-bgSecondary dark:bg-dark-bgSecondary">
      <h2 className="section-title">{t('experience.title')}</h2>
      <p className="section-subtitle">{t('experience.description')}</p>

      <div className="mt-12">
        {loading && <LoadingState message={t('experience.loading')} />}
        {error && <ErrorState message={t('experience.error')} />}
        {!loading && !error && experiences.length === 0 && <EmptyState message={t('experience.empty')} />}

        {!loading && !error && experiences.length > 0 && (
          <div className="space-y-10 max-w-2xl">
            {experiences.map((item, index) => (
              <ExperienceItem key={item.id} item={item} isLast={index === experiences.length - 1} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
