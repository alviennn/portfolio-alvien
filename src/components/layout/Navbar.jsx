import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";
import ThemeToggle from "../ui/ThemeToggle";
import LanguageToggle from "../ui/LanguageToggle";

const NAV_ITEMS = [
  { key: "about", id: "about" },
  { key: "projects", id: "projects" },
  { key: "experience", id: "experience" },
  { key: "certifications", id: "certifications" },
  { key: "skills", id: "skills" },
  { key: "contact", id: "contact" },
];

export default function Navbar() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsOpen(false);

    const scroll = () => {
      const section = document.getElementById(id);
      if (!section) return;

      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      window.history.replaceState(null, "", "/");
    };

    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        scroll();
      }, 120);

      return;
    }

    scroll();
  };

  const goHome = () => {
    setIsOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    window.history.replaceState(null, "", "/");
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-light-border bg-light-bg/80 backdrop-blur-md dark:border-dark-border dark:bg-dark-bg/80"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-content items-center justify-between px-6 md:px-1">
        <button
          type="button"
          onClick={goHome}
          className="font-display text-base font-semibold"
        >
          Alvien Ridho Nanda Pryastika
        </button>

        <ul className="hidden items-center gap-8 text-sm font-medium text-light-muted dark:text-dark-muted md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.key}>
              <button
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="transition-colors duration-200 hover:text-light-text dark:hover:text-dark-text"
              >
                {t(`nav.${item.key}`)}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageToggle />
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle />
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-light-border dark:border-dark-border"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {isOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="border-t border-light-border bg-light-bg dark:border-dark-border dark:bg-dark-bg md:hidden">
          <ul className="flex flex-col gap-4 px-6 py-4 text-sm font-medium">
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <button
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="text-left transition-colors duration-200 hover:text-accent-green"
                >
                  {t(`nav.${item.key}`)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}