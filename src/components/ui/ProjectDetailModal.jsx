import { useEffect } from "react";
import { useLanguage } from "../../i18n/LanguageContext";

export default function ProjectDetailModal({ project, onClose }) {
  const { t, tField } = useLanguage();

  useEffect(() => {
    if (!project) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const title = tField(project, "title");
  const category = tField(project, "category");
  const role = tField(project, "role");
  const description = tField(project, "description");
  const techStack = project.techStack || [];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="
            relative
            w-full
            max-w-6xl
            max-h-[90vh]
            overflow-y-auto
            rounded-[1.75rem]
            border
            border-light-border
            bg-light-bg
            p-6
            dark:border-dark-border
            dark:bg-dark-bg
            sm:p-8
            md:p-10
        "
        >
        <button
          type="button"
          onClick={onClose}
          aria-label={t("common.close")}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-light-border text-light-text transition-colors duration-200 hover:border-accent-green hover:text-accent-green dark:border-dark-border dark:text-dark-text sm:right-6 sm:top-6"
        >
          ✕
        </button>
          <div className="space-y-8">
        {/* Preview Project */}
        <div className="overflow-hidden rounded-3xl border border-light-border bg-light-bgSecondary dark:border-dark-border dark:bg-dark-bgSecondary">
            {project.coverImage ? (
            <img
                src={project.coverImage}
                alt={title}
                className="w-full object-contain transition-transform duration-500 hover:scale-[1.02]"
            />
            ) : (
            <div className="flex aspect-[16/9] items-center justify-center text-light-muted dark:text-dark-muted">
                {title}
            </div>
            )}
        </div>

        {/* Project Info */}
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-green">
                {category}
            </p>

            <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-light-text dark:text-dark-text md:text-5xl">
                {title}
            </h1>

            {role && (
                <p className="mt-4 text-light-muted dark:text-dark-muted">
                <span className="font-medium text-light-text dark:text-dark-text">
                    {t("projects.role")}:
                </span>{" "}
                {role}
                </p>
            )}

            <p className="mt-6 max-w-3xl leading-relaxed text-light-muted dark:text-dark-muted">
                {description}
            </p>

            {project.projectLink && (
                <a
                href={project.projectLink}
                target="_blank"
                rel="noreferrer"
                className="btn-primary mt-8 inline-flex"
                >
                {t("projects.viewSite")}
                </a>
            )}
            </div>

            <div>
            {techStack.length > 0 && (
                <>
                <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-light-text dark:text-dark-text">
                    {t("projects.techStack")}
                </h2>

                <div className="mt-4 flex flex-wrap gap-3">
                    {techStack.map((tech) => (
                    <span
                        key={tech}
                        className="rounded-full border border-light-border bg-light-bgSecondary px-4 py-2 text-sm text-light-muted transition-colors duration-300 hover:border-accent-green hover:text-accent-green dark:border-dark-border dark:bg-dark-bgSecondary dark:text-dark-muted"
                    >
                        {tech}
                    </span>
                    ))}
                </div>
                </>
            )}
            </div>
        </div>
        </div>
        </div>
      </div>
  );    
}