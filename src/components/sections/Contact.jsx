import { useEffect, useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { contactService } from "../../services/firestoreService";

const defaultContact = {
  email: "alvien.rnp@gmail.com",
  linkedin: "https://www.linkedin.com/in/alvienrnp/",
  github: "https://github.com/alviennn",
  cvLink: "/cv-alvien-ridho.pdf",
};

function ContactIcon({ src, label, primary }) {
  return (
    <div
      className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl border ${
        primary
          ? "border-accent-green/40 bg-accent-green/15"
          : "border-white/10 bg-white/[0.04]"
      }`}
    >
      <img
        src={src}
        alt={label}
        className="h-5 w-5 object-contain transition-transform duration-300 group-hover:scale-110"
        loading="lazy"
      />
    </div>
  );
}

export default function Contact() {
  const { t } = useLanguage();
  const [contact, setContact] = useState(defaultContact);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const data = await contactService.get();

        if (data) {
          setContact({
            ...defaultContact,
            ...data,
          });
        }
      } catch (error) {
        console.error("Failed to load contact:", error);
      }
    };

    fetchContact();
  }, []);

  const isLocalCv = contact.cvLink?.startsWith("/");
  const isExternalCv = contact.cvLink?.startsWith("http");

  const contactLinks = [
    {
      key: "emailMe",
      icon: "/contact/gmail.svg",
      label: t("contact.emailMe"),
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}`,
      value: contact.email,
      primary: true,
    },
    {
      key: "linkedin",
      icon: "/contact/linkedin.svg",
      label: t("contact.linkedin"),
      href: contact.linkedin,
      value: "linkedin.com/in/alvienrnp",
    },
    {
      key: "github",
      icon: "/contact/github.svg",
      label: t("contact.github"),
      href: contact.github,
      value: "github.com/alviennn",
    },
    {
      key: "downloadCV",
      icon: "/contact/cv.svg",
      label: t("contact.downloadCV"),
      href: contact.cvLink,
      value: t("contact.cvValue"),
      download: isLocalCv,
      target: isExternalCv ? "_blank" : undefined,
      rel: isExternalCv ? "noreferrer" : undefined,
    },
  ].filter((link) => Boolean(link.href));

  return (
    <section
      id="contact"
      className="overflow-hidden bg-[#0B0B0B] px-6 py-20 text-white md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-content">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="editorial-label">✦ {t("contact.label")}</p>

            <h2 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[0.95] tracking-[-0.07em] text-white md:text-7xl lg:text-8xl">
              {t("contact.title")}
            </h2>
          </div>

          <div className="max-w-2xl lg:ml-auto">
            <p className="text-base leading-relaxed text-white/50 md:text-lg">
              {t("contact.description")}
            </p>
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-2">
          {contactLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              target={
                link.target ||
                (link.href.startsWith("http") ? "_blank" : undefined)
              }
              rel={
                link.rel ||
                (link.href.startsWith("http") ? "noreferrer" : undefined)
              }
              download={link.download ? "cv-alvien-ridho.pdf" : undefined}
              className={`group relative overflow-hidden rounded-[1.35rem] border p-4 transition-all duration-300 hover:-translate-y-1 md:p-5 ${
                link.primary
                  ? "border-accent-green/40 bg-accent-green/10 hover:border-accent-green"
                  : "border-white/10 bg-white/[0.025] hover:border-accent-green/50 hover:bg-white/[0.045]"
              }`}
            >
              <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-accent-green/10 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative z-10 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <ContactIcon
                    src={link.icon}
                    label={link.label}
                    primary={link.primary}
                  />

                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-green">
                    {link.label}
                  </p>

                  <h3 className="mt-2 break-words font-display text-base font-semibold tracking-[-0.03em] text-white md:text-lg">
                    {link.value}
                  </h3>
                </div>

                <span className="mt-1 text-sm text-accent-green opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  ✦
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}