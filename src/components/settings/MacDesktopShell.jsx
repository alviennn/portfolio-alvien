import { useRef, useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Maximize2,
  Minimize2,
  Moon,
  Search,
  Settings,
  Sun,
  Wifi,
  X,
} from "../icons/AppleIcons";

import { useLanguage } from "../../i18n/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import heroImage from "../../assets/konten-hero.jpg";
import cvPdf from "../../assets/cv-alvien-ridho.pdf";

import { PANE_MAP } from "./settingsConfig";
import { SettingSquircleIcon, SidebarNavItem, LiquidGlassSearchBar } from "./SettingsPrimitives";
import PaneRenderer from "./PaneRenderer";
import { useSettingsSearch } from "./useSettingsSearch";
import { useLiveClock } from "./useLiveClock";

function AppleMarkIcon() {
  return (
    <svg
      width="12"
      height="14.5"
      viewBox="0 0 170 200"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.1-1.9-14.25-6.08-3.69-3.04-7.64-7.85-11.86-14.42-8.36-13.14-14.82-27.14-19.38-42-4.56-14.86-6.84-29.07-6.84-42.63 0-16.12 4.09-29.18 12.27-39.18 8.18-10 18.25-15.11 30.21-15.33 4.78 0 10.02 1.25 15.74 3.75 5.71 2.5 9.77 3.75 12.17 3.75 2.06 0 6.17-1.29 12.33-3.88 6.16-2.59 11.45-3.8 15.87-3.62 13.52.76 24.16 5.86 31.92 15.3-11.98 7.34-17.84 17.65-17.58 30.93.22 10.43 4.12 18.99 11.7 25.68 7.58 6.69 16.59 10.15 27.03 10.38-2.61 7.69-5.91 15.52-9.9 23.49zm-35.05-107.5c0 7.82-2.81 15.15-8.43 21.98-5.62 6.83-12.65 10.87-21.09 12.13-.33-4.56.97-9.54 3.9-14.94 2.93-5.4 7.02-9.92 12.27-13.56 5.25-3.64 10.68-5.83 16.29-6.58.04.32.06.65.06.97z" />
    </svg>
  );
}

function ControlCenterIcon() {
  return (
    <svg width="14" height="13" viewBox="0 0 16 14" fill="none" aria-hidden="true">
      <rect x="0.75" y="0.75" width="14.5" height="5.2" rx="2.6" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="12.6" cy="3.35" r="1.75" fill="currentColor" />
      <rect x="0.75" y="8.05" width="14.5" height="5.2" rx="2.6" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="3.4" cy="10.65" r="1.75" fill="currentColor" />
    </svg>
  );
}

function MacSettingsGearDockIcon() {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-gradient-to-b from-[#E5E5EA] via-[#C7C7CC] to-[#8E8E93] shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_4px_10px_rgba(0,0,0,0.24)] dark:from-[#636366] dark:via-[#48484A] dark:to-[#2C2C2E]">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-b from-[#636366] to-[#3A3A3C] text-[#F2F2F7] shadow-inner">
        <Settings size={18} strokeWidth={2} aria-hidden="true" />
      </span>
    </span>
  );
}

// Live clock extracted to shared hook


export default function MacDesktopShell({
  activePane,
  canGoBack,
  canGoForward,
  onNavigate,
  onGoBack,
  onGoForward,
  projects,
  projectsLoading,
  projectsError,
  experiences,
  experiencesLoading,
  experiencesError,
  certifications,
  certificationsLoading,
  certificationsError,
  skills,
  skillsLoading,
  skillsError,
  contact,
  accentId,
  onChangeAccent,
  onSelectProjectModal,
  onSelectCertification,
  onReplayHello,
  onOpenAirDrop,
}) {
  const { t, language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const clockLabel = useLiveClock("mac");

  const [searchQuery, setSearchQuery] = useState("");
  const [windowState, setWindowState] = useState("normal"); // "normal" | "maximized" | "minimized" | "closed"
  const contentScrollRef = useRef(null);
  const searchInputRef = useRef(null);

  const { isSearching, matchingPanes, itemMatches } = useSettingsSearch({
    query: searchQuery,
    projects,
    experiences,
    skills,
    certifications,
  });

  useEffect(() => {
    if (contentScrollRef.current) {
      contentScrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activePane]);

  const cvHref =
    !contact?.cvLink || contact.cvLink === "/cv-alvien-ridho.pdf"
      ? cvPdf
      : contact.cvLink;

  const badgeCounts = {
    experience: experiences.length,
    certifications: certifications.length,
    projects: projects.length,
    skills: skills.length,
  };

  // Approved menu order:
  // Top Card: Apple Account (overview)
  // Group 1: experience -> certifications -> projects
  // Group 2: skills -> workProcess
  // Group 3: contact
  // Group 4: appearance -> language
  const sidebarGroups = [
    ["experience", "certifications", "projects"],
    ["skills", "workProcess"],
    ["contact"],
    ["appearance", "language"],
  ];

  const handleSelectPane = (paneId) => {
    setWindowState((prev) =>
      prev === "minimized" || prev === "closed" ? "normal" : prev
    );
    onNavigate(paneId);
  };

  const dockItems = [
    {
      id: "settings-home",
      label: t("settings.macAppTitle"),
      customIcon: <MacSettingsGearDockIcon />,
      active: windowState !== "closed" && windowState !== "minimized",
      onClick: () => {
        if (windowState === "closed" || windowState === "minimized") {
          setWindowState("normal");
        } else {
          onNavigate("overview");
        }
      },
    },
    {
      id: "dock-experience",
      label: t("settings.nav.experience"),
      icon: PANE_MAP.experience.icon,
      gradient: PANE_MAP.experience.gradient,
      active:
        windowState !== "closed" &&
        windowState !== "minimized" &&
        activePane === "experience",
      onClick: () => handleSelectPane("experience"),
    },
    {
      id: "dock-certifications",
      label: t("settings.nav.certifications"),
      icon: PANE_MAP.certifications.icon,
      gradient: PANE_MAP.certifications.gradient,
      active:
        windowState !== "closed" &&
        windowState !== "minimized" &&
        activePane === "certifications",
      onClick: () => handleSelectPane("certifications"),
    },
    {
      id: "dock-projects",
      label: t("settings.nav.projects"),
      icon: PANE_MAP.projects.icon,
      gradient: PANE_MAP.projects.gradient,
      active:
        windowState !== "closed" &&
        windowState !== "minimized" &&
        activePane === "projects",
      onClick: () => handleSelectPane("projects"),
    },
    {
      id: "dock-skills",
      label: t("settings.nav.skills"),
      icon: PANE_MAP.skills.icon,
      gradient: PANE_MAP.skills.gradient,
      active:
        windowState !== "closed" &&
        windowState !== "minimized" &&
        activePane === "skills",
      onClick: () => handleSelectPane("skills"),
    },
    {
      id: "dock-contact",
      label: t("settings.nav.contact"),
      icon: PANE_MAP.contact.icon,
      gradient: PANE_MAP.contact.gradient,
      active:
        windowState !== "closed" &&
        windowState !== "minimized" &&
        activePane === "contact",
      onClick: () => handleSelectPane("contact"),
    },
  ];

  const isWindowVisible = windowState === "normal" || windowState === "maximized";

  return (
    <div className="apple-os-font macos-wallpaper relative flex h-screen w-screen flex-col overflow-hidden select-none">
      {/* 1:1 macOS Sequoia Slim Menu Bar */}
      <header className="z-30 flex h-[26px] w-full shrink-0 items-center justify-between bg-white/60 px-4 text-[13px] text-[#000000] backdrop-blur-2xl dark:bg-[#1C1C1E]/65 dark:text-[#FFFFFF]">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => handleSelectPane("overview")}
            className="flex items-center opacity-95 hover:opacity-100"
            title="Alvien Ridho — Portfolio OS"
          >
            <AppleMarkIcon />
          </button>

          <span className="font-semibold tracking-[-0.01em]">
            {t("settings.macAppTitle")}
          </span>

          <nav className="flex items-center gap-3.5 text-[12.5px] font-normal text-black/80 dark:text-white/85">
            <button
              type="button"
              onClick={() => handleSelectPane("experience")}
              className="rounded px-1.5 py-0.5 hover:bg-black/[0.06] dark:hover:bg-white/[0.1]"
            >
              {t("settings.nav.experience")}
            </button>
            <button
              type="button"
              onClick={() => handleSelectPane("certifications")}
              className="rounded px-1.5 py-0.5 hover:bg-black/[0.06] dark:hover:bg-white/[0.1]"
            >
              {t("settings.nav.certifications")}
            </button>
            <button
              type="button"
              onClick={() => handleSelectPane("projects")}
              className="rounded px-1.5 py-0.5 hover:bg-black/[0.06] dark:hover:bg-white/[0.1]"
            >
              {t("settings.nav.projects")}
            </button>
            <button
              type="button"
              onClick={() => handleSelectPane("contact")}
              className="rounded px-1.5 py-0.5 hover:bg-black/[0.06] dark:hover:bg-white/[0.1]"
            >
              {t("settings.nav.contact")}
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-3.5 text-[12.5px]">
          <button
            type="button"
            onClick={() => {
              setWindowState((prev) =>
                prev === "minimized" || prev === "closed" ? "normal" : prev
              );
              window.setTimeout(() => searchInputRef.current?.focus(), 50);
            }}
            aria-label="Search settings"
            className="flex items-center opacity-85 hover:opacity-100"
          >
            <Search size={12.5} />
          </button>

          <Wifi size={13.5} className="opacity-85" aria-hidden="true" />

          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center opacity-85 hover:opacity-100"
            title={t("settings.appearance.darkModeSwitch")}
            aria-label="Toggle theme"
          >
            {isDark ? <Moon size={12.5} /> : <Sun size={12.5} />}
          </button>

          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 opacity-90 hover:opacity-100"
            title="Switch Language"
          >
            <ControlCenterIcon />
            <span className="text-[11.5px] font-medium">
              {language === "en" ? "EN" : "ID"}
            </span>
          </button>

          <span className="font-normal tabular-nums">{clockLabel}</span>
        </div>
      </header>

      {/* Desktop Workspace */}
      <div
        className={`relative flex flex-1 items-center justify-center overflow-hidden ${
          windowState === "maximized" ? "p-0" : "px-6 pt-3 pb-20"
        }`}
      >
        {!isWindowVisible ? (
          <div className="mac-window-in flex flex-col items-center gap-4 rounded-[14px] border border-white/35 bg-white/65 px-8 py-6 text-center shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-[#1C1C1E]/75">
            <MacSettingsGearDockIcon />
            <div>
              <p className="text-[14.5px] font-semibold text-[#000000] dark:text-[#FFFFFF]">
                {windowState === "minimized"
                  ? t("settings.windowMinimizedTitle")
                  : t("settings.windowClosedTitle")}
              </p>
              <p className="mt-0.5 text-[12px] text-[#6E6E73] dark:text-[#98989D]">
                Alvien Ridho Nanda Pryastika
              </p>
            </div>
            <button
              type="button"
              onClick={() => setWindowState("normal")}
              className="rounded-[6px] bg-[var(--apple-accent)] px-3.5 py-1.5 text-[12.5px] font-medium text-white shadow-sm transition-opacity hover:opacity-90"
            >
              {t("settings.reopenWindow")}
            </button>
          </div>
        ) : (
          <div
            className={`mac-window-in flex overflow-hidden ring-1 ring-black/15 shadow-[0_24px_70px_rgba(0,0,0,0.28)] transition-all duration-200 dark:ring-white/15 dark:shadow-[0_28px_85px_rgba(0,0,0,0.65)] ${
              windowState === "maximized"
                ? "h-full w-full rounded-none"
                : "h-[min(83vh,720px)] w-full max-w-[920px] rounded-[12px]"
            }`}
          >
            {/* 1:1 macOS System Settings Sidebar (236px) */}
            <aside className="relative flex w-[236px] shrink-0 flex-col border-r border-black/[0.08] bg-[#ECECED]/88 backdrop-blur-2xl dark:border-black/45 dark:bg-[#28282A]/90">
              {/* Traffic Lights */}
              <div className="flex h-[48px] shrink-0 items-center px-[18px]">
                <div className="group flex items-center gap-[8px]">
                  <button
                    type="button"
                    onClick={() => setWindowState("closed")}
                    aria-label="Close window"
                    className="flex h-[12px] w-[12px] items-center justify-center rounded-full bg-[#FF5F57] text-[#4D0000] ring-1 ring-inset ring-black/15"
                  >
                    <X
                      size={7.5}
                      strokeWidth={3}
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => setWindowState("minimized")}
                    aria-label="Minimize window"
                    className="flex h-[12px] w-[12px] items-center justify-center rounded-full bg-[#FEBC2E] text-[#664400] ring-1 ring-inset ring-black/15"
                  >
                    <span className="h-[1.5px] w-[6px] rounded-full bg-current opacity-0 transition-opacity group-hover:opacity-100" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setWindowState((prev) =>
                        prev === "maximized" ? "normal" : "maximized"
                      )
                    }
                    aria-label="Toggle fullscreen window"
                    className="flex h-[12px] w-[12px] items-center justify-center rounded-full bg-[#28C840] text-[#004D00] ring-1 ring-inset ring-black/15"
                  >
                    {windowState === "maximized" ? (
                      <Minimize2
                        size={6.5}
                        strokeWidth={3}
                        className="opacity-0 transition-opacity group-hover:opacity-100"
                      />
                    ) : (
                      <Maximize2
                        size={6.5}
                        strokeWidth={3}
                        className="opacity-0 transition-opacity group-hover:opacity-100"
                      />
                    )}
                  </button>
                </div>
              </div>

              {/* Sidebar Navigation */}
              <div className="apple-scroll flex-1 space-y-3 overflow-y-auto px-2.5 pb-16 select-text">
                {isSearching ? (
                  <div className="space-y-2.5">
                    {matchingPanes.length > 0 && (
                      <div className="space-y-0.5">
                        {matchingPanes.map((pane) => (
                          <SidebarNavItem
                            key={pane.id}
                            icon={pane.icon}
                            gradient={pane.gradient}
                            filled={pane.filled}
                            label={t(`settings.nav.${pane.id}`)}
                            active={activePane === pane.id}
                            badge={badgeCounts[pane.id]}
                            onClick={() => onNavigate(pane.id)}
                          />
                        ))}
                      </div>
                    )}

                    {itemMatches.length > 0 && (
                      <div className="space-y-1 border-t border-black/[0.06] pt-2 dark:border-white/[0.08]">
                        <p className="px-2 text-[10.5px] font-semibold uppercase tracking-wider text-[#8E8E93]">
                          {t("settings.searchResultsLabel")}
                        </p>
                        {itemMatches.map((match) => (
                          <button
                            key={match.key}
                            type="button"
                            onClick={() => onNavigate(match.paneId)}
                            className="flex w-full items-center gap-2 rounded-[6px] px-2 py-1 text-left hover:bg-black/[0.045] dark:hover:bg-white/[0.06]"
                          >
                            <SettingSquircleIcon
                              icon={match.pane.icon}
                              gradient={match.pane.gradient}
                              filled={match.pane.filled}
                              size="xs"
                            />
                            <div className="min-w-0">
                              <div className="truncate text-[12.5px] font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">
                                {match.title}
                              </div>
                              <div className="truncate text-[10.5px] text-[#8E8E93]">
                                {match.subtitle}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {matchingPanes.length === 0 && itemMatches.length === 0 && (
                      <p className="px-2 py-4 text-center text-[12px] text-[#8E8E93]">
                        {t("settings.noSearchResults")}
                      </p>
                    )}
                  </div>
                ) : (
                  <>
                    {/* Top Apple Account Row */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => onNavigate("overview")}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onNavigate("overview");
                        }
                      }}
                      className={`flex w-full cursor-pointer items-center gap-2.5 rounded-[7px] px-2 py-1.5 text-left transition-colors ${
                        activePane === "overview"
                          ? "bg-[var(--apple-accent)] text-white"
                          : "hover:bg-black/[0.045] dark:hover:bg-white/[0.06]"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenAirDrop();
                        }}
                        title={t("settings.airdrop.tapHint")}
                        className="shrink-0 rounded-full transition-transform hover:scale-105 active:scale-95"
                      >
                        <img
                          src={heroImage}
                          alt="Alvien Ridho"
                          className="h-[36px] w-[36px] rounded-full border border-black/10 object-cover object-[center_18%] dark:border-white/15"
                        />
                      </button>
                      <div className="min-w-0">
                        <div
                          className={`truncate text-[13px] font-semibold leading-tight ${
                            activePane === "overview"
                              ? "text-white"
                              : "text-[#000000] dark:text-[#FFFFFF]"
                          }`}
                        >
                          Alvien Ridho
                        </div>
                        <div
                          className={`truncate text-[11px] ${
                            activePane === "overview"
                              ? "text-white/85"
                              : "text-[#6E6E73] dark:text-[#98989D]"
                          }`}
                        >
                          {t("settings.nav.overview")}
                        </div>
                      </div>
                    </div>

                    {/* Grouped Menu List (12px macOS group spacing) */}
                    {sidebarGroups.map((groupIds) => (
                      <div key={groupIds.join("-")} className="space-y-[2px]">
                        {groupIds.map((id) => {
                          const pane = PANE_MAP[id];
                          if (!pane) return null;
                          return (
                            <SidebarNavItem
                              key={pane.id}
                              icon={pane.icon}
                              gradient={pane.gradient}
                              filled={pane.filled}
                              label={t(`settings.nav.${pane.id}`)}
                              active={activePane === pane.id}
                              badge={badgeCounts[pane.id]}
                              onClick={() => onNavigate(pane.id)}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </>
                )}
              </div>

              {/* Floating Liquid Glass Bottom Search Capsule */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#ECECED]/40 via-transparent to-transparent px-2.5 pt-4 pb-2.5 dark:from-[#28282A]/45">
                <div className="pointer-events-auto">
                  <LiquidGlassSearchBar
                    compact
                    inputRef={searchInputRef}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onClear={() => setSearchQuery("")}
                    placeholder={t("settings.searchPlaceholder")}
                  />
                </div>
              </div>
            </aside>

            {/* Right Content Pane */}
            <main className="flex flex-1 flex-col bg-[#F6F6F6] dark:bg-[#1E1E1E] select-text">
              {/* macOS Toolbar */}
              <div className="flex h-[52px] shrink-0 items-center justify-between border-b border-black/[0.06] bg-[#F6F6F6]/85 px-4 backdrop-blur-xl dark:border-white/[0.07] dark:bg-[#1E1E1E]/85">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    <button
                      type="button"
                      onClick={onGoBack}
                      disabled={!canGoBack}
                      aria-label="Back"
                      className="flex h-7 w-7 items-center justify-center rounded-[5px] text-[#1D1D1F] transition-colors hover:bg-black/[0.06] disabled:opacity-25 disabled:hover:bg-transparent dark:text-[#F5F5F7] dark:hover:bg-white/[0.08]"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={onGoForward}
                      disabled={!canGoForward}
                      aria-label="Forward"
                      className="flex h-7 w-7 items-center justify-center rounded-[5px] text-[#1D1D1F] transition-colors hover:bg-black/[0.06] disabled:opacity-25 disabled:hover:bg-transparent dark:text-[#F5F5F7] dark:hover:bg-white/[0.08]"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  <h1 className="text-[15px] font-semibold tracking-[-0.01em] text-[#000000] dark:text-[#FFFFFF]">
                    {t(`settings.nav.${activePane}`)}
                  </h1>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleLanguage}
                    className="rounded-[5px] border border-black/[0.1] bg-white px-2 py-1 text-[11.5px] font-medium text-[#1D1D1F] shadow-[0_0.5px_1px_rgba(0,0,0,0.06)] hover:bg-black/[0.02] dark:border-white/[0.12] dark:bg-[#3A3A3C] dark:text-[#F5F5F7]"
                  >
                    {language === "en" ? "EN" : "ID"}
                  </button>

                  <a
                    href={cvHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-[5px] bg-[var(--apple-accent)] px-2.5 py-1 text-[12px] font-medium text-white shadow-[0_0.5px_1px_rgba(0,0,0,0.12)] transition-opacity hover:opacity-90"
                  >
                    <FileText size={12} aria-hidden="true" />
                    <span>{t("contact.viewCV")}</span>
                  </a>
                </div>
              </div>

              {/* Scrollable Pane Content */}
              <div
                ref={contentScrollRef}
                className="apple-scroll flex-1 overflow-y-auto px-6 py-5"
              >
                <div className="mx-auto max-w-[640px] pb-6">
                  <PaneRenderer
                    activePane={activePane}
                    projects={projects}
                    projectsLoading={projectsLoading}
                    projectsError={projectsError}
                    experiences={experiences}
                    experiencesLoading={experiencesLoading}
                    experiencesError={experiencesError}
                    certifications={certifications}
                    certificationsLoading={certificationsLoading}
                    certificationsError={certificationsError}
                    skills={skills}
                    skillsLoading={skillsLoading}
                    skillsError={skillsError}
                    contact={contact}
                    accentId={accentId}
                    onChangeAccent={onChangeAccent}
                    onNavigate={handleSelectPane}
                    onSelectProjectModal={onSelectProjectModal}
                    onSelectCertification={onSelectCertification}
                    onReplayHello={onReplayHello}
                    onOpenAirDrop={onOpenAirDrop}
                  />
                </div>
              </div>
            </main>
          </div>
        )}
      </div>

      {/* 1:1 macOS Dock */}
      {windowState !== "maximized" && (
        <div className="pointer-events-none fixed inset-x-0 bottom-2.5 z-30 flex justify-center">
          <div className="pointer-events-auto flex items-center gap-2 rounded-[18px] border border-white/40 bg-white/40 px-2.5 py-1.5 shadow-[0_14px_38px_rgba(0,0,0,0.22)] backdrop-blur-2xl dark:border-white/15 dark:bg-[#1C1C1E]/50">
            {dockItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.onClick}
                  title={item.label}
                  className="group relative flex flex-col items-center transition-transform duration-150 hover:-translate-y-1.5 hover:scale-110"
                >
                  <span className="pointer-events-none absolute -top-8 whitespace-nowrap rounded-md bg-black/75 px-2 py-0.5 text-[11px] font-medium text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
                    {item.label}
                  </span>
                  {item.customIcon ? (
                    item.customIcon
                  ) : (
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-[10px] bg-gradient-to-b ${item.gradient} text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.32),0_4px_10px_rgba(0,0,0,0.2)]`}
                    >
                      <Icon size={20} aria-hidden="true" />
                    </span>
                  )}
                  <span
                    className={`mt-1 h-[3.5px] w-[3.5px] rounded-full bg-[#1D1D1F] transition-opacity dark:bg-white ${
                      item.active ? "opacity-85" : "opacity-0"
                    }`}
                  />
                </button>
              );
            })}

            <div className="mx-0.5 h-8 w-[0.5px] bg-black/20 dark:bg-white/20" />

            <a
              href={cvHref}
              target="_blank"
              rel="noreferrer"
              title={t("contact.viewCV")}
              className="group relative flex flex-col items-center transition-transform duration-150 hover:-translate-y-1.5 hover:scale-110"
            >
              <span className="pointer-events-none absolute -top-8 whitespace-nowrap rounded-md bg-black/75 px-2 py-0.5 text-[11px] font-medium text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
                {t("contact.viewCV")}
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-gradient-to-b from-[#64D2FF] to-[#0A84FF] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.32),0_4px_10px_rgba(0,0,0,0.2)]">
                <FileText size={20} strokeWidth={2} aria-hidden="true" />
              </span>
              <span className="mt-1 h-[3.5px] w-[3.5px] rounded-full opacity-0" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
