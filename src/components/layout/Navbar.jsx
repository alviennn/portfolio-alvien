import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  UserRound,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { contactService } from "../../services/firestoreService";
import ThemeToggle from "../ui/ThemeToggle";
import LanguageToggle from "../ui/LanguageToggle";

const NAV_ITEMS = [
  { key: "about", id: "about", icon: UserRound },
  { key: "projects", id: "projects", icon: BriefcaseBusiness },
  { key: "contact", id: "contact", icon: Mail },
];

const defaultContact = {
  cvLink: "/cv-alvien-ridho.pdf",
};

export default function Navbar() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [contact, setContact] = useState(defaultContact);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      setScrolled(scrollY > 20);

      if (scrollY < 120) {
        setActiveSection("home");
        return;
      }

      const isNearBottom = scrollY + windowHeight >= documentHeight - 120;

      if (isNearBottom) {
        setActiveSection("contact");
        return;
      }

      const sections = NAV_ITEMS.filter((item) => item.id !== "home")
        .map((item) => {
          const section = document.getElementById(item.id);
          if (!section) return null;

          const rect = section.getBoundingClientRect();

          return {
            id: item.id,
            top: rect.top,
            distance: Math.abs(rect.top - 140),
          };
        })
        .filter(Boolean);

      const visibleSections = sections.filter((section) => section.top <= 180);

      if (visibleSections.length > 0) {
        const closestSection = visibleSections.reduce((closest, section) => {
          return section.distance < closest.distance ? section : closest;
        });

        setActiveSection(closestSection.id);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        console.error("Failed to load navbar contact:", error);
      }
    };

    fetchContact();
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const scrollToSection = (id) => {
    setIsOpen(false);
    setActiveSection(id);

    const scroll = () => {
      if (id === "home") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        setActiveSection("home");
        window.history.replaceState(null, "", "/");
        return;
      }

      const section = document.getElementById(id);
      if (!section) return;

      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setActiveSection(id);
      window.history.replaceState(null, "", "/");
    };

    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        scroll();
      }, 150);

      return;
    }

    scroll();
  };

  const isLocalCv = contact.cvLink?.startsWith("/");
  const isExternalCv = contact.cvLink?.startsWith("http");

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#050505]/80 shadow-[0_18px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
          : "bg-[#050505]/70 backdrop-blur-xl"
      }`}
    >
      <nav className="mx-auto flex h-[82px] max-w-[1440px] items-center justify-between px-6 md:px-10 lg:px-16">
        {/* Brand */}
        <button
          type="button"
          onClick={() => scrollToSection("home")}
          className="hidden font-display text-xl font-semibold tracking-[-0.04em] text-white transition-colors duration-300 hover:text-accent-green md:block lg:text-l"
        >
          Alvien Ridho Nanda Pryastika
        </button>

        {/* Mobile brand */}
        <button
          type="button"
          onClick={() => scrollToSection("home")}
          className="font-display text-lg font-semibold tracking-[-0.04em] text-white transition-colors duration-300 hover:text-accent-green md:hidden"
        >
          Alvien.
        </button>

        {/* Desktop center nav */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 md:block">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#050505]/90 p-2 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`group flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 lg:px-6 ${
                    isActive
                      ? "bg-accent-green text-black shadow-[0_0_35px_rgba(142,153,112,0.55)]"
                      : "text-white hover:bg-white/[0.07] hover:text-white"
                  }`}
                >
                  <Icon
                    size={18}
                    strokeWidth={2.2}
                    className={`transition-transform duration-300 ${
                      isActive ? "scale-105" : "group-hover:-translate-y-0.5"
                    }`}
                  />

                  <span>{t(`nav.${item.key}`)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop right actions */}
        <div className="hidden items-center gap-3 md:flex">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#050505]/90 p-2 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
            <LanguageToggle />
            <ThemeToggle />
          </div>

          <a
            href={contact.cvLink}
            download={isLocalCv ? "cv-alvien-ridho.pdf" : undefined}
            target={isExternalCv ? "_blank" : undefined}
            rel={isExternalCv ? "noreferrer" : undefined}
            className="group relative overflow-hidden rounded-full bg-accent-green px-7 py-3 text-sm font-semibold text-black shadow-[0_0_35px_rgba(142,153,112,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(142,153,112,0.9)]"
          >
            <span className="relative z-10">{t("contact.downloadCV")}</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </a>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={contact.cvLink}
            download={isLocalCv ? "cv-alvien-ridho.pdf" : undefined}
            target={isExternalCv ? "_blank" : undefined}
            rel={isExternalCv ? "noreferrer" : undefined}
            aria-label={t("contact.downloadCV")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-green text-[11px] font-semibold text-black shadow-[0_0_24px_rgba(142,153,112,0.6)]"
          >
            CV
          </a>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#050505]/90 text-white backdrop-blur-xl transition-all duration-300 hover:border-accent-green hover:text-accent-green"
          >
            {isOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`px-4 md:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        } transition-opacity duration-300`}
      >
        <div
          className={`mx-auto mt-2 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#050505]/95 p-2 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-2xl transition-all duration-300 ${
            isOpen ? "translate-y-0 scale-100" : "-translate-y-3 scale-[0.98]"
          }`}
        >
          <div className="grid gap-2">
            {NAV_ITEMS.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  style={{
                    transitionDelay: isOpen ? `${index * 40}ms` : "0ms",
                  }}
                  className={`flex items-center justify-between rounded-2xl px-4 py-4 text-left transition-all duration-300 ${
                    isOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-2 opacity-0"
                  } ${
                    isActive
                      ? "bg-accent-green text-black"
                      : "text-white/75 hover:bg-white/[0.07] hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-3 font-semibold">
                    <Icon size={18} />
                    {t(`nav.${item.key}`)}
                  </span>

                  <span
                    className={isActive ? "text-black" : "text-accent-green"}
                  >
                    ✦
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-2 flex items-center justify-end gap-2 border-t border-white/10 p-3">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}