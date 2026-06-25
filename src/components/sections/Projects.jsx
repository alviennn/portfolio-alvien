import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";
import { useFirestoreCollection } from "../../hooks/useFirestoreCollection";
import { projectsService } from "../../services/firestoreService";
import { seedProjects } from "../../data/seedData";
import { LoadingState, EmptyState, ErrorState } from "../ui/StatusStates";

function ProjectCard({ project }) {
  const { t, tField } = useLanguage();
  const techStack = project.techStack || [];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-light-border bg-light-bg transition-all duration-300 hover:-translate-y-1 hover:border-light-text/30 hover:shadow-soft dark:border-dark-border dark:bg-dark-bg dark:hover:border-dark-text/30">
      <div className="aspect-[16/10] w-full overflow-hidden bg-light-bgSecondary dark:bg-dark-bgSecondary">
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={tField(project, "title")}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-6 text-center text-sm text-light-muted dark:text-dark-muted">
            {tField(project, "title")}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent-green">
          {tField(project, "category")}
        </p>

        <h3 className="mt-3 font-display text-xl font-semibold leading-tight text-light-text dark:text-dark-text">
          {tField(project, "title")}
        </h3>

        {techStack.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {techStack.slice(0, 2).map((tech) => (
              <li
                key={tech}
                className="rounded-full bg-light-bgSecondary px-3 py-1 text-xs text-light-muted dark:bg-dark-bgSecondary dark:text-dark-muted"
              >
                {tech}
              </li>
            ))}

            {techStack.length > 2 && (
              <li className="rounded-full bg-light-bgSecondary px-3 py-1 text-xs text-light-muted dark:bg-dark-bgSecondary dark:text-dark-muted">
                +{techStack.length - 2}
              </li>
            )}
          </ul>
        )}

        <div className="mt-auto pt-6">
          <Link
            to={`/projects/${project.id}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-light-text transition-colors duration-200 hover:text-accent-green dark:text-dark-text"
          >
            {t("projects.viewProject")}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const { data, loading, error } = useFirestoreCollection(projectsService);

  const projects = !loading && !error && data.length > 0 ? data : seedProjects;
  const showFallback = !loading && !error && data.length === 0;

  return (
    <section id="projects" className="section-wrapper overflow-hidden">
      <h2 className="section-title">{t("projects.title")}</h2>
      <p className="section-subtitle">{t("projects.description")}</p>

      <div className="mt-10">
        {loading && <LoadingState message={t("projects.loading")} />}

        {error && <ErrorState message={t("projects.error")} />}

        {!loading && !error && projects.length === 0 && (
          <EmptyState message={t("projects.empty")} />
        )}

        {!loading && !error && projects.length > 0 && (
          <>
            <p className="mb-4 text-xs text-light-muted dark:text-dark-muted md:hidden">
              {t("common.swipeMore")}
            </p>

            <div className="flex snap-x snap-mandatory scroll-smooth gap-5 overflow-x-auto pb-5 scrollbar-hide md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:pb-0 lg:grid-cols-3">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="min-w-full snap-start md:min-w-0"
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {showFallback && (
        <p className="mt-6 text-xs text-light-muted dark:text-dark-muted" />
      )}
    </section>
  );
}