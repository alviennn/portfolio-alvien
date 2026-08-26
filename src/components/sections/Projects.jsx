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
          const limitedOffset = Math.max(-1, Math.min(1, offset));
          const focusDistance = Math.min(distance, 1);

          card.style.transform = `perspective(1200px) translate3d(${limitedOffset * 14}px, ${focusDistance * 18}px, 0) rotateY(${-limitedOffset * 5}deg) scale(${1 - focusDistance * 0.12})`;
          card.style.filter = `blur(${focusDistance * 2.25}px)`;
          card.style.opacity = `${1 - focusDistance * 0.2}`;

          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestIndex = index;
          }
        });

        setActiveIndex(nearestIndex);
      });
    };

    const handleWheel = (event) => {
      // Keep vertical page scrolling available once either end is reached.
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

      const isScrollingForward = event.deltaY > 0;
      const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
      const hasNextProject = carousel.scrollLeft < maxScrollLeft - 1;
      const hasPreviousProject = carousel.scrollLeft > 1;

      if (
        (isScrollingForward && hasNextProject) ||
        (!isScrollingForward && hasPreviousProject)
      ) {
        event.preventDefault();
        carousel.scrollLeft += event.deltaY;
      }
    };

    carousel.addEventListener("scroll", updateActiveProject, { passive: true });
    carousel.addEventListener("wheel", handleWheel, { passive: false });
    updateActiveProject();

    return () => {
      cancelAnimationFrame(animationFrame);
      carousel.removeEventListener("scroll", updateActiveProject);
      carousel.removeEventListener("wheel", handleWheel);
    };
  }, [projects.length]);

  return (
    <div className="mx-auto max-w-6xl">
      <div
        ref={carouselRef}
        className="scrollbar-hide -mx-6 flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 active:cursor-grabbing md:mx-0 md:px-0"
        aria-label="Project carousel"
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            data-project-card
            className="w-full shrink-0 snap-center transform-gpu transition-[transform,opacity,filter] duration-200 ease-out sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
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
          className="mt-5 flex items-center justify-center gap-2"
          aria-label={`Project ${activeIndex + 1} of ${projects.length}`}
          aria-live="polite"
        >
          {projects.map((project, index) => (
            <span
              key={project.id}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-6 bg-accent-green"
                  : "w-1.5 bg-light-border dark:bg-dark-border"
              }`}
            />
          ))}
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
            <ProjectCarousel projects={projects} onOpen={setSelectedProject} />
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
