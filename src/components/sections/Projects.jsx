import { Link } from "react-router-dom";
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
    <li className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/55">
      {logo && (
        <img
          src={logo}
          alt={tech}
          className="h-3.5 w-3.5 object-contain"
          loading="lazy"
        />
      )}
      <span>{tech}</span>
    </li>
  );
}

function ProjectCard({ project, index }) {
  const { tField } = useLanguage();
  const techStack = project.techStack || [];

  return (
    <Link
      to={`/projects/${project.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-accent-green/50 hover:bg-white/[0.04]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-white/[0.04]">
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={tField(project, "title")}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-6 text-center font-display text-2xl font-semibold text-white/20">
            {tField(project, "title")}
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

        <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/35 px-3 py-1.5 text-xs font-semibold text-white/70 backdrop-blur-md">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="absolute right-4 top-4 rounded-full border border-accent-green/30 bg-accent-green/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-green backdrop-blur-md">
          {tField(project, "category")}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-green">
            {tField(project, "category")}
          </p>

          <h3 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-[-0.04em] text-white">
            {tField(project, "title")}
          </h3>
        </div>

        {techStack.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {techStack.slice(0, 5).map((tech) => (
              <ProjectTechPill key={tech} tech={tech} />
            ))}

            {techStack.length > 5 && (
              <li className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/55">
                +{techStack.length - 5}
              </li>
            )}
          </ul>
        )}

        <div className="mt-auto pt-6">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/65 transition-colors duration-300 group-hover:text-accent-green">
            View Detail
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
    </Link>
  );
}

function TechStackCard({ tech }) {
  const logo = getTechLogo(tech.name);

  return (
    <article className="group flex items-center justify-between gap-4 rounded-[1.35rem] border border-white/10 bg-white/[0.025] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent-green/50 hover:bg-white/[0.05]">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
          {logo ? (
            <img
              src={logo}
              alt={tech.name}
              className="h-6 w-6 object-contain transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <span className="text-sm font-semibold text-accent-green">
              {tech.name?.charAt(0)}
            </span>
          )}
        </div>

        <div className="min-w-0">
          <h3 className="truncate font-display text-base font-semibold text-white">
            {tech.name}
          </h3>

          {(tech.category_en || tech.category_id || tech.level) && (
            <p className="mt-1 truncate text-xs uppercase tracking-[0.14em] text-white/35">
              {tech.category_en || tech.category_id || tech.level}
            </p>
          )}
        </div>
      </div>

      <span className="text-accent-green opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
        ✦
      </span>
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
    <div className="relative left-1/2 right-1/2 mt-14 w-screen -translate-x-1/2 overflow-hidden border-y border-white/10 bg-white/[0.015] py-5">
      <div className="marquee-track flex w-max items-center gap-5">
        {marqueeItems.map((tech, index) => {
          const logo = getTechLogo(tech.name);

          return (
            <div
              key={`${tech.id || tech.name}-${index}`}
              className="flex items-center gap-5"
            >
              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.025] px-4 py-2">
                {logo && (
                  <img
                    src={logo}
                    alt={tech.name}
                    className="h-5 w-5 object-contain"
                    loading="lazy"
                  />
                )}

                <span className="whitespace-nowrap text-sm font-semibold text-white/65">
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

        <h3 className="mt-4 font-display text-4xl font-semibold leading-[0.98] tracking-[-0.06em] text-white md:text-6xl">
          {t("projects.techStackTitle")}
        </h3>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/50">
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

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
      className="overflow-hidden bg-[#0B0B0B] px-6 py-20 text-white md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-content">
        <div className="mx-auto max-w-3xl text-center">
          <p className="editorial-label">✦ {t("nav.projects")}</p>

          <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.95] tracking-[-0.07em] text-white md:text-7xl">
            {t("projects.title")}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/50">
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
            <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
          )}
        </div>

        <TechStackSection
          techStacks={techStacks}
          loading={skillLoading}
          error={skillError}
        />

        {showFallback && <p className="mt-6 text-xs text-white/35" />}
      </div>
    </section>
  );
}