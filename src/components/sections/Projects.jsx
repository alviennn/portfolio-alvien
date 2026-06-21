import { useLanguage } from '../../i18n/LanguageContext';
import { useFirestoreCollection } from '../../hooks/useFirestoreCollection';
import { projectsService } from '../../services/firestoreService';
import { seedProjects } from '../../data/seedData';
import { LoadingState, EmptyState, ErrorState } from '../ui/StatusStates';

function ProjectCard({ project }) {
  const { t, tField } = useLanguage();
  const techStack = project.techStack || [];

  return (
    <article className="group border border-light-border dark:border-dark-border rounded-2xl overflow-hidden hover:border-light-text/30 dark:hover:border-dark-text/30 transition-colors duration-300">
      <div className="aspect-[16/10] bg-light-bgSecondary dark:bg-dark-bgSecondary overflow-hidden">
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={tField(project, 'title')}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-light-muted dark:text-dark-muted text-sm">
            {tField(project, 'title')}
          </div>
        )}
      </div>

      <div className="p-6">
        <p className="text-xs font-medium text-accent-green uppercase tracking-wide">
          {tField(project, 'category')}
        </p>
        <h3 className="mt-2 font-display text-xl font-semibold">{tField(project, 'title')}</h3>
        <p className="mt-1 text-sm text-light-muted dark:text-dark-muted">
          {t('projects.role')}: {tField(project, 'role')}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-light-muted dark:text-dark-muted">
          {tField(project, 'description')}
        </p>

        {techStack.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <li
                key={tech}
                className="text-xs px-3 py-1 rounded-full bg-light-bgSecondary dark:bg-dark-bgSecondary text-light-muted dark:text-dark-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}

        {project.projectLink && (
          <a
            href={project.projectLink}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-1 text-sm font-medium hover:text-accent-green transition-colors duration-200"
          >
            {t('projects.viewProject')}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </a>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const { data, loading, error } = useFirestoreCollection(projectsService);

  // Use Firestore data if available; otherwise fall back to seed content
  // so the section is never empty on a fresh deploy.
  const projects = !loading && !error && data.length > 0 ? data : seedProjects;
  const showFallback = !loading && !error && data.length === 0;

  return (
    <section id="projects" className="section-wrapper">
      <h2 className="section-title">{t('projects.title')}</h2>
      <p className="section-subtitle">{t('projects.description')}</p>

      <div className="mt-12">
        {loading && <LoadingState message={t('projects.loading')} />}
        {error && <ErrorState message={t('projects.error')} />}
        {!loading && !error && projects.length === 0 && <EmptyState message={t('projects.empty')} />}

        {!loading && !error && projects.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
      {showFallback && (
        <p className="mt-6 text-xs text-light-muted dark:text-dark-muted">
          {/* Visible only to help admin notice fallback content is showing; harmless if kept */}
        </p>
      )}
    </section>
  );
}
