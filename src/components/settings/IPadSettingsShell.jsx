import { useEffect, useRef, useState } from "react";
import { Moon, Sun, Wifi } from "../icons/AppleIcons";

import { useLanguage } from "../../i18n/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import heroImage from "../../assets/konten-hero.jpg";

import { PANE_MAP } from "./settingsConfig";
import {
  AppleBatteryIcon,
  LiquidGlassSearchBar,
  SettingSquircleIcon,
  SidebarNavItem,
} from "./SettingsPrimitives";
import PaneRenderer from "./PaneRenderer";
import { useSettingsSearch } from "./useSettingsSearch";
import { useLiveClock, useLiveDate } from "./useLiveClock";

export default function IPadSettingsShell({
  activePane,
  onNavigate,
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
  const statusTime = useLiveClock("ios");
  const statusDate = useLiveDate();

  const [searchQuery, setSearchQuery] = useState("");
  const detailScrollRef = useRef(null);

  const { isSearching, matchingPanes, itemMatches } = useSettingsSearch({
    query: searchQuery,
    projects,
    experiences,
    skills,
    certifications,
  });

  useEffect(() => {
    if (detailScrollRef.current) {
      detailScrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activePane]);

  const badgeCounts = {
    experience: experiences.length,
    certifications: certifications.length,
    projects: projects.length,
    skills: skills.length,
  };

  // Approved menu order:
  // Top Card: overview (Apple Account / Introduction)
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

  return (
    <div className="apple-os-font flex h-screen w-screen flex-col overflow-hidden bg-[#F2F2F7] text-[#000000] dark:bg-[#000000] dark:text-[#FFFFFF]">
      {/* 1:1 iPadOS Status Bar */}
      <div className="flex h-6 shrink-0 items-center justify-between bg-[#F2F2F7] px-5 text-[12px] font-semibold dark:bg-[#000000]">
        <div className="flex items-center gap-2.5">
          <span className="tabular-nums">{statusTime}</span>
          <span className="font-normal text-[#6E6E73] dark:text-[#8E8E93]">
            {statusDate}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <Wifi size={13} aria-hidden="true" />
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold">100%</span>
            <AppleBatteryIcon level={100} />
          </div>
        </div>
      </div>

      {/* Split View Container */}
      <div className="flex min-h-0 flex-1">
        {/* Master Sidebar (300px) */}
        <aside className="relative flex w-[300px] shrink-0 flex-col border-r border-black/[0.08] bg-[#F2F2F7] dark:border-[#38383A] dark:bg-[#000000]">
          <div className="px-4 pt-3 pb-2.5">
            <h1 className="text-[30px] font-bold tracking-[-0.02em]">
              {t("settings.appTitle")}
            </h1>
          </div>

          <div className="apple-scroll flex-1 space-y-4 overflow-y-auto px-4 pb-20">
            {isSearching ? (
              <div className="space-y-4">
                {matchingPanes.length > 0 && (
                  <div className="overflow-hidden rounded-[12px] bg-white p-1.5 dark:bg-[#1C1C1E]">
                    {matchingPanes.map((pane) => (
                      <SidebarNavItem
                        key={pane.id}
                        variant="ipad"
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
                  <div className="overflow-hidden rounded-[12px] bg-white p-1.5 dark:bg-[#1C1C1E]">
                    <p className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#8E8E93]">
                      {t("settings.searchResultsLabel")}
                    </p>
                    {itemMatches.map((match) => (
                      <button
                        key={match.key}
                        type="button"
                        onClick={() => onNavigate(match.paneId)}
                        className="flex w-full items-center gap-2.5 rounded-[8px] px-2.5 py-2 text-left hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                      >
                        <SettingSquircleIcon
                          icon={match.pane.icon}
                          gradient={match.pane.gradient}
                          filled={match.pane.filled}
                          size="sm"
                        />
                        <div className="min-w-0">
                          <div className="truncate text-[14px] font-medium">
                            {match.title}
                          </div>
                          <div className="truncate text-[11.5px] text-[#8E8E93]">
                            {match.subtitle}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {matchingPanes.length === 0 && itemMatches.length === 0 && (
                  <p className="py-6 text-center text-[13px] text-[#8E8E93]">
                    {t("settings.noSearchResults")}
                  </p>
                )}
              </div>
            ) : (
              <>
                {/* Apple Account Card */}
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
                  className={`flex w-full cursor-pointer items-center gap-3 rounded-[12px] p-3 text-left transition-colors ${
                    activePane === "overview"
                      ? "bg-[var(--apple-accent)] text-white"
                      : "bg-white hover:bg-black/[0.02] dark:bg-[#1C1C1E] dark:hover:bg-[#2C2C2E]"
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
                      className="h-[52px] w-[52px] rounded-full border border-black/10 object-cover object-[center_18%] dark:border-white/15"
                    />
                  </button>
                  <div className="min-w-0">
                    <div className="truncate text-[16px] font-semibold leading-tight">
                      Alvien Ridho
                    </div>
                    <div
                      className={`mt-0.5 truncate text-[12px] ${
                        activePane === "overview"
                          ? "text-white/85"
                          : "text-[#8E8E93]"
                      }`}
                    >
                      {t("settings.nav.overview")}
                    </div>
                  </div>
                </div>

                {/* Grouped Inset Lists with Indented Dividers */}
                {sidebarGroups.map((groupIds) => (
                  <div
                    key={groupIds.join("-")}
                    className="overflow-hidden rounded-[12px] bg-white p-1.5 dark:bg-[#1C1C1E]"
                  >
                    {groupIds.map((id, idx) => {
                      const pane = PANE_MAP[id];
                      if (!pane) return null;
                      const isActive = activePane === pane.id;
                      const prevActive =
                        idx > 0 && activePane === groupIds[idx - 1];
                      return (
                        <div key={pane.id}>
                          {idx > 0 && !isActive && !prevActive && (
                            <div className="ml-[50px] h-[0.5px] bg-[#C6C6C8]/70 dark:bg-[#38383A]" />
                          )}
                          <SidebarNavItem
                            variant="ipad"
                            icon={pane.icon}
                            gradient={pane.gradient}
                            filled={pane.filled}
                            label={t(`settings.nav.${pane.id}`)}
                            active={isActive}
                            badge={badgeCounts[pane.id]}
                            onClick={() => onNavigate(pane.id)}
                          />
                        </div>
                      );
                    })}
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Floating Liquid Glass Bottom Search Capsule (iPadOS 26) */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#F2F2F7]/40 via-transparent to-transparent px-4 pt-5 pb-3.5 dark:from-[#000000]/45">
            <div className="pointer-events-auto">
              <LiquidGlassSearchBar
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClear={() => setSearchQuery("")}
                placeholder={t("settings.searchPlaceholder")}
              />
            </div>
          </div>
        </aside>

        {/* Right Detail Column */}
        <main className="flex min-w-0 flex-1 flex-col bg-[#F2F2F7] dark:bg-[#000000]">
          <header className="relative flex h-[50px] shrink-0 items-center justify-end border-b border-black/[0.06] bg-[#F2F2F7]/85 px-5 backdrop-blur-xl dark:border-[#38383A] dark:bg-black/85">
            <h2 className="pointer-events-none absolute inset-x-0 text-center text-[17px] font-semibold">
              {t(`settings.nav.${activePane}`)}
            </h2>

            <div className="relative z-10 flex items-center gap-2">
              <button
                type="button"
                onClick={toggleLanguage}
                className="rounded-full bg-white px-3 py-1 text-[12px] font-semibold text-[#1D1D1F] shadow-2xs dark:bg-[#1C1C1E] dark:text-[#F5F5F7]"
              >
                {language === "en" ? "EN" : "ID"}
              </button>
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#1D1D1F] shadow-2xs dark:bg-[#1C1C1E] dark:text-[#F5F5F7]"
              >
                {isDark ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            </div>
          </header>

          <div
            ref={detailScrollRef}
            className="apple-scroll flex-1 overflow-y-auto px-6 py-6"
          >
            <div className="mx-auto max-w-[640px] pb-8">
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
                onNavigate={onNavigate}
                onSelectProjectModal={onSelectProjectModal}
                onSelectCertification={onSelectCertification}
                onReplayHello={onReplayHello}
                onOpenAirDrop={onOpenAirDrop}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
