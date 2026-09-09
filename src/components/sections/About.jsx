import { useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { useFirestoreCollection } from "../../hooks/useFirestoreCollection";
import {
  experiencesService,
  certificationsService,
} from "../../services/firestoreService";
import { seedExperiences, seedCertifications } from "../../data/seedData";
import { LoadingState, EmptyState, ErrorState } from "../ui/StatusStates";
import CertificationModal from "../ui/CertificationModal";

function formatDate(value) {
  if (!value) return "Present";

  const [year, month] = value.split("-");
  const date = new Date(Number(year), Number(month) - 1);

  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function SectionIntro({ label, title, description, centered = false }) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="editorial-label">✦ {label}</p>

      <h3 className="mt-4 pl-1 font-display text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-light-text dark:text-dark-text md:text-5xl">
        {title}
      </h3>

      {description && (
        <p
          className={`mt-5 text-base leading-relaxed text-light-muted dark:text-dark-muted ${
            centered ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

function ExperienceItem({ item, isLast }) {
  const { tField } = useLanguage();

  return (
    <article className="relative grid gap-5 border-b border-light-border dark:border-dark-border pb-8 last:border-b-0 last:pb-0 md:grid-cols-[170px_1fr]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-light-muted dark:text-dark-muted">
          {formatDate(item.startDate)}
        </p>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-light-muted dark:text-dark-muted">
          {formatDate(item.endDate)}
        </p>
      </div>

      <div className="relative pl-7">
        {!isLast && (
          <span className="absolute left-[5px] top-5 -bottom-8 w-px bg-black/10 dark:bg-white/10" />
        )}

        <span className="absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full bg-accent-green shadow-[0_0_24px_rgba(142,153,112,0.75)]" />

        <h4 className="font-display text-xl font-semibold leading-tight text-light-text dark:text-dark-text">
          {tField(item, "title")}
        </h4>

        {item.company && (
          <p className="mt-1 text-sm font-medium text-accent-green">
            {item.company}
          </p>
        )}

        {tField(item, "description") && (
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-light-muted dark:text-dark-muted md:text-base">
            {tField(item, "description")}
          </p>
        )}
      </div>
    </article>
  );
}

function CertificationItem({ cert, onViewDetail }) {
  const { t, tField } = useLanguage();

  return (
    <article className="group flex flex-col gap-4 rounded-[1.25rem] border border-light-border dark:border-dark-border bg-black/[0.02] dark:bg-white/[0.025] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent-green/50 hover:bg-black/[0.03] dark:hover:bg-white/[0.045] sm:rounded-[1.5rem] sm:p-5 md:grid md:grid-cols-[1fr_auto] md:items-center">
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-green sm:text-xs">
          {cert.issuer || t("certifications.issuer")}
        </p>

        <h4 className="mt-2 font-display text-base font-semibold leading-snug text-light-text dark:text-dark-text sm:mt-3 sm:text-lg md:text-xl">
          {tField(cert, "title")}
        </h4>

        {(cert.year || cert.date) && (
          <p className="mt-1.5 text-xs text-light-muted dark:text-dark-muted sm:mt-2 sm:text-sm">
            {cert.year || cert.date}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => onViewDetail(cert)}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-light-border dark:border-dark-border px-4 py-2.5 text-xs font-medium text-light-muted dark:text-dark-muted transition-all duration-300 hover:border-accent-green/60 hover:text-accent-green sm:w-auto sm:justify-start sm:py-2 sm:text-sm md:justify-center"
      >
        {t("certifications.viewCertificate")}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M7 17L17 7M7 7h10v10" />
        </svg>
      </button>
    </article>
  );
}

function FullWidthMarquee() {
  const { t } = useLanguage();

  const items = [
    t("about.marquee.design"),
    t("about.marquee.frontend"),
    t("about.marquee.usability"),
    t("about.marquee.interface"),
    t("about.marquee.development"),
    t("about.marquee.analysis"),
  ];

  return (
    <div className="relative left-1/2 mt-20 w-screen -translate-x-1/2 overflow-hidden border-y border-light-border dark:border-dark-border bg-black/[0.015] dark:bg-white/[0.015] py-8 md:py-10">
      <div className="marquee-track flex w-max items-center gap-8">
        {[...items, ...items, ...items, ...items].map((item, index) => (
          <div key={`${item}-${index}`} className="flex items-center gap-8">
            <span
              className="
                whitespace-nowrap
                font-display
                text-4xl
                font-semibold
                uppercase
                tracking-[-0.06em]
                text-black/15
                dark:text-white/15
                transition-all
                duration-300
                hover:text-black/40
                dark:hover:text-white/60
                hover:tracking-[-0.04em]
                md:text-7xl
                lg:text-8xl
              "
            >
              {item}
            </span>
            <span className="text-2xl text-accent-green md:text-4xl">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkProcess() {
  const { t } = useLanguage();

  const steps = [
    {
      number: "01",
      title: t("about.process.discovery.title"),
      description: t("about.process.discovery.description"),
    },
    {
      number: "02",
      title: t("about.process.strategy.title"),
      description: t("about.process.strategy.description"),
    },
    {
      number: "03",
      title: t("about.process.design.title"),
      description: t("about.process.design.description"),
    },
    {
      number: "04",
      title: t("about.process.development.title"),
      description: t("about.process.development.description"),
    },
  ];

  return (
    <div className="mt-24">
      <SectionIntro
        label={t("about.process.label")}
        title={t("about.process.title")}
        description={t("about.process.description")}
        centered
      />

      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <article
            key={step.number}
            className="group rounded-[1.25rem] border border-light-border dark:border-dark-border bg-black/[0.02] dark:bg-white/[0.025] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent-green/50 hover:bg-black/[0.03] dark:hover:bg-white/[0.045] sm:rounded-[1.5rem] sm:p-5"
          >
            <p
              className="
                font-display
                text-2xl
                font-semibold
                text-black/10
                dark:text-white/15
                transition-all
                duration-500
                group-hover:text-accent-green
                group-hover:drop-shadow-[0_0_10px_rgba(79,122,107,0.35)]
                group-hover:tracking-[0.03em]
                sm:text-4xl
              "
            >
              {step.number}
            </p>

            <h4 className="mt-4 font-display text-base font-semibold text-light-text dark:text-dark-text sm:mt-8 sm:text-xl">
              {step.title}
            </h4>

            <p className="mt-2 text-xs leading-relaxed text-light-muted dark:text-dark-muted sm:mt-3 sm:text-sm">
              {step.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  const { t, tField } = useLanguage();

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

  const [selectedCert, setSelectedCert] = useState(null);

  const experiences =
    !experienceLoading && !experienceError && experienceData.length > 0
      ? experienceData
      : seedExperiences;

  const certifications =
    !certificationLoading && !certificationError && certificationData.length > 0
      ? certificationData
      : seedCertifications;

  return (
    <section
      id="about"
      className="overflow-hidden bg-light-bg dark:bg-dark-bg px-6 py-20 text-light-text dark:text-dark-text md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-content">
        {/* About Header */}
        <div className="mx-auto max-w-5xl text-center" data-reveal>
          <p className="editorial-label">✦ {t("about.label")}</p>

          <h2 className="mx-auto mt-5 max-w-5xl pl-1 font-display text-5xl font-semibold leading-[1.05] tracking-[-0.04em] md:text-7xl lg:text-8xl">
  <span className="text-light-text dark:text-dark-text">
    {t("about.header.line1")}{" "}
  </span>

  <span
    className="
      bg-gradient-to-r
      from-[#4F7A6B]
      via-[#7D9B90]
      to-[#AFC1BA]
      dark:from-[#6F9387]
      dark:via-[#AFC1BA]
      dark:to-[#D6DFDB]
      bg-clip-text
      text-transparent
    "
  >
    {t("about.header.highlight")}
  </span>

  <span className="text-light-text dark:text-dark-text">
    {" "}
    {t("about.header.line2")}
  </span>
</h2>

          <div className="mx-auto mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-light-muted dark:text-dark-muted md:text-lg">
            <p>{t("about.paragraph1")}</p>
            <p>{t("about.paragraph2")}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-3 sm:gap-4">
          <div data-reveal style={{ "--reveal-delay": "80ms" }} className="rounded-[1.25rem] border border-light-border dark:border-dark-border bg-black/[0.02] dark:bg-white/[0.025] p-4 text-center sm:rounded-[1.5rem] sm:p-5">
            <p className="font-display text-3xl font-semibold text-light-text dark:text-dark-text sm:text-4xl md:text-5xl">
              {experiences.length}+
            </p>
            <p className="mt-2 text-xs text-light-muted dark:text-dark-muted sm:text-sm">
              {t("about.stats.experience")}
            </p>
          </div>

          <div data-reveal style={{ "--reveal-delay": "160ms" }} className="rounded-[1.25rem] border border-light-border dark:border-dark-border bg-black/[0.02] dark:bg-white/[0.025] p-4 text-center sm:rounded-[1.5rem] sm:p-5">
            <p className="font-display text-3xl font-semibold text-light-text dark:text-dark-text sm:text-4xl md:text-5xl">
              {certifications.length}+
            </p>
            <p className="mt-2 text-xs text-light-muted dark:text-dark-muted sm:text-sm">
              {t("about.stats.certifications")}
            </p>
          </div>
        </div>

        <FullWidthMarquee />

        {/* Experience */}
        <div className="mt-24" data-reveal>
          <SectionIntro
            label={t("about.workHistory.label")}
            title={t("experience.title")}
            description={t("experience.description")}
            centered
          />

          <div className="mx-auto mt-12 max-w-4xl">
            {experienceLoading && (
              <LoadingState message={t("experience.loading")} />
            )}

            {experienceError && <ErrorState message={t("experience.error")} />}

            {!experienceLoading &&
              !experienceError &&
              experiences.length === 0 && (
                <EmptyState message={t("experience.empty")} />
              )}

            {!experienceLoading &&
              !experienceError &&
              experiences.length > 0 && (
                <div className="rounded-[2rem] border border-light-border dark:border-dark-border bg-black/[0.015] dark:bg-white/[0.018] p-5 md:p-8">
                  <div className="space-y-8">
                    {experiences.map((item, index) => (
                      <ExperienceItem
                        key={item.id}
                        item={item}
                        isLast={index === experiences.length - 1}
                      />
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>

        <div data-reveal>
          <WorkProcess />
        </div>

        {/* Certifications */}
        <div className="mt-24" data-reveal>
          <SectionIntro
            label={t("about.recognition.label")}
            title={t("certifications.title")}
            description={t("certifications.description")}
            centered
          />

          <div className="mt-12">
            {certificationLoading && (
              <LoadingState message={t("certifications.loading")} />
            )}

            {certificationError && (
              <ErrorState message={t("certifications.error")} />
            )}

            {!certificationLoading &&
              !certificationError &&
              certifications.length === 0 && (
                <EmptyState message={t("certifications.empty")} />
              )}

            {!certificationLoading &&
              !certificationError &&
              certifications.length > 0 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {certifications.map((cert) => (
                    <CertificationItem
                      key={cert.id}
                      cert={cert}
                      onViewDetail={setSelectedCert}
                    />
                  ))}
                </div>
              )}
          </div>
        </div>

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
      </div>
    </section>
  );
}
