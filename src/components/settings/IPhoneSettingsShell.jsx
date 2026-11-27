import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  Moon,
  Wifi,
} from "../icons/AppleIcons";

import { useLanguage } from "../../i18n/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import heroImage from "../../assets/konten-hero.jpg";
import cvPdf from "../../assets/cv-alvien-ridho.pdf";

import { PANE_MAP } from "./settingsConfig";
import {
  AppleBatteryIcon,
  AppleSignalIcon,
  IOSSwitch,
  LiquidGlassSearchBar,
  SettingsNavGroup,
  SettingsRow,
} from "./SettingsPrimitives";
import PaneRenderer from "./PaneRenderer";
import { useSettingsSearch } from "./useSettingsSearch";
import { useLiveClock } from "./useLiveClock";

export default function IPhoneSettingsShell({
  mobilePane,
  onSelectMobilePane,
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
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const statusTime = useLiveClock("ios");

  const [searchQuery, setSearchQuery] = useState("");
  const { isSearching, matchingPanes, itemMatches } = useSettingsSearch({
    query: searchQuery,
    projects,
    experiences,
    skills,
    certifications,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [mobilePane]);

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

  const renderStatusBar = () => (
    <div className="sticky top-0 z-30 flex h-[48px] items-center justify-between bg-[#F2F2F7]/90 px-5 text-[15px] font-semibold tracking-[-0.02em] backdrop-blur-xl dark:bg-[#000000]/90">
      <span className="w-14 tabular-nums">{statusTime}</span>

      {/* Authentic Dynamic Island */}
      <div
        className="h-[27px] w-[98px] rounded-full bg-[#000000] dark:border dark:border-white/[0.12]"
        aria-hidden="true"
      />

      <div className="flex w-16 items-center justify-end gap-1.5">
        <AppleSignalIcon />
        <Wifi size={14} strokeWidth={2.3} aria-hidden="true" />
        <AppleBatteryIcon level={100} />
      </div>
    </div>
  );

  if (mobilePane) {
    return (
      <div className="apple-os-font min-h-screen bg-[#F2F2F7] text-[#000000] dark:bg-[#000000] dark:text-[#FFFFFF]">
        {renderStatusBar()}

        {/* 1:1 iOS Detail Navigation Header */}
        <header className="sticky top-[48px] z-20 flex h-[44px] items-center justify-between border-b border-black/[0.08] bg-[#F2F2F7]/85 px-2 backdrop-blur-xl dark:border-[#38383A] dark:bg-[#000000]/85">
          <button
            type="button"
            onClick={() => onSelectMobilePane(null)}
            className="flex items-center gap-0.5 py-1 pr-2 text-[17px] font-normal text-[var(--apple-accent)] active:opacity-50"
          >
            <ChevronLeft size={24} strokeWidth={2.2} className="-ml-1" />
            <span>{t("settings.back")}</span>
          </button>

          <h1 className="max-w-[48%] truncate text-[17px] font-semibold tracking-[-0.01em]">
            {t(`settings.nav.${mobilePane}`)}
          </h1>

          <button
            type="button"
            onClick={toggleLanguage}
            className="px-2.5 py-1 text-[13px] font-medium text-[var(--apple-accent)]"
          >
            {language === "en" ? "EN" : "ID"}
          </button>
        </header>

        <main className="ios-slide-in px-4 pt-4 pb-12">
          <PaneRenderer
            activePane={mobilePane}
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
            onNavigate={(paneId) => onSelectMobilePane(paneId)}
            onSelectProjectModal={onSelectProjectModal}
            onSelectCertification={onSelectCertification}
            onReplayHello={onReplayHello}
            onOpenAirDrop={onOpenAirDrop}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="apple-os-font min-h-screen bg-[#F2F2F7] text-[#000000] dark:bg-[#000000] dark:text-[#FFFFFF]">
      {renderStatusBar()}

      <main className="px-4 pt-1 pb-28">
        {/* Large iOS Title */}
        <h1 className="text-[34px] font-bold leading-tight tracking-[-0.02em]">
          {t("settings.appTitle")}
        </h1>

        {isSearching ? (
          <div className="mt-5 space-y-5">
            {matchingPanes.length > 0 && (
              <SettingsNavGroup title={t("settings.appTitle")}>
                {matchingPanes.map((pane) => (
                  <SettingsRow
                    key={pane.id}
                    icon={pane.icon}
                    gradient={pane.gradient}
                    filled={pane.filled}
                    title={t(`settings.nav.${pane.id}`)}
                    subtitle={t(`settings.subtitles.${pane.id}`)}
                    badge={badgeCounts[pane.id]}
                    chevron
                    onClick={() => onSelectMobilePane(pane.id)}
                  />
                ))}
              </SettingsNavGroup>
            )}

            {itemMatches.length > 0 && (
              <SettingsNavGroup title={t("settings.searchResultsLabel")}>
                {itemMatches.map((match) => (
                  <SettingsRow
                    key={match.key}
                    icon={match.pane.icon}
                    gradient={match.pane.gradient}
                    filled={match.pane.filled}
                    title={match.title}
                    subtitle={match.subtitle}
                    chevron
                    onClick={() => onSelectMobilePane(match.paneId)}
                  />
                ))}
              </SettingsNavGroup>
            )}

            {matchingPanes.length === 0 && itemMatches.length === 0 && (
              <div className="rounded-[12px] bg-white p-6 text-center text-[14px] text-[#8E8E93] dark:bg-[#1C1C1E]">
                {t("settings.noSearchResults")}
              </div>
            )}
          </div>
        ) : (
          <div className="mt-4 space-y-5">
            {/* 1:1 Apple Account Top Card (Introduction) */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => onSelectMobilePane("overview")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectMobilePane("overview");
                }
              }}
              className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-[12px] bg-white px-4 py-3 text-left active:bg-[#D1D1D6]/60 dark:bg-[#1C1C1E] dark:active:bg-[#2C2C2E]"
            >
              <div className="flex min-w-0 items-center gap-3.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenAirDrop();
                  }}
                  title={t("settings.airdrop.tapHint")}
                  className="shrink-0 rounded-full transition-transform active:scale-95"
                >
                  <img
                    src={heroImage}
                    alt="Alvien Ridho Nanda Pryastika"
                    className="h-[60px] w-[60px] rounded-full border border-black/10 object-cover object-[center_18%] dark:border-white/15"
                  />
                </button>
                <div className="min-w-0">
                  <div className="truncate text-[19px] font-normal tracking-[-0.01em] text-[#000000] dark:text-[#FFFFFF]">
                    Alvien Ridho Nanda P.
                  </div>
                  <div className="mt-0.5 truncate text-[12.5px] text-[#8E8E93]">
                    {t("settings.appleAccountSubtitle")}
                  </div>
                </div>
              </div>
              <ChevronRight
                size={18}
                strokeWidth={2.2}
                className="shrink-0 text-[#C7C7CC] dark:text-[#48484A]"
                aria-hidden="true"
              />
            </div>

            {/* Quick System Controls (iOS Top Group Style) */}
            <SettingsNavGroup>
              <SettingsRow
                icon={Moon}
                gradient="from-[#5E5CE6] to-[#3634A3]"
                title={t("settings.appearance.darkModeSwitch")}
                trailing={
                  <IOSSwitch
                    checked={isDark}
                    onChange={(checked) => setTheme(checked ? "dark" : "light")}
                    ariaLabel={t("settings.appearance.darkModeSwitch")}
                  />
                }
              />
              <SettingsRow
                icon={PANE_MAP.language.icon}
                gradient={PANE_MAP.language.gradient}
                filled={PANE_MAP.language.filled}
                title={t("settings.nav.language")}
                value={language === "en" ? "English" : "Indonesia"}
                chevron
                onClick={() => onSelectMobilePane("language")}
              />
            </SettingsNavGroup>

            {/* Group 1: Approved Portfolio Order (Experience -> Certifications -> Projects) */}
            <SettingsNavGroup>
              {["experience", "certifications", "projects"].map((id) => {
                const pane = PANE_MAP[id];
                return (
                  <SettingsRow
                    key={pane.id}
                    icon={pane.icon}
                    gradient={pane.gradient}
                    filled={pane.filled}
                    title={t(`settings.nav.${pane.id}`)}
                    badge={badgeCounts[pane.id]}
                    chevron
                    onClick={() => onSelectMobilePane(pane.id)}
                  />
                );
              })}
            </SettingsNavGroup>

            {/* Group 2: Skills & Work Process */}
            <SettingsNavGroup>
              {["skills", "workProcess"].map((id) => {
                const pane = PANE_MAP[id];
                return (
                  <SettingsRow
                    key={pane.id}
                    icon={pane.icon}
                    gradient={pane.gradient}
                    filled={pane.filled}
                    title={t(`settings.nav.${pane.id}`)}
                    badge={badgeCounts[pane.id]}
                    chevron
                    onClick={() => onSelectMobilePane(pane.id)}
                  />
                );
              })}
            </SettingsNavGroup>

            {/* Group 3: Contact, Appearance & CV */}
            <SettingsNavGroup>
              <SettingsRow
                icon={PANE_MAP.contact.icon}
                gradient={PANE_MAP.contact.gradient}
                filled={PANE_MAP.contact.filled}
                title={t("settings.nav.contact")}
                chevron
                onClick={() => onSelectMobilePane("contact")}
              />
              <SettingsRow
                icon={PANE_MAP.appearance.icon}
                gradient={PANE_MAP.appearance.gradient}
                filled={PANE_MAP.appearance.filled}
                title={t("settings.nav.appearance")}
                chevron
                onClick={() => onSelectMobilePane("appearance")}
              />
              <SettingsRow
                icon={FileText}
                gradient="from-[#64D2FF] to-[#0A84FF]"
                title={t("contact.viewCV")}
                value="PDF"
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
            </SettingsNavGroup>
          </div>
        )}
      </main>

      {/* Floating Liquid Glass Bottom Search Capsule (iOS 26) */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 bg-gradient-to-t from-[#F2F2F7] via-[#F2F2F7]/85 to-transparent px-4 pt-7 pb-5 dark:from-[#000000] dark:via-[#000000]/85">
        <div className="pointer-events-auto mx-auto max-w-md">
          <LiquidGlassSearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery("")}
            placeholder={t("settings.searchPlaceholder")}
          />
        </div>
      </div>
    </div>
  );
}
