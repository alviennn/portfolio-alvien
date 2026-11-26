import {
  AppearancePane,
  CertificationsPane,
  ContactPane,
  ExperiencePane,
  LanguagePane,
  OverviewPane,
  ProjectsPane,
  SkillsPane,
  WorkProcessPane,
} from "./PortfolioPanes";

export default function PaneRenderer({
  activePane,
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
  onNavigate,
  onSelectProjectModal,
  onSelectCertification,
  onReplayHello,
  onOpenAirDrop,
}) {
  switch (activePane) {
    case "experience":
      return (
        <ExperiencePane
          experiences={experiences}
          loading={experiencesLoading}
          error={experiencesError}
        />
      );
    case "certifications":
      return (
        <CertificationsPane
          certifications={certifications}
          loading={certificationsLoading}
          error={certificationsError}
          onSelectCertification={onSelectCertification}
        />
      );
    case "projects":
      return (
        <ProjectsPane
          projects={projects}
          loading={projectsLoading}
          error={projectsError}
          onSelectProjectModal={onSelectProjectModal}
        />
      );
    case "skills":
      return (
        <SkillsPane
          skills={skills}
          loading={skillsLoading}
          error={skillsError}
        />
      );
    case "workProcess":
      return <WorkProcessPane />;
    case "contact":
      return <ContactPane contact={contact} />;
    case "appearance":
      return (
        <AppearancePane
          accentId={accentId}
          onChangeAccent={onChangeAccent}
          onReplayHello={onReplayHello}
        />
      );
    case "language":
      return <LanguagePane />;
    case "overview":
    default:
      return (
        <OverviewPane
          projects={projects}
          experiences={experiences}
          certifications={certifications}
          skills={skills}
          contact={contact}
          onNavigate={onNavigate}
          onReplayHello={onReplayHello}
          onOpenAirDrop={onOpenAirDrop}
        />
      );
  }
}
