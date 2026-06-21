import { useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { useFirestoreCollection } from "../../hooks/useFirestoreCollection";
import { certificationsService } from "../../services/firestoreService";
import { seedCertifications } from "../../data/seedData";
import { LoadingState, EmptyState, ErrorState } from "../ui/StatusStates";
import ImageLightbox from "../ui/ImageLightbox";

function CertificationCard({ cert, onViewImage }) {
  const { t, tField } = useLanguage();
  const hasImage = Boolean(cert.certificateImage);

  return (
    <article className="border border-light-border dark:border-dark-border rounded-2xl p-6">
      <div className="flex items-start gap-4">
        {hasImage ? (
          <button
            type="button"
            onClick={() =>
              onViewImage(cert.certificateImage, tField(cert, "title"))
            }
            aria-label={`View certificate: ${tField(cert, "title")}`}
            className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 ring-1 ring-light-border dark:ring-dark-border hover:opacity-80 transition-opacity duration-200"
          >
            <img
              src={cert.certificateImage}
              alt={tField(cert, "title")}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ) : (
          <div className="w-14 h-14 rounded-lg bg-light-bgSecondary dark:bg-dark-bgSecondary flex items-center justify-center flex-shrink-0">
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

        <div className="flex-1">
          <h3 className="font-display text-lg font-semibold leading-snug">
            {tField(cert, "title")}
          </h3>

          <p className="text-sm font-medium text-accent-green">
            {t("certifications.issuer")}: {cert.issuer}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-light-muted dark:text-dark-muted">
        {tField(cert, "description")}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-5">
        {hasImage && (
          <button
            type="button"
            onClick={() =>
              onViewImage(cert.certificateImage, tField(cert, "title"))
            }
            className="inline-flex items-center gap-1 text-sm font-medium hover:text-accent-green transition-colors duration-200"
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
              <path d="M15 3h6v6M21 3L13 11M10 21H4a1 1 0 01-1-1V4a1 1 0 011-1h6" />
            </svg>
          </button>
        )}

        {cert.credentialLink && (
          <a
            href={cert.credentialLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium hover:text-accent-green transition-colors duration-200"
          >
            {t("certifications.viewCredential")}
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
          </a>
        )}
      </div>
    </article>
  );
}

export default function Certifications() {
  const { t } = useLanguage();
  const { data, loading, error } =
    useFirestoreCollection(certificationsService);

  const [lightbox, setLightbox] = useState(null);

  const certifications =
    !loading && !error && data.length > 0 ? data : seedCertifications;

  const handleViewImage = (src, alt) => {
    setLightbox({ src, alt });
  };

  const handleCloseLightbox = () => {
    setLightbox(null);
  };

  return (
    <section id="certifications" className="section-wrapper">
      <h2 className="section-title">{t("certifications.title")}</h2>
      <p className="section-subtitle">{t("certifications.description")}</p>

      <div className="mt-12">
        {loading && <LoadingState message={t("certifications.loading")} />}

        {error && <ErrorState message={t("certifications.error")} />}

        {!loading && !error && certifications.length === 0 && (
          <EmptyState message={t("certifications.empty")} />
        )}

        {!loading && !error && certifications.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert) => (
              <CertificationCard
                key={cert.id}
                cert={cert}
                onViewImage={handleViewImage}
              />
            ))}
          </div>
        )}
      </div>

      {lightbox && (
        <ImageLightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={handleCloseLightbox}
        />
      )}
    </section>
  );
}