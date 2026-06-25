import { useEffect, useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { contactService } from "../../services/firestoreService";

const defaultContact = {
  email: "alvien.rnp@gmail.com",
  linkedin: "https://www.linkedin.com/in/alvienrnp/",
  github: "https://github.com/alviennn",
  cvLink: "/cv-alvien-ridho.pdf",
};

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

  const contactLinks = [
    {
      key: "emailMe",
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}`,
      primary: true,
      external: true,
    },
    {
      key: "linkedin",
      href: contact.linkedin,
      external: true,
    },
    {
      key: "github",
      href: contact.github,
      external: true,
    },
    {
      key: "downloadCV",
      href: contact.cvLink,
      download: true,
      external: false,
    },
  ].filter((link) => Boolean(link.href));

  return (
    <section id="contact" className="section-wrapper">
      <div className="max-w-2xl">
        <h2 className="section-title">{t("contact.title")}</h2>

        <div className="mt-10 flex flex-wrap gap-4">
          {contactLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
              download={link.download ? "cv-alvien-ridho.pdf" : undefined}
              className={link.primary ? "btn-primary" : "btn-secondary"}
            >
              {t(`contact.${link.key}`)}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}