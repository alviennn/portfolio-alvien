import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { useFirestoreCollection } from "../../hooks/useFirestoreCollection";
import {
  projectsService,
  skillsService,
} from "../../services/firestoreService";
import { seedProjects, seedSkills } from "../../data/seedData";
import { LoadingState, EmptyState, ErrorState } from "../ui/StatusStates";
import { getTechLogo } from "../../utils/techlogo";
import ProjectDetailModal from "../ui/ProjectDetailModal";

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

function ProjectCard({ project, index, onOpen }) {
  const { tField } = useLanguage();
  const techStack = project.techStack || [];

  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      className="group flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-light-border dark:border-dark-border bg-black/[0.015] dark:bg-white/[0.02] text-left transition-all duration-300 hover:-translate-y-1 hover:border-accent-green/50 hover:bg-black/[0.03] dark:hover:bg-white/[0.04] sm:rounded-[1.5rem]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-black/[0.03] dark:bg-white/[0.04]">
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={tField(project, "title")}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-6 text-center font-display text-lg font-semibold text-black/15 dark:text-dark-text/20 sm:text-2xl">
            {tField(project, "title")}
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

        <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/35 px-2.5 py-1 text-[11px] font-semibold text-white/90 backdrop-blur-md sm:left-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-xs">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="absolute right-3 top-3 rounded-full border border-accent-green/30 bg-accent-green/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-green backdrop-blur-md sm:right-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-[11px] sm:tracking-[0.16em]">
          {tField(project, "category")}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5 md:p-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-green sm:text-xs sm:tracking-[0.2em]">
            {tField(project, "category")}
          </p>

          <h3 className="mt-2 font-display text-xl font-semibold leading-tight tracking-[-0.04em] text-light-text dark:text-dark-text sm:mt-3 sm:text-2xl">
            {tField(project, "title")}
          </h3>
        </div>

        {techStack.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2 sm:mt-6">
            {techStack.slice(0, 5).map((tech) => (
              <ProjectTechPill key={tech} tech={tech} />
            ))}

            {techStack.length > 5 && (
              <li className="rounded-full border border-light-border dark:border-dark-border bg-black/[0.03] dark:bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-light-muted dark:text-dark-muted sm:px-3 sm:py-1.5 sm:text-xs">
                +{techStack.length - 5}
              </li>
            )}
          </ul>
        )}

        <div className="mt-auto pt-5 sm:pt-6">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-light-muted dark:text-dark-muted transition-colors duration-300 group-hover:text-accent-green">
            Detail
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </span>
        </div>
      </div>
    </button>
  );
}

function ProjectCarousel({ projects, onOpen }) {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return undefined;

    let animationFrame;

    const updateActiveProject = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const cards = [...carousel.querySelectorAll("[data-project-card]")];
        const carouselCenter = carousel.scrollLeft + carousel.clientWidth / 2;
        let nearestIndex = 0;
        let nearestDistance = Number.POSITIVE_INFINITY;

        cards.forEach((card, index) => {
          const cardCenter = card.offsetLeft + card.offsetWidth / 2;
          const offset = (cardCenter - carouselCenter) / carousel.clientWidth;
          const distance = Math.abs(offset);
          const focusDistance = Math.min(distance, 1);

          card.style.transform = `translate3d(0, ${focusDistance * 14}px, 0) scale(${1 - focusDistance * 0.1})`;
          card.style.filter = "none";
          card.style.opacity = `${1 - focusDistance * 0.2}`;

          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestIndex = index;
          }
        });

        setActiveIndex(nearestIndex);
      });
    };

    carousel.addEventListener("scroll", updateActiveProject, { passive: true });
    updateActiveProject();

    return () => {
      cancelAnimationFrame(animationFrame);
      carousel.removeEventListener("scroll", updateActiveProject);
    };
  }, [projects.length]);

  const goToProject = (index) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const cards = [...carousel.querySelectorAll("[data-project-card]")];
    const targetCard = cards[index];
    if (!targetCard) return;

    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
    const centeredScrollLeft =
      targetCard.offsetLeft - (carousel.clientWidth - targetCard.offsetWidth) / 2;
    const nextScrollLeft = Math.max(0, Math.min(maxScrollLeft, centeredScrollLeft));

    carousel.scrollTo({ left: nextScrollLeft, behavior: "smooth" });
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div
        ref={carouselRef}
        className="scrollbar-hide -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-5 lg:gap-8 md:mx-0 md:px-0"
        aria-label="Project carousel"
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            data-project-card
            className="w-full shrink-0 snap-center snap-always transform-gpu transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:w-[calc((100%_-_1.5rem)/2)] sm:first:ml-[calc(25%_+_0.375rem)] sm:last:mr-[calc(25%_+_0.375rem)] lg:w-[calc((100%_-_4rem)/3)] lg:first:ml-[calc(33.333%_+_0.6667rem)] lg:last:mr-[calc(33.333%_+_0.6667rem)]"
          >
            <ProjectCard
              project={project}
              index={index}
              onOpen={onOpen}
            />
          </div>
        ))}
      </div>

      {projects.length > 1 && (
        <div
          className="mt-6 flex max-w-full flex-wrap items-center justify-center gap-3"
          aria-label={`Project ${activeIndex + 1} of ${projects.length}`}
          aria-live="polite"
        >
          <button
            type="button"
            onClick={() => goToProject(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-light-border bg-black/[0.02] text-light-text transition-all duration-300 hover:-translate-x-0.5 hover:border-accent-green hover:bg-accent-green hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-x-0 disabled:hover:border-light-border disabled:hover:bg-black/[0.02] dark:border-dark-border dark:bg-white/[0.03] dark:text-dark-text dark:hover:border-accent-green dark:hover:bg-accent-green dark:disabled:hover:border-dark-border dark:disabled:hover:bg-white/[0.03]"
            aria-label="Previous project"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          {projects.map((project, index) => (
            <button
              type="button"
              key={project.id}
              onClick={() => goToProject(index)}
              aria-label={`Show project ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 hover:bg-accent-green ${
                index === activeIndex
                  ? "scale-125 bg-accent-green"
                  : "bg-light-border dark:bg-dark-border"
              }`}
            />
          ))}

          <button
            type="button"
            onClick={() => goToProject(activeIndex + 1)}
            disabled={activeIndex === projects.length - 1}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-light-border bg-black/[0.02] text-light-text transition-all duration-300 hover:translate-x-0.5 hover:border-accent-green hover:bg-accent-green hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-x-0 disabled:hover:border-light-border disabled:hover:bg-black/[0.02] dark:border-dark-border dark:bg-white/[0.03] dark:text-dark-text dark:hover:border-accent-green dark:hover:bg-accent-green dark:disabled:hover:border-dark-border dark:disabled:hover:bg-white/[0.03]"
            aria-label="Next project"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          <span className="sr-only">
            Project {activeIndex + 1} of {projects.length}
          </span>
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
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-light-border dark:border-dark-border bg-black/[0.03] dark:bg-white/[0.04] sm:h-11 sm:w-11 sm:rounded-2xl">
          {logo ? (
            <img
              src={logo}
              alt={tech.name}
              className="h-6 w-6 object-contain transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <span className="text-xs font-semibold text-accent-green sm:text-sm">
              {tech.name?.charAt(0)}
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
                {logo && (
                  <img
                    src={logo}
                    alt={tech.name}
                    className="h-5 w-5 object-contain"
                    loading="lazy"
                  />
                )}

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
      <div className="mx-auto max-w-3xl text-center">
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
            {sortedTechStacks.map((tech) => (
              <TechStackCard key={tech.id || tech.name} tech={tech} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState(null);

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
      className="overflow-hidden bg-light-bg dark:bg-dark-bg px-6 py-20 text-light-text dark:text-dark-text md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-content">
        <div className="mx-auto max-w-3xl text-center">
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
            <ProjectCarousel
              projects={projects}
              onOpen={setSelectedProject}
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

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
