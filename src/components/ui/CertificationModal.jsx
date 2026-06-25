import { useEffect } from "react";

export default function CertificationModal({
  cert,
  title,
  description,
  detailTitle,
  issuerLabel,
  credentialLabel,
  closeLabel,
  noImageLabel,
  onClose,
}) {
  if (!cert) return null;

  const hasImage = Boolean(cert.certificateImage);
  const hasCredential = Boolean(cert.credentialLink);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      <button
        type="button"
        aria-label={closeLabel}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      <div className="relative z-10 max-h-[88vh] w-full max-w-5xl overflow-hidden rounded-3xl bg-light-bg shadow-soft dark:bg-dark-bg">
        <div className="flex items-center justify-between border-b border-light-border px-5 py-4 dark:border-dark-border md:px-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-green">
            {detailTitle}
          </p>

          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-light-bgSecondary text-light-muted transition-colors duration-200 hover:text-light-text dark:bg-dark-bgSecondary dark:text-dark-muted dark:hover:text-dark-text"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid max-h-[calc(88vh-72px)] overflow-y-auto md:grid-cols-[1fr_0.9fr]">
          <div className="bg-light-bgSecondary p-4 dark:bg-dark-bgSecondary md:p-6">
            {hasImage ? (
              <div className="overflow-hidden rounded-2xl bg-white dark:bg-dark-bg">
                <img
                  src={cert.certificateImage}
                  alt={title}
                  className="max-h-[70vh] w-full object-contain"
                />
              </div>
            ) : (
              <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-light-border px-6 text-center text-sm text-light-muted dark:border-dark-border dark:text-dark-muted">
                {noImageLabel}
              </div>
            )}
          </div>

          <div className="p-5 md:p-6">
            <h2 className="font-display text-2xl font-semibold leading-tight text-light-text dark:text-dark-text">
              {title}
            </h2>

            {cert.issuer && (
              <p className="mt-3 text-sm font-medium text-accent-green">
                {issuerLabel}: {cert.issuer}
              </p>
            )}

            {description && (
              <p className="mt-6 text-sm leading-relaxed text-light-muted dark:text-dark-muted">
                {description}
              </p>
            )}

            {hasCredential && (
              <a
                href={cert.credentialLink}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-light-text px-5 py-2.5 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-85 dark:bg-dark-text dark:text-black"
              >
                {credentialLabel}
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
        </div>
      </div>
    </div>
  );
}