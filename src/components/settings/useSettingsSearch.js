import { useMemo } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { PANE_MAP, SETTING_PANES } from "./settingsConfig";

/**
 * Searches both setting panes and live portfolio records (experiences, certifications, projects, skills).
 */
export function useSettingsSearch({
  query,
  projects,
  experiences,
  skills,
  certifications,
}) {
  const { t, tField } = useLanguage();

  return useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return {
        isSearching: false,
        matchingPanes: SETTING_PANES,
        itemMatches: [],
      };
    }

    const matchingPanes = SETTING_PANES.filter((pane) => {
      const title = t(`settings.nav.${pane.id}`).toLowerCase();
      const subtitle = t(`settings.subtitles.${pane.id}`).toLowerCase();
      return title.includes(trimmed) || subtitle.includes(trimmed);
    });

    const itemMatches = [];

    (experiences || []).forEach((exp) => {
      const title = tField(exp, "title");
      const company = exp.company || "";
      if (
        title.toLowerCase().includes(trimmed) ||
        company.toLowerCase().includes(trimmed)
      ) {
        itemMatches.push({
          key: `exp-${exp.id}`,
          paneId: "experience",
          title,
          subtitle: `${t("settings.nav.experience")} • ${company}`,
          pane: PANE_MAP.experience,
        });
      }
    });

    (certifications || []).forEach((cert) => {
      const title = tField(cert, "title");
      const issuer = cert.issuer || "";
      if (
        title.toLowerCase().includes(trimmed) ||
        issuer.toLowerCase().includes(trimmed)
      ) {
        itemMatches.push({
          key: `cert-${cert.id}`,
          paneId: "certifications",
          title,
          subtitle: `${t("settings.nav.certifications")} • ${issuer}`,
          pane: PANE_MAP.certifications,
        });
      }
    });

    (projects || []).forEach((project) => {
      const title = tField(project, "title");
      const category = tField(project, "category");
      const stack = (project.techStack || []).join(" ");
      if (
        title.toLowerCase().includes(trimmed) ||
        category.toLowerCase().includes(trimmed) ||
        stack.toLowerCase().includes(trimmed)
      ) {
        itemMatches.push({
          key: `project-${project.id}`,
          paneId: "projects",
          title,
          subtitle: `${t("settings.nav.projects")} • ${category}`,
          pane: PANE_MAP.projects,
        });
      }
    });

    (skills || []).forEach((skill) => {
      const name = skill.name || "";
      const category = tField(skill, "category");
      if (
        name.toLowerCase().includes(trimmed) ||
        category.toLowerCase().includes(trimmed)
      ) {
        itemMatches.push({
          key: `skill-${skill.id || name}`,
          paneId: "skills",
          title: name,
          subtitle: `${t("settings.nav.skills")} • ${category}`,
          pane: PANE_MAP.skills,
        });
      }
    });

    return {
      isSearching: true,
      matchingPanes,
      itemMatches: itemMatches.slice(0, 8),
    };
  }, [query, projects, experiences, skills, certifications, t, tField]);
}
