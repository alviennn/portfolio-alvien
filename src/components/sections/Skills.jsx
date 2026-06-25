import { useLanguage } from "../../i18n/LanguageContext";
import { useFirestoreCollection } from "../../hooks/useFirestoreCollection";
import { skillsService } from "../../services/firestoreService";
import { seedSkills } from "../../data/seedData";
import { LoadingState, EmptyState, ErrorState } from "../ui/StatusStates";

export default function Skills() {
  const { t, lang } = useLanguage();
  const { data, loading, error } = useFirestoreCollection(skillsService);

  const skills = !loading && !error && data.length > 0 ? data : seedSkills;

  const sortedSkills = [...skills].sort((a, b) => {
    return (a.order || 0) - (b.order || 0);
  });

  const groupedSkills = sortedSkills.reduce((acc, skill) => {
    const category =
      lang === "id"
        ? skill.category_id || skill.category_en || "Lainnya"
        : skill.category_en || skill.category_id || "Others";

    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);

    return acc;
  }, {});

  return (
    <section
      id="skills"
      className="section-wrapper bg-light-bgSecondary dark:bg-dark-bgSecondary"
    >
      <div className="max-w-3xl">
        <h2 className="section-title">{t("skills.title")}</h2>
        <p className="section-subtitle">{t("skills.description")}</p>
      </div>

      <div className="mt-10">
        {loading && <LoadingState message={t("skills.loading")} />}

        {error && <ErrorState message={t("skills.error")} />}

        {!loading && !error && skills.length === 0 && (
          <EmptyState message={t("skills.empty")} />
        )}

        {!loading && !error && skills.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(groupedSkills).map(([category, items]) => (
              <div
                key={category}
                className="rounded-2xl border border-light-border bg-light-bg p-5 dark:border-dark-border dark:bg-dark-bg md:p-6"
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-green">
                    {category}
                  </h3>

                  <span className="rounded-full bg-light-bgSecondary px-2.5 py-1 text-xs text-light-muted dark:bg-dark-bgSecondary dark:text-dark-muted">
                    {items.length}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <div
                      key={skill.id}
                      className="group rounded-full bg-light-bgSecondary px-3 py-1.5 text-sm text-light-muted transition-colors duration-200 hover:text-light-text dark:bg-dark-bgSecondary dark:text-dark-muted dark:hover:text-dark-text"
                    >
                      <span>{skill.name}</span>

                      {skill.level && (
                        <span className="ml-1.5 text-[11px] opacity-50">
                          {skill.level}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}