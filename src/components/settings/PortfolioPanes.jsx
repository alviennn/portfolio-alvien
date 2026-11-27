import { useMemo, useState } from "react";
import {
  Award,
  BriefcaseBusiness,
  Check,
  Code2,
  Copy,
  ExternalLink,
  FileText,
  FolderKanban,
  GraduationCap,
  Layers,
  MapPin,
  Monitor,
  Moon,
  Radio,
  RotateCcw,
  Sparkles,
  Sun,
} from "../icons/AppleIcons";

import { useLanguage } from "../../i18n/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import { getTechLogo } from "../../utils/techlogo";
import { LoadingState, EmptyState, ErrorState } from "../ui/StatusStates";
import heroImage from "../../assets/konten-hero.jpg";
import cvPdf from "../../assets/cv-alvien-ridho.pdf";

import { ACCENT_COLORS } from "./settingsConfig";
import {
  IOSSwitch,
  SettingsGroup,
  SettingsNavGroup,
  SettingsRow,
} from "./SettingsPrimitives";

function formatDate(value) {
  if (!value) return "Present";
  const parts = String(value).split("-");
  if (parts.length < 2) return value;
  const [year, month] = parts;
  const date = new Date(Number(year), Number(month) - 1);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function resolveCvHref(cvLink) {
  if (!cvLink || cvLink === "/cv-alvien-ridho.pdf") {
    return cvPdf;
  }
  return cvLink;
}

/* ===================================================
   0. APPLE ACCOUNT / INTRODUCTION PANE (TOP OF MENU)
   =================================================== */
export function OverviewPane({
  projects,
  experiences,
  certifications,
  skills,
  contact,
  onNavigate,
  onReplayHello,
  onOpenAirDrop,
}) {
  const { t } = useLanguage();
  const cvHref = resolveCvHref(contact?.cvLink);

  const stats = [
    {
      id: "experience",
      label: t("settings.nav.experience"),
      count: experiences.length,
      icon: BriefcaseBusiness,
      gradient: "from-[#32ADE6] to-[#007AFF]",
    },
    {
      id: "certifications",
      label: t("settings.nav.certifications"),
      count: certifications.length,
      icon: Award,
      gradient: "from-[#FFD60A] to-[#FF9500]",
    },
    {
      id: "projects",
      label: t("settings.nav.projects"),
      count: projects.length,
      icon: FolderKanban,
      gradient: "from-[#FF9F0A] to-[#FF5E3A]",
    },
    {
      id: "skills",
      label: t("settings.nav.skills"),
      count: skills.length,
      icon: Code2,
      gradient: "from-[#34C759] to-[#248A3D]",
    },
  ];

  return (
    <div className="space-y-5">
      {/* 1:1 Apple Account Centered Profile & Introduction Header */}
      <div className="overflow-hidden rounded-[12px] border border-black/[0.06] bg-white px-5 py-6 text-center dark:border-white/[0.08] dark:bg-[#1C1C1E] lg:rounded-[10px] lg:dark:bg-[#272729]">
        <div className="mx-auto flex flex-col items-center">
          <button
            type="button"
            onClick={onOpenAirDrop}
            title={t("settings.airdrop.tapHint")}
            className="group relative rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--apple-accent)]"
          >
            <img
              src={heroImage}
              alt="Alvien Ridho Nanda Pryastika"
              className="h-[88px] w-[88px] rounded-full border border-black/10 object-cover object-[center_18%] shadow-sm transition-transform duration-200 group-hover:scale-[1.04] group-active:scale-95 dark:border-white/15"
            />
            <span
              className="absolute bottom-0.5 right-0.5 h-4 w-4 rounded-full border-2 border-white bg-[#34C759] dark:border-[#1C1C1E]"
              title={t("settings.statusAvailable")}
            />
          </button>

          <button
            type="button"
            onClick={onOpenAirDrop}
            className="mt-2 inline-flex items-center gap-1 rounded-full bg-[var(--apple-accent-soft)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--apple-accent)] transition-opacity hover:opacity-80"
          >
            <Radio size={11} aria-hidden="true" />
            <span>{t("settings.airdrop.tapHint")}</span>
          </button>

          <h2 className="mt-3 text-[21px] font-bold tracking-[-0.02em] text-[#000000] dark:text-[#FFFFFF]">
            Alvien Ridho Nanda Pryastika
          </h2>

          <p className="mt-0.5 text-[13.5px] font-medium text-[#6E6E73] dark:text-[#98989D]">
            {t("hero.role")}
          </p>

          <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#34C759]/15 px-2.5 py-0.5 text-[11px] font-semibold text-[#1F8A3D] dark:text-[#30D158]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#34C759]" />
            {t("settings.statusAvailable")}
          </span>

          <div className="mt-4 max-w-[540px] space-y-2 text-[13.5px] leading-relaxed text-[#3A3A3C] dark:text-[#D1D1D6]">
            <p>{t("hero.description")}</p>
            <p className="text-[#6E6E73] dark:text-[#98989D]">
              {t("about.paragraph1")}
            </p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <SettingsNavGroup title={t("settings.overviewPane.accountCardTitle")}>
        <SettingsRow
          icon={GraduationCap}
          gradient="from-[#5856D6] to-[#3634A3]"
          title={t("settings.overviewPane.educationLabel")}
          value={t("settings.overviewPane.educationValue")}
          allowValueWrap
        />
        <SettingsRow
          icon={Layers}
          gradient="from-[#32ADE6] to-[#007AFF]"
          title={t("settings.overviewPane.degreeLabel")}
          value={t("settings.overviewPane.degreeValue")}
          allowValueWrap
        />
        <SettingsRow
          icon={MapPin}
          gradient="from-[#FF3B30] to-[#D70015]"
          title={t("settings.overviewPane.locationLabel")}
          value={t("settings.overviewPane.locationValue")}
          allowValueWrap
        />
      </SettingsNavGroup>

      {/* Portfolio Summary in Approved Order */}
      <SettingsNavGroup title={t("settings.overviewPane.quickStatsTitle")}>
        {stats.map((stat) => (
          <SettingsRow
            key={stat.id}
            icon={stat.icon}
            gradient={stat.gradient}
            title={stat.label}
            value={String(stat.count)}
            chevron
            onClick={() => onNavigate(stat.id)}
          />
        ))}
      </SettingsNavGroup>

      {/* Quick Actions */}
      <SettingsNavGroup title={t("settings.overviewPane.featuredActionTitle")}>
        <SettingsRow
          icon={FileText}
          gradient="from-[#64D2FF] to-[#0A84FF]"
          title={t("contact.viewCV")}
          subtitle={t("settings.contactPane.cvSub")}
          href={cvHref}
          target="_blank"
          rel="noreferrer"
          trailing={
            <ExternalLink
              size={14}
              className="text-[#8E8E93]"
              aria-hidden="true"
            />
          }
        />
        {onReplayHello && (
          <SettingsRow
            icon={RotateCcw}
            gradient="from-[#8E8E93] to-[#636366]"
            title={t("settings.replayHello")}
            chevron
            onClick={onReplayHello}
          />
        )}
      </SettingsNavGroup>
    </div>
  );
}

/* ===================================================
   1. EXPERIENCE PANE
   =================================================== */
export function ExperiencePane({ experiences, loading, error }) {
  const { t, tField } = useLanguage();

  if (loading) return <LoadingState message={t("experience.loading")} />;
  if (error) return <ErrorState message={t("experience.error")} />;
  if (!experiences || experiences.length === 0) {
    return <EmptyState message={t("experience.empty")} />;
  }

  return (
    <div className="space-y-5">
      <SettingsGroup
        title={`${t("experience.title")} (${experiences.length})`}
        footer={t("experience.description")}
      >
        {experiences.map((item) => (
          <div key={item.id} className="px-4 py-3.5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--apple-accent)]" />
                <h4 className="text-[14.5px] font-semibold text-[#000000] dark:text-[#FFFFFF]">
                  {tField(item, "title")}
                </h4>
              </div>
              <span className="rounded-md bg-[#F2F2F7] px-2 py-0.5 text-[11.5px] font-medium text-[#6E6E73] dark:bg-[#2C2C2E] dark:text-[#A1A1A6]">
                {formatDate(item.startDate)} — {formatDate(item.endDate)}
              </span>
            </div>

            {item.company && (
              <p className="mt-1 pl-5 text-[13px] font-medium text-[var(--apple-accent)]">
                {item.company}
              </p>
            )}

            {tField(item, "description") && (
              <p className="mt-2 pl-5 text-[13px] leading-relaxed text-[#6E6E73] dark:text-[#A1A1A6]">
                {tField(item, "description")}
              </p>
            )}
          </div>
        ))}
      </SettingsGroup>
    </div>
  );
}

/* ===================================================
   2. CERTIFICATIONS PANE
   =================================================== */
export function CertificationsPane({
  certifications,
  loading,
  error,
  onSelectCertification,
}) {
  const { t, tField } = useLanguage();

  if (loading) return <LoadingState message={t("certifications.loading")} />;
  if (error) return <ErrorState message={t("certifications.error")} />;
  if (!certifications || certifications.length === 0) {
    return <EmptyState message={t("certifications.empty")} />;
  }

  return (
    <div className="space-y-5">
      <SettingsNavGroup
        title={`${t("certifications.title")} (${certifications.length})`}
        footer={t("certifications.description")}
      >
        {certifications.map((cert) => (
          <SettingsRow
            key={cert.id}
            icon={Award}
            gradient="from-[#FFD60A] to-[#FF9500]"
            title={tField(cert, "title")}
            subtitle={cert.issuer || t("certifications.issuer")}
            value={cert.year || cert.date || formatDate(cert.issueDate)}
            chevron
            onClick={() => onSelectCertification(cert)}
          />
        ))}
      </SettingsNavGroup>
    </div>
  );
}

/* ===================================================
   3. PROJECTS PANE
   =================================================== */
export function ProjectsPane({
  projects,
  loading,
  error,
  onSelectProjectModal,
}) {
  const { t, tField } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (loading) return <LoadingState message={t("projects.loading")} />;
  if (error) return <ErrorState message={t("projects.error")} />;
  if (!projects || projects.length === 0) {
    return <EmptyState message={t("projects.empty")} />;
  }

  const safeIndex = selectedIndex < projects.length ? selectedIndex : 0;
  const activeProject = projects[safeIndex];
  const techStack = activeProject.techStack || [];

  return (
    <div className="space-y-5">
      {/* Preview Box */}
      <div className="overflow-hidden rounded-[12px] border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#1C1C1E] lg:rounded-[10px] lg:dark:bg-[#272729]">
        <div className="relative aspect-[16/9] max-h-[250px] w-full overflow-hidden bg-[#F2F2F7] dark:bg-[#141416]">
          {activeProject.coverImage ? (
            <img
              src={activeProject.coverImage}
              alt={tField(activeProject, "title")}
              className="h-full w-full object-contain p-3"
            />
          ) : (
            <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-gradient-to-br from-[#4F7A6B]/20 via-[#5B7FA6]/15 to-transparent p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/85 px-2.5 py-0.5 text-[11px] font-semibold text-[#1D1D1F] backdrop-blur-sm dark:bg-black/50 dark:text-[#F5F5F7]">
                  {tField(activeProject, "category")}
                </span>
                <span className="font-mono text-[12px] font-semibold text-[#6E6E73] dark:text-[#A1A1A6]">
                  {String(safeIndex + 1).padStart(2, "0")} /{" "}
                  {String(projects.length).padStart(2, "0")}
                </span>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--apple-accent)]">
                  {tField(activeProject, "role")}
                </p>
                <h3 className="mt-1 font-display text-2xl font-bold tracking-tight text-[#000000] dark:text-[#FFFFFF] sm:text-3xl">
                  {tField(activeProject, "title")}
                </h3>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3 border-t border-black/[0.06] p-4 dark:border-white/[0.08] sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--apple-accent)]">
                {tField(activeProject, "category")}
              </p>
              <h3 className="text-[17px] font-bold text-[#000000] dark:text-[#FFFFFF]">
                {tField(activeProject, "title")}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSelectProjectModal(activeProject)}
                className="rounded-full bg-[#F2F2F7] px-3 py-1.5 text-[12px] font-semibold text-[#1D1D1F] transition-colors hover:bg-[#E5E5EA] dark:bg-[#2C2C2E] dark:text-[#F5F5F7] dark:hover:bg-[#3A3A3C] lg:rounded-[6px] lg:border lg:border-black/[0.1] lg:bg-white lg:dark:border-white/[0.12] lg:dark:bg-[#3A3A3C]"
              >
                {t("settings.inspectProject")}
              </button>

              {activeProject.projectLink && (
                <a
                  href={activeProject.projectLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-full bg-[var(--apple-accent)] px-3 py-1.5 text-[12px] font-semibold text-white transition-opacity hover:opacity-90 lg:rounded-[6px]"
                >
                  {t("projects.viewSite")}
                  <ExternalLink size={12} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          <p className="text-[13px] leading-relaxed text-[#6E6E73] dark:text-[#A1A1A6]">
            {tField(activeProject, "description")}
          </p>

          {techStack.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {techStack.map((tech) => {
                const logo = getTechLogo(tech);
                return (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 rounded-md border border-black/[0.06] bg-[#F2F2F7] px-2 py-1 text-[11px] font-medium text-[#1D1D1F] dark:border-white/[0.08] dark:bg-[#2C2C2E] dark:text-[#E5E5EA]"
                  >
                    {logo && (
                      <img
                        src={logo}
                        alt={tech}
                        className="h-3.5 w-3.5 object-contain"
                        loading="lazy"
                      />
                    )}
                    {tech}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* All Projects List */}
      <SettingsGroup
        title={`${t("projects.title")} (${projects.length})`}
        footer={t("projects.description")}
      >
        {projects.map((project, index) => {
          const isSelected = index === safeIndex;
          return (
            <SettingsRow
              key={project.id}
              title={tField(project, "title")}
              subtitle={`${tField(project, "category")} • ${tField(
                project,
                "role"
              )}`}
              onClick={() => setSelectedIndex(index)}
              trailing={
                <div className="flex items-center gap-2">
                  {isSelected && (
                    <Check
                      size={16}
                      className="text-[var(--apple-accent)]"
                      aria-hidden="true"
                    />
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProjectModal(project);
                    }}
                    className="rounded-md px-2 py-1 text-[12px] font-medium text-[var(--apple-accent)] hover:bg-[var(--apple-accent-soft)]"
                  >
                    {t("settings.inspectProject")}
                  </button>
                </div>
              }
            />
          );
        })}
      </SettingsGroup>
    </div>
  );
}

/* ===================================================
   4. TECH STACK / SKILLS PANE
   =================================================== */
export function SkillsPane({ skills, loading, error }) {
  const { t, tField } = useLanguage();

  const sortedSkills = useMemo(
    () => [...(skills || [])].sort((a, b) => (a.order || 0) - (b.order || 0)),
    [skills]
  );

  if (loading) return <LoadingState message={t("skills.loading")} />;
  if (error) return <ErrorState message={t("skills.error")} />;
  if (sortedSkills.length === 0) {
    return <EmptyState message={t("skills.empty")} />;
  }

  return (
    <SettingsGroup>
      {sortedSkills.map((tech) => {
        const logo = getTechLogo(tech.name);
        return (
          <SettingsRow
            key={tech.id || tech.name}
            title={tech.name}
            subtitle={tech.level}
            leadingIcon={
              <span className="flex h-[29px] w-[29px] shrink-0 items-center justify-center rounded-[7px] border border-black/[0.06] bg-[#F2F2F7] dark:border-white/[0.08] dark:bg-[#2C2C2E]">
              {logo ? (
                <img
                  src={logo}
                  alt={tech.name}
                  className="h-4 w-4 object-contain"
                  loading="lazy"
                />
              ) : (
                <span className="text-[10px] font-bold uppercase text-[var(--apple-accent)]">
                  {tech.name?.slice(0, 2)}
                </span>
              )}
              </span>
            }
          />
        );
      })}
    </SettingsGroup>
  );
}

/* ===================================================
   5. WORK PROCESS & DESIGN FOCUS PANE
   =================================================== */
export function WorkProcessPane() {
  const { t } = useLanguage();

  const capabilities = [
    t("about.marquee.design"),
    t("about.marquee.frontend"),
    t("about.marquee.usability"),
    t("about.marquee.interface"),
    t("about.marquee.development"),
    t("about.marquee.analysis"),
  ];

  const steps = [
    {
      number: "01",
      title: t("about.process.discovery.title"),
      description: t("about.process.discovery.description"),
      color: "from-[#5AC8FA] to-[#007AFF]",
    },
    {
      number: "02",
      title: t("about.process.strategy.title"),
      description: t("about.process.strategy.description"),
      color: "from-[#7D7AFF] to-[#5856D6]",
    },
    {
      number: "03",
      title: t("about.process.design.title"),
      description: t("about.process.design.description"),
      color: "from-[#FF9F0A] to-[#FF6B00]",
    },
    {
      number: "04",
      title: t("about.process.development.title"),
      description: t("about.process.development.description"),
      color: "from-[#34C759] to-[#248A3D]",
    },
  ];

  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-[12px] border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#1C1C1E] lg:rounded-[10px] lg:dark:bg-[#272729]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--apple-accent)]">
          {t("about.label")}
        </p>
        <h2 className="mt-1.5 font-display text-[21px] font-bold leading-snug tracking-[-0.02em] text-[#000000] dark:text-[#FFFFFF] sm:text-[24px]">
          {t("about.header.line1")}{" "}
          <span className="text-[var(--apple-accent)]">
            {t("about.header.highlight")}
          </span>{" "}
          {t("about.header.line2")}
        </h2>

        <p className="mt-3 text-[13.5px] leading-relaxed text-[#6E6E73] dark:text-[#A1A1A6]">
          {t("about.paragraph2")}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {capabilities.map((cap) => (
            <span
              key={cap}
              className="rounded-full border border-black/[0.06] bg-[#F2F2F7] px-2.5 py-1 text-[11.5px] font-medium text-[#1D1D1F] dark:border-white/[0.08] dark:bg-[#2C2C2E] dark:text-[#E5E5EA]"
            >
              {cap}
            </span>
          ))}
        </div>
      </div>

      <SettingsGroup
        title={t("about.process.title")}
        footer={t("about.process.description")}
      >
        {steps.map((step) => (
          <div
            key={step.number}
            className="flex items-start gap-3.5 px-4 py-3.5"
          >
            <span
              className={`mt-0.5 inline-flex h-[29px] w-[29px] shrink-0 items-center justify-center rounded-[7px] bg-gradient-to-b ${step.color} text-[11.5px] font-bold text-white shadow-sm`}
            >
              {step.number}
            </span>
            <div className="min-w-0">
              <h4 className="text-[14.5px] font-semibold text-[#000000] dark:text-[#FFFFFF]">
                {step.title}
              </h4>
              <p className="mt-0.5 text-[13px] leading-relaxed text-[#6E6E73] dark:text-[#A1A1A6]">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </SettingsGroup>
    </div>
  );
}

/* ===================================================
   6. CONTACT & CV PANE
   =================================================== */
function GmailAppIcon() {
  return (
    <span className="inline-flex h-[29px] w-[29px] shrink-0 items-center justify-center rounded-[7px] border border-black/[0.08] bg-white shadow-[0_1px_1.5px_rgba(0,0,0,0.08)] dark:border-white/[0.12]">
      <svg width="18" height="14" viewBox="0 0 24 18" fill="none" aria-hidden="true">
        <path d="M1.636 18H5.455V8.727L0 4.636V16.364C0 17.268 0.732 18 1.636 18Z" fill="#4285F4" />
        <path d="M18.545 18H22.364C23.268 18 24 17.268 24 16.364V4.636L18.545 8.727V18Z" fill="#34A853" />
        <path d="M18.545 1.636V8.727L24 4.636V2.455C24 0.432 21.691 -0.722 20.073 0.491L18.545 1.636Z" fill="#FBBC05" />
        <path d="M5.455 8.727V1.636L12 6.545L18.545 1.636V8.727L12 13.636L5.455 8.727Z" fill="#EA4335" />
        <path d="M0 2.455V4.636L5.455 8.727V1.636L3.927 0.491C2.309 -0.722 0 0.432 0 2.455Z" fill="#C5221F" />
      </svg>
    </span>
  );
}

function LinkedInAppIcon() {
  return (
    <span className="inline-flex h-[29px] w-[29px] shrink-0 items-center justify-center rounded-[7px] bg-[#0A66C2] text-white shadow-[inset_0_0.5px_0_rgba(255,255,255,0.28),0_1px_1.5px_rgba(0,0,0,0.12)]">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.94 8.5H3.56V19.5H6.94V8.5ZM5.25 3.5C4.14 3.5 3.25 4.39 3.25 5.5C3.25 6.6 4.14 7.5 5.25 7.5C6.35 7.5 7.25 6.6 7.25 5.5C7.25 4.39 6.35 3.5 5.25 3.5ZM20.44 13.02C20.44 9.88 18.76 8.22 16.16 8.22C14.37 8.22 13.48 9.21 13.02 9.93V8.5H9.65C9.7 9.48 9.65 19.5 9.65 19.5H13.02V13.36C13.02 13.02 13.05 12.69 13.15 12.45C13.42 11.78 14.03 11.09 15.07 11.09C16.41 11.09 17.06 12.11 17.06 13.6V19.5H20.44V13.02Z" />
      </svg>
    </span>
  );
}

function GitHubAppIcon() {
  return (
    <span className="inline-flex h-[29px] w-[29px] shrink-0 items-center justify-center rounded-[7px] bg-[#181717] text-white shadow-[inset_0_0.5px_0_rgba(255,255,255,0.2),0_1px_1.5px_rgba(0,0,0,0.16)] dark:bg-[#24292F]">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.24.73-.53v-1.85c-3.03.66-3.67-1.45-3.67-1.45-.55-1.29-1.28-1.64-1.28-1.64-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.42-.27-4.97-1.21-4.97-5.39 0-1.19.43-2.16 1.12-2.92-.11-.28-.49-1.39.11-2.89 0 0 .92-.29 3 1.12a10.4 10.4 0 015.5 0c2.08-1.41 3-1.12 3-1.12.6 1.5.22 2.61.11 2.89.7.76 1.12 1.73 1.12 2.92 0 4.19-2.55 5.12-4.99 5.38.42.36.78 1.06.78 2.15v3.18c0 .29.19.63.74.52A11 11 0 0012 1.27Z" />
      </svg>
    </span>
  );
}

export function ContactPane({ contact }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const email = contact?.email || "alvien.rnp@gmail.com";
  const linkedin = contact?.linkedin || "https://www.linkedin.com/in/alvienrnp/";
  const github = contact?.github || "https://github.com/alviennn";
  const cvHref = resolveCvHref(contact?.cvLink);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard fallback ignored if blocked
    }
  };

  return (
    <div className="space-y-5">
      <div className="rounded-[12px] border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#1C1C1E] lg:rounded-[10px] lg:dark:bg-[#272729]">
        <h3 className="font-display text-[19px] font-bold tracking-tight text-[#000000] dark:text-[#FFFFFF]">
          {t("contact.title")}
        </h3>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#6E6E73] dark:text-[#A1A1A6]">
          {t("contact.description")}
        </p>
      </div>

      <SettingsNavGroup title={t("settings.contactPane.channelsTitle")}>
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5">
          <div className="flex min-w-0 items-center gap-3.5">
            <GmailAppIcon />
            <div className="min-w-0">
              <div className="text-[15px] font-normal text-[#000000] dark:text-[#FFFFFF] lg:text-[13.5px]">
                Gmail
              </div>
              <div className="truncate text-[12px] text-[#8E8E93]">{email}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#F2F2F7] px-3 py-1.5 text-[12px] font-medium text-[#1D1D1F] transition-colors hover:bg-[#E5E5EA] dark:bg-[#2C2C2E] dark:text-[#F5F5F7] dark:hover:bg-[#3A3A3C] lg:rounded-[6px]"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-[#34C759]" />
                  {t("settings.copied")}
                </>
              ) : (
                <>
                  <Copy size={13} />
                  {t("settings.copyEmail")}
                </>
              )}
            </button>

            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full bg-[var(--apple-accent)] px-3 py-1.5 text-[12px] font-semibold text-white transition-opacity hover:opacity-90 lg:rounded-[6px]"
            >
              {t("settings.openInNewTab")}
              <ExternalLink size={12} aria-hidden="true" />
            </a>
          </div>
        </div>

        <SettingsRow
          leadingIcon={<LinkedInAppIcon />}
          title={t("contact.linkedin")}
          subtitle={t("settings.contactPane.linkedinSub")}
          value="in/alvienrnp"
          href={linkedin}
          target="_blank"
          rel="noreferrer"
          chevron
        />

        <SettingsRow
          leadingIcon={<GitHubAppIcon />}
          title={t("contact.github")}
          subtitle={t("settings.contactPane.githubSub")}
          value="github.com/alviennn"
          href={github}
          target="_blank"
          rel="noreferrer"
          chevron
        />
      </SettingsNavGroup>

      <SettingsNavGroup title={t("settings.contactPane.documentsTitle")}>
        <SettingsRow
          icon={FileText}
          gradient="from-[#FF453A] to-[#D70015]"
          title={t("contact.viewCV")}
          subtitle={t("settings.contactPane.cvSub")}
          value="PDF"
          href={cvHref}
          target="_blank"
          rel="noreferrer"
          chevron
        />
      </SettingsNavGroup>
    </div>
  );
}

/* ===================================================
   7. APPEARANCE PANE
   =================================================== */
export function AppearancePane({ accentId, onChangeAccent, onReplayHello }) {
  const { t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="space-y-5">
      <SettingsGroup
        title={t("settings.appearance.themeTitle")}
        footer={t("settings.appearance.themeDescription")}
      >
        <div className="grid grid-cols-2 gap-4 p-4">
          <button
            type="button"
            onClick={() => setTheme("light")}
            className="flex flex-col items-center gap-2 text-center"
          >
            <div
              className={`w-full overflow-hidden rounded-[10px] border-2 bg-[#F5F5F7] p-2 transition-all ${
                !isDark
                  ? "border-[var(--apple-accent)] ring-2 ring-[var(--apple-accent-soft)]"
                  : "border-black/10 opacity-75 hover:opacity-100 dark:border-white/10"
              }`}
            >
              <div className="flex h-16 overflow-hidden rounded-[6px] border border-black/10 bg-white">
                <div className="w-1/3 border-r border-black/5 bg-[#ECECEE] p-1.5">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF5F57]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FEBC2E]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#28C840]" />
                  </div>
                </div>
                <div className="flex-1 p-2">
                  <div className="h-2 w-10 rounded bg-black/15" />
                  <div className="mt-1.5 h-6 rounded bg-[#F2F2F7]" />
                </div>
              </div>
            </div>
            <span className="text-[12.5px] font-medium text-[#000000] dark:text-[#FFFFFF]">
              {t("settings.appearance.light")}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setTheme("dark")}
            className="flex flex-col items-center gap-2 text-center"
          >
            <div
              className={`w-full overflow-hidden rounded-[10px] border-2 bg-[#161618] p-2 transition-all ${
                isDark
                  ? "border-[var(--apple-accent)] ring-2 ring-[var(--apple-accent-soft)]"
                  : "border-black/10 opacity-75 hover:opacity-100 dark:border-white/10"
              }`}
            >
              <div className="flex h-16 overflow-hidden rounded-[6px] border border-white/10 bg-[#1E1E20]">
                <div className="w-1/3 border-r border-white/10 bg-[#262629] p-1.5">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF5F57]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FEBC2E]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#28C840]" />
                  </div>
                </div>
                <div className="flex-1 p-2">
                  <div className="h-2 w-10 rounded bg-white/25" />
                  <div className="mt-1.5 h-6 rounded bg-[#2C2C2E]" />
                </div>
              </div>
            </div>
            <span className="text-[12.5px] font-medium text-[#000000] dark:text-[#FFFFFF]">
              {t("settings.appearance.dark")}
            </span>
          </button>
        </div>

        <SettingsRow
          icon={isDark ? Moon : Sun}
          gradient={
            isDark
              ? "from-[#5E5CE6] to-[#3634A3]"
              : "from-[#FFD60A] to-[#FF9500]"
          }
          title={t("settings.appearance.darkModeSwitch")}
          trailing={
            <IOSSwitch
              checked={isDark}
              onChange={(checked) => setTheme(checked ? "dark" : "light")}
              ariaLabel={t("settings.appearance.darkModeSwitch")}
            />
          }
        />
      </SettingsGroup>

      <SettingsGroup
        title={t("settings.appearance.accentTitle")}
        footer={t("settings.appearance.accentDescription")}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
          <span className="text-[14.5px] text-[#000000] dark:text-[#FFFFFF] lg:text-[13.5px]">
            {t("settings.appearance.accentTitle")}
          </span>
          <div className="flex items-center gap-2.5">
            {ACCENT_COLORS.map((color) => {
              const selected = accentId === color.id;
              return (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => onChangeAccent(color.id)}
                  aria-label={color.label}
                  title={color.label}
                  style={{ backgroundColor: color.hex }}
                  className={`flex h-6 w-6 items-center justify-center rounded-full transition-transform hover:scale-110 ${
                    selected
                      ? "ring-2 ring-offset-2 ring-[#1D1D1F] dark:ring-white dark:ring-offset-[#1C1C1E]"
                      : ""
                  }`}
                >
                  {selected && (
                    <span className="h-2 w-2 rounded-full bg-white shadow" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </SettingsGroup>

      {onReplayHello && (
        <SettingsNavGroup
          title={t("settings.appearance.introTitle")}
          footer={t("settings.appearance.introDescription")}
        >
          <SettingsRow
            icon={Sparkles}
            gradient="from-[#38BDF8] to-[#007AFF]"
            title={t("settings.replayHello")}
            chevron
            onClick={onReplayHello}
          />
        </SettingsNavGroup>
      )}
    </div>
  );
}

/* ===================================================
   8. LANGUAGE & REGION PANE
   =================================================== */
export function LanguagePane() {
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    {
      code: "en",
      title: t("settings.languagePane.englishLabel"),
      subtitle: t("settings.languagePane.englishSub"),
    },
    {
      code: "id",
      title: t("settings.languagePane.indonesianLabel"),
      subtitle: t("settings.languagePane.indonesianSub"),
    },
  ];

  return (
    <div className="space-y-5">
      <SettingsGroup
        title={t("settings.languagePane.preferredTitle")}
        footer={t("settings.languagePane.preferredDescription")}
      >
        {languages.map((item) => {
          const active = language === item.code;
          return (
            <SettingsRow
              key={item.code}
              title={item.title}
              subtitle={item.subtitle}
              onClick={() => setLanguage(item.code)}
              trailing={
                active ? (
                  <Check
                    size={17}
                    className="text-[var(--apple-accent)]"
                    aria-hidden="true"
                  />
                ) : null
              }
            />
          );
        })}
      </SettingsGroup>

      <SettingsNavGroup title={t("settings.languagePane.regionTitle")}>
        <SettingsRow
          icon={MapPin}
          gradient="from-[#34C759] to-[#248A3D]"
          title={t("settings.languagePane.regionLabel")}
          value={t("settings.languagePane.regionValue")}
        />
        <SettingsRow
          icon={Monitor}
          gradient="from-[#5AC8FA] to-[#007AFF]"
          title={t("settings.languagePane.roleLabel")}
          value={t("hero.role")}
        />
      </SettingsNavGroup>
    </div>
  );
}
