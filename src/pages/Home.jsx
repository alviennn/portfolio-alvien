import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { useFirestoreCollection } from "../hooks/useFirestoreCollection";
import {
  certificationsService,
  contactService,
  experiencesService,
  projectsService,
  skillsService,
} from "../services/firestoreService";
import {
  seedCertifications,
  seedExperiences,
  seedProjects,
  seedSkills,
} from "../data/seedData";

import HelloScreen from "../components/ui/HelloScreen";
import CertificationModal from "../components/ui/CertificationModal";
import ProjectDetailModal from "../components/ui/ProjectDetailModal";
import AirDropOverlay from "../components/settings/AirDropOverlay";

import { ACCENT_COLORS } from "../components/settings/settingsConfig";
import MacDesktopShell from "../components/settings/MacDesktopShell";
import IPadSettingsShell from "../components/settings/IPadSettingsShell";
import IPhoneSettingsShell from "../components/settings/IPhoneSettingsShell";

const ACCENT_STORAGE_KEY = "alvien-portfolio-accent";

const defaultContact = {
  email: "alvien.rnp@gmail.com",
  linkedin: "https://www.linkedin.com/in/alvienrnp/",
  github: "https://github.com/alviennn",
  cvLink: "/cv-alvien-ridho.pdf",
};

function getDeviceMode() {
  if (typeof window === "undefined") return "mac";
  if (window.matchMedia("(min-width: 1024px)").matches) return "mac";
  if (window.matchMedia("(min-width: 768px)").matches) return "ipad";
  return "iphone";
}

function useDeviceMode() {
  const [deviceMode, setDeviceMode] = useState(getDeviceMode);

  useEffect(() => {
    const macQuery = window.matchMedia("(min-width: 1024px)");
    const ipadQuery = window.matchMedia("(min-width: 768px)");

    const update = () => setDeviceMode(getDeviceMode());

    macQuery.addEventListener("change", update);
    ipadQuery.addEventListener("change", update);
    return () => {
      macQuery.removeEventListener("change", update);
      ipadQuery.removeEventListener("change", update);
    };
  }, []);

  return deviceMode;
}

export default function Home() {
  const { t, tField } = useLanguage();
  const deviceMode = useDeviceMode();

  const [showIntro, setShowIntro] = useState(true);

  // History stack for macOS Back / Forward toolbar buttons
  const [history, setHistory] = useState(["overview"]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const activePane = history[historyIndex] || "overview";

  // Mobile drill-down state: null = root Settings list
  const [mobilePane, setMobilePane] = useState(null);

  const [accentId, setAccentId] = useState(() => {
    if (typeof window === "undefined") return "blue";
    return localStorage.getItem(ACCENT_STORAGE_KEY) || "blue";
  });

  const [contact, setContact] = useState(defaultContact);
  const [selectedProjectModal, setSelectedProjectModal] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);
  const [showAirDrop, setShowAirDrop] = useState(false);

  // Sync CSS accent variables
  useEffect(() => {
    const color =
      ACCENT_COLORS.find((item) => item.id === accentId) || ACCENT_COLORS[0];
    document.documentElement.style.setProperty("--apple-accent", color.hex);
    document.documentElement.style.setProperty("--apple-accent-soft", color.soft);
    localStorage.setItem(ACCENT_STORAGE_KEY, color.id);
  }, [accentId]);

  // Firestore Collections + Seed Fallbacks
  const {
    data: projectData,
    loading: projectLoading,
    error: projectError,
  } = useFirestoreCollection(projectsService);

  const {
    data: experienceData,
    loading: experienceLoading,
    error: experienceError,
  } = useFirestoreCollection(experiencesService);

  const {
    data: certificationData,
    loading: certificationLoading,
    error: certificationError,
  } = useFirestoreCollection(certificationsService);

  const {
    data: skillData,
    loading: skillLoading,
    error: skillError,
  } = useFirestoreCollection(skillsService);

  useEffect(() => {
    async function loadContact() {
      try {
        const data = await contactService.get();
        if (data) {
          setContact({ ...defaultContact, ...data });
        }
      } catch (err) {
        console.error("Failed to load contact:", err);
      }
    }
    loadContact();
  }, []);

  const projects =
    !projectLoading && !projectError && projectData.length > 0
      ? projectData
      : seedProjects;

  const experiences =
    !experienceLoading && !experienceError && experienceData.length > 0
      ? experienceData
      : seedExperiences;

  const certifications =
    !certificationLoading && !certificationError && certificationData.length > 0
      ? certificationData
      : seedCertifications;

  const skills =
    !skillLoading && !skillError && skillData.length > 0
      ? skillData
      : seedSkills;

  const handleNavigate = (paneId) => {
    if (paneId === activePane) return;
    const nextHistory = history.slice(0, historyIndex + 1);
    nextHistory.push(paneId);
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
  };

  const handleGoBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex((idx) => idx - 1);
    }
  };

  const handleGoForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((idx) => idx + 1);
    }
  };

  const handleSelectMobilePane = (paneId) => {
    setMobilePane(paneId);
    if (paneId) {
      handleNavigate(paneId);
    }
  };

  const sharedProps = {
    projects,
    projectsLoading: projectLoading,
    projectsError: projectError,
    experiences,
    experiencesLoading: experienceLoading,
    experiencesError: experienceError,
    certifications,
    certificationsLoading: certificationLoading,
    certificationsError: certificationError,
    skills,
    skillsLoading: skillLoading,
    skillsError: skillError,
    contact,
    accentId,
    onChangeAccent: setAccentId,
    onSelectProjectModal: setSelectedProjectModal,
    onSelectCertification: setSelectedCert,
    onReplayHello: () => setShowIntro(true),
    onOpenAirDrop: () => setShowAirDrop(true),
  };

  return (
    <>
      {deviceMode === "mac" && (
        <MacDesktopShell
          activePane={activePane}
          canGoBack={historyIndex > 0}
          canGoForward={historyIndex < history.length - 1}
          onNavigate={handleNavigate}
          onGoBack={handleGoBack}
          onGoForward={handleGoForward}
          {...sharedProps}
        />
      )}

      {deviceMode === "ipad" && (
        <IPadSettingsShell
          activePane={activePane}
          onNavigate={handleNavigate}
          {...sharedProps}
        />
      )}

      {deviceMode === "iphone" && (
        <IPhoneSettingsShell
          mobilePane={mobilePane}
          onSelectMobilePane={handleSelectMobilePane}
          {...sharedProps}
        />
      )}

      {selectedProjectModal && (
        <ProjectDetailModal
          project={selectedProjectModal}
          onClose={() => setSelectedProjectModal(null)}
        />
      )}

      {selectedCert && (
        <CertificationModal
          cert={selectedCert}
          title={tField(selectedCert, "title")}
          description={tField(selectedCert, "description")}
          detailTitle={t("certifications.detailTitle")}
          issuerLabel={t("certifications.issuer")}
          credentialLabel={t("certifications.viewCredential")}
          closeLabel={t("common.close")}
          noImageLabel={t("certifications.noImage")}
          onClose={() => setSelectedCert(null)}
        />
      )}

      {showAirDrop && (
        <AirDropOverlay
          contact={contact}
          onClose={() => setShowAirDrop(false)}
        />
      )}

      {showIntro && <HelloScreen onComplete={() => setShowIntro(false)} />}
    </>
  );
}
