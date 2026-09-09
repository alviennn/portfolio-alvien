import { useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { useFirestoreCollection } from "../../hooks/useFirestoreCollection";
import {
  projectsService,
  skillsService,
} from "../../services/firestoreService";
import { seedProjects, seedSkills } from "../../data/seedData";
import { LoadingState, EmptyState, ErrorState } from "../ui/StatusStates";
import { getTechLogo } from "../../utils/techlogo";

function ProjectTechPill({ tech }) {
  const logo = getTechLogo(tech);

  return (
    <li className="flex items-center gap-1.5 rounded-full border border-light-border dark:border-dark-border bg-black/[0.03] dark:bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-light-muted dark:text-dark-muted sm:gap-2 sm:px-3 sm:py-1.5 sm:text-xs">
      {logo && (
        <img
          src={logo}
          alt={tech}
          className="h-3 w-3 object-contain sm:h-3.5 sm:w-3.5"
          loading="lazy"
        />
      )}
      <span>{tech}</span>
    </li>
  );
}

function ProjectGallery({ projects }) {
  const { t, tField } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const project = projects[activeIndex];
  const techStack = project.techStack || [];

  const changeProject = (nextIndex) => {
    if (nextIndex < 0 || nextIndex >= projects.length || nextIndex === activeIndex) {
      return;
    }

    setActiveIndex(nextIndex);
  };

  return (
    <div className="mx-auto max-w-6xl" aria-label="Project catalogue" data-reveal>
      <div className="catalogue-book">
        <article
          key={project.id}
          className="catalogue-page overflow-hidden rounded-[1.5rem] border border-light-border bg-black/[0.02] shadow-[0_24px_80px_rgba(15,15,15,0.08)] dark:border-dark-border dark:bg-white/[0.025] md:rounded-[2rem] lg:grid lg:grid-cols-[1fr_0.9fr]"
        >
        <div className="group relative min-h-[280px] overflow-hidden bg-gradient-to-br from-accent-green/25 via-accent-green/10 to-black/[0.04] dark:to-white/[0.03] sm:min-h-[360px] lg:min-h-[460px]">
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt={tField(project, "title")}
              className="h-full w-full object-contain bg-light-bgSecondary p-4 transition-transform duration-500 ease-out group-hover:scale-[1.015] dark:bg-dark-bgSecondary sm:p-6"
              loading="lazy"
            />
          ) : (
            <>
              <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-accent-green/25 blur-3xl" />
              <div className="absolute -bottom-20 -right-12 h-64 w-64 rounded-full border border-accent-green/20" />
              <span className="absolute left-7 top-7 font-display text-7xl font-semibold tracking-[-0.08em] text-light-text/10 dark:text-white/10 sm:left-10 sm:top-10 sm:text-9xl">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="absolute bottom-7 left-7 max-w-[75%] font-display text-3xl font-semibold leading-[0.95] tracking-[-0.06em] text-light-text/80 dark:text-dark-text/80 sm:bottom-10 sm:left-10 sm:text-5xl">
                {tField(project, "title")}
              </span>
            </>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <div className="flex justify-end">
            <p className="text-xs font-semibold tracking-[0.16em] text-light-muted dark:text-dark-muted">
              {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </p>
          </div>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-accent-green">
            {tField(project, "category")}
          </p>
          <h3 className="mt-3 font-display text-4xl font-semibold leading-[0.95] tracking-[-0.06em] text-light-text dark:text-dark-text sm:text-5xl">
            {tField(project, "title")}
          </h3>
          <p className="mt-5 text-sm leading-relaxed text-light-muted dark:text-dark-muted sm:text-base">
            {tField(project, "description")}
          </p>

          {techStack.length > 0 && (
            <ul className="mt-7 flex flex-wrap gap-2">
              {techStack.slice(0, 5).map((tech) => (
                <ProjectTechPill key={tech} tech={tech} />
              ))}
            </ul>
          )}

          {project.projectLink && (
            <a
              href={project.projectLink}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-light-text px-5 py-3 text-sm font-semibold text-light-bg transition-transform duration-200 hover:-translate-y-0.5 dark:bg-dark-text dark:text-dark-bg"
            >
              {t("projects.viewSite")}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M7 17 17 7M7 7h10v10" />
              </svg>
            </a>
          )}

        </div>
        </article>
      </div>

      {projects.length > 1 && (
        <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="scrollbar-hide -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {projects.map((item, index) => (
              <button
                type="button"
                key={item.id}
                onClick={() => changeProject(index)}
                aria-current={index === activeIndex ? "true" : undefined}
                className={`flex min-w-[150px] items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-all duration-300 sm:min-w-[180px] ${
                  index === activeIndex
                    ? "border-accent-green/60 bg-accent-green/10"
                    : "border-light-border bg-black/[0.015] hover:border-accent-green/35 dark:border-dark-border dark:bg-white/[0.02]"
                }`}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-green/12 text-xs font-bold text-accent-green">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="truncate text-sm font-semibold text-light-text dark:text-dark-text">
                  {tField(item, "title")}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2">
            <button type="button" onClick={() => changeProject(activeIndex - 1)} disabled={activeIndex === 0} className="catalogue-arrow" aria-label="Previous project">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button type="button" onClick={() => changeProject(activeIndex + 1)} disabled={activeIndex === projects.length - 1} className="catalogue-arrow" aria-label="Next project">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function TechStackCard({ tech }) {
  const logo = getTechLogo(tech.name);

  return (
    <article className="group flex items-center gap-3 rounded-2xl border border-light-border dark:border-dark-border bg-black/[0.02] dark:bg-white/[0.025] px-4 py-3 transition-all duration-300 hover:-translate-y-1 hover:border-accent-green/50 hover:bg-black/[0.03] dark:hover:bg-white/[0.05]">
      <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-light-border bg-light-bg shadow-sm transition-all duration-300 group-hover:-rotate-3 group-hover:border-accent-green/45 group-hover:shadow-[0_8px_20px_rgba(79,122,107,0.12)] dark:border-dark-border dark:bg-dark-bg sm:h-11 sm:w-11 sm:rounded-2xl">
          {logo ? (
            <img
              src={logo}
              alt={tech.name}
              className="h-5 w-5 object-contain transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6"
              loading="lazy"
            />
          ) : (
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-accent-green/12 text-[10px] font-bold uppercase tracking-[-0.08em] text-accent-green sm:h-6 sm:w-6 sm:text-xs">
              {tech.name?.slice(0, 2)}
            </span>
          )}
        </div>

        <div className="min-w-0">
          <h3 className="truncate font-display text-sm font-semibold text-light-text dark:text-dark-text sm:text-base">
            {tech.name}
          </h3>

        </div>
      </div>
    </article>
  );
}

function TechStackMarquee({ techStacks }) {
  const sortedTechStacks = [...techStacks].sort((a, b) => {
    return (a.order || 0) - (b.order || 0);
  });

  if (sortedTechStacks.length === 0) return null;

  const marqueeItems = [
    ...sortedTechStacks,
    ...sortedTechStacks,
    ...sortedTechStacks,
    ...sortedTechStacks,
  ];

  return (
    <div className="relative left-1/2 right-1/2 mt-14 w-screen -translate-x-1/2 overflow-hidden border-y border-light-border dark:border-dark-border bg-black/[0.015] dark:bg-white/[0.015] py-5">
      <div className="marquee-track flex w-max items-center gap-5">
        {marqueeItems.map((tech, index) => {
          const logo = getTechLogo(tech.name);

          return (
            <div
              key={`${tech.id || tech.name}-${index}`}
              className="flex items-center gap-5"
            >
              <div className="flex items-center gap-3 rounded-full border border-light-border dark:border-dark-border bg-black/[0.02] dark:bg-white/[0.025] px-4 py-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-light-border bg-light-bg/80 dark:border-dark-border dark:bg-dark-bg/80">
                  {logo ? (
                    <img
                      src={logo}
                      alt={tech.name}
                      className="h-4 w-4 object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-[9px] font-bold uppercase tracking-[-0.08em] text-accent-green">
                      {tech.name?.slice(0, 2)}
                    </span>
                  )}
                </span>

                <span className="whitespace-nowrap text-sm font-semibold text-light-muted dark:text-dark-muted">
                  {tech.name}
                </span>
              </div>

              <span className="text-accent-green">✦</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TechStackSection({ techStacks, loading, error }) {
  const { t } = useLanguage();

  const sortedTechStacks = [...techStacks].sort((a, b) => {
    return (a.order || 0) - (b.order || 0);
  });

  return (
    <div className="mt-24">
      <div className="mx-auto max-w-3xl text-center" data-reveal>
        <p className="editorial-label">✦ {t("projects.techStack")}</p>

        <h3 className="mt-4 font-display text-4xl font-semibold leading-[0.98] tracking-[-0.06em] text-light-text dark:text-dark-text md:text-6xl">
          {t("projects.techStackTitle")}
        </h3>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-light-muted dark:text-dark-muted">
          {t("projects.techStackDescription")}
        </p>
      </div>

      {loading && (
        <div className="mt-10">
          <LoadingState message={t("skills.loading")} />
        </div>
      )}

      {error && (
        <div className="mt-10">
          <ErrorState message={t("skills.error")} />
        </div>
      )}

      {!loading && !error && sortedTechStacks.length === 0 && (
        <div className="mt-10">
          <EmptyState message={t("skills.empty")} />
        </div>
      )}

      {!loading && !error && sortedTechStacks.length > 0 && (
        <>
          <TechStackMarquee techStacks={sortedTechStacks} />

          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {sortedTechStacks.map((tech, index) => (
              <div
                key={tech.id || tech.name}
                data-reveal
                style={{ "--reveal-delay": `${Math.min(index * 55, 330)}ms` }}
              >
                <TechStackCard tech={tech} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Projects() {
  const { t } = useLanguage();

  const {
    data: projectData,
    loading: projectLoading,
    error: projectError,
  } = useFirestoreCollection(projectsService);

  const {
    data: skillData,
    loading: skillLoading,
    error: skillError,
  } = useFirestoreCollection(skillsService);

  const projects =
    !projectLoading && !projectError && projectData.length > 0
      ? projectData
      : seedProjects;

  const techStacks =
    !skillLoading && !skillError && skillData.length > 0
      ? skillData
      : seedSkills;

  const showFallback =
    !projectLoading && !projectError && projectData.length === 0;

  return (
    <section
      id="projects"
      className="overflow-hidden px-6 py-20 text-light-text dark:text-dark-text md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-content">
        <div className="mx-auto max-w-3xl text-center" data-reveal>
          <p className="editorial-label">✦ {t("nav.projects")}</p>

          <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.95] tracking-[-0.07em] text-light-text dark:text-dark-text md:text-7xl">
            {t("projects.title")}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-light-muted dark:text-dark-muted">
            {t("projects.description")}
          </p>
        </div>

        <div className="mt-14">
          {projectLoading && <LoadingState message={t("projects.loading")} />}

          {projectError && <ErrorState message={t("projects.error")} />}

          {!projectLoading && !projectError && projects.length === 0 && (
            <EmptyState message={t("projects.empty")} />
          )}

          {!projectLoading && !projectError && projects.length > 0 && (
            <ProjectGallery
              projects={projects}
            />
          )}
        </div>

        <TechStackSection
          techStacks={techStacks}
          loading={skillLoading}
          error={skillError}
        />

        {showFallback && (
          <p className="mt-6 text-xs text-light-muted dark:text-dark-muted" />
        )}
      </div>
    </section>
  );
}
