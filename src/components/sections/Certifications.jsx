import { useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { useFirestoreCollection } from "../../hooks/useFirestoreCollection";
import { certificationsService } from "../../services/firestoreService";
import { seedCertifications } from "../../data/seedData";
import { LoadingState, EmptyState, ErrorState } from "../ui/StatusStates";
import CertificationModal from "../ui/CertificationModal";

function CertificationCard({ cert, onViewDetail }) {
  const { t, tField } = useLanguage();
  const hasImage = Boolean(cert.certificateImage);

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-light-border bg-light-bg p-5 transition-all duration-300 hover:-translate-y-1 hover:border-light-text/30 hover:shadow-soft dark:border-dark-border dark:bg-dark-bg dark:hover:border-dark-text/30 md:p-6">
      <div className="flex items-start gap-4">
        {hasImage ? (
          <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg ring-1 ring-light-border dark:ring-dark-border">
            <img
              src={cert.certificateImage}
              alt={tField(cert, "title")}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-light-bgSecondary dark:bg-dark-bgSecondary">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 15a4 4 0 100-8 4 4 0 000 8zM8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
            </svg>
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg font-semibold leading-snug text-light-text dark:text-dark-text">
            {tField(cert, "title")}
          </h3>

          {cert.issuer && (
            <p className="mt-1 line-clamp-2 text-sm font-medium text-accent-green">
              {t("certifications.issuer")}: {cert.issuer}
            </p>
          )}
        </div>
      </div>

      <div className="mt-auto pt-6">
        <button
          type="button"
          onClick={() => onViewDetail(cert)}
          className="inline-flex items-center gap-1 text-sm font-medium text-light-text transition-colors duration-200 hover:text-accent-green dark:text-dark-text"
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
      </div>
    </article>
  );
}

export default function Certifications() {
  const { t, tField } = useLanguage();
  const { data, loading, error } =
    useFirestoreCollection(certificationsService);

  const [selectedCert, setSelectedCert] = useState(null);

  const certifications =
    !loading && !error && data.length > 0 ? data : seedCertifications;

  const handleViewDetail = (cert) => {
    setSelectedCert(cert);
  };

  const handleCloseModal = () => {
    setSelectedCert(null);
  };

  return (
    <section id="certifications" className="section-wrapper overflow-hidden">
      <h2 className="section-title">{t("certifications.title")}</h2>
      <p className="section-subtitle">{t("certifications.description")}</p>

      <div className="mt-10">
        {loading && <LoadingState message={t("certifications.loading")} />}

        {error && <ErrorState message={t("certifications.error")} />}

        {!loading && !error && certifications.length === 0 && (
          <EmptyState message={t("certifications.empty")} />
        )}

        {!loading && !error && certifications.length > 0 && (
          <>
            <p className="mb-4 text-xs text-light-muted dark:text-dark-muted md:hidden">
              {t("common.swipeMore")}
            </p>

            <div className="flex snap-x snap-mandatory scroll-smooth gap-5 overflow-x-auto pb-5 scrollbar-hide md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:pb-0 lg:grid-cols-3">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="min-w-full snap-start md:min-w-0"
                >
                  <CertificationCard
                    cert={cert}
                    onViewDetail={handleViewDetail}
                  />
                </div>
              ))}
            </div>
          </>
        )}
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
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
}