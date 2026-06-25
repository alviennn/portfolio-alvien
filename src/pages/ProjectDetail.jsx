import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";
import { projectsService } from "../services/firestoreService";
import { seedProjects } from "../data/seedData";
import { LoadingState, ErrorState } from "../components/ui/StatusStates";
import Footer from "../components/layout/Footer";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, tField } = useLanguage();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError("");

        const firestoreProject = await projectsService.getById(id);

        if (firestoreProject) {
          setProject(firestoreProject);
          return;
        }

        const fallbackProject = seedProjects.find((item) => item.id === id);

        if (fallbackProject) {
          setProject(fallbackProject);
          return;
        }

        setProject(null);
      } catch (err) {
        console.error("Failed to load project detail:", err);
        setError(t("projects.error"));
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, t]);

  if (loading) {
    return (
      <main className="min-h-screen bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text">
        <section className="section-wrapper pt-32">
          <LoadingState message={t("projects.detailLoading")} />
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text">
        <section className="section-wrapper pt-32">
          <ErrorState message={error} />
        </section>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text">
        <section className="section-wrapper pt-32">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent-green">
              {t("common.notFound")}
            </p>

            <h1 className="mt-4 font-display text-4xl font-semibold">
              {t("projects.notFoundTitle")}
            </h1>

            <p className="mt-4 text-light-muted dark:text-dark-muted">
              {t("projects.notFoundDescription")}
            </p>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="btn-primary mt-8"
            >
              {t("common.backToHome")}
            </button>
          </div>
        </section>
      </main>
    );
  }

  const title = tField(project, "title");
  const category = tField(project, "category");
  const role = tField(project, "role");
  const description = tField(project, "description");
  const techStack = project.techStack || [];

  return (
    <main className="min-h-screen bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text">
      <section className="section-wrapper pt-32 md:pt-40">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-light-muted transition-colors duration-200 hover:text-accent-green dark:text-dark-muted"
        >
          <span>←</span>
          <span>{t("common.backToHome")}</span>
        </Link>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-green">
              {category}
            </p>

            <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-tight md:text-5xl">
              {title}
            </h1>

            {role && (
              <p className="mt-5 text-base text-light-muted dark:text-dark-muted">
                {t("projects.role")}: {role}
              </p>
            )}

            <p className="mt-8 max-w-3xl text-base leading-relaxed text-light-muted dark:text-dark-muted md:text-lg">
              {description}
            </p>

            {techStack.length > 0 && (
              <div className="mt-8">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-light-text dark:text-dark-text">
                  {t("projects.techStack")}
                </h2>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full bg-light-bgSecondary px-3 py-1.5 text-sm text-light-muted dark:bg-dark-bgSecondary dark:text-dark-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.projectLink && (
              <a
                href={project.projectLink}
                target="_blank"
                rel="noreferrer"
                className="btn-primary mt-10 inline-flex"
              >
                {t("projects.viewSite")}
              </a>
            )}
          </div>

          <div className="overflow-hidden rounded-3xl border border-light-border bg-light-bgSecondary dark:border-dark-border dark:bg-dark-bgSecondary">
            {project.coverImage ? (
              <img
                src={project.coverImage}
                alt={title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex aspect-[16/10] items-center justify-center px-6 text-center text-sm text-light-muted dark:text-dark-muted">
                {title}
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 border-t border-light-border pt-10 dark:border-dark-border">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-accent-green">
                {t("projects.category")}
              </p>
              <p className="mt-2 text-sm text-light-muted dark:text-dark-muted">
                {category}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-accent-green">
                {t("projects.role")}
              </p>
              <p className="mt-2 text-sm text-light-muted dark:text-dark-muted">
                {role || "-"}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-accent-green">
                {t("projects.techStack")}
              </p>
              <p className="mt-2 text-sm text-light-muted dark:text-dark-muted">
                {techStack.length > 0 ? techStack.join(", ") : "-"}
              </p>
            </div>
          </div>
        </div>
      </section>
        <Footer />
    </main>
  );
}