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
  {
    key: "about",
    id: "about",
    icon: UserRound,
  },
  {
    key: "projects",
    id: "projects",
    icon: BriefcaseBusiness,
  },
  {
    key: "contact",
    id: "contact",
    icon: Mail,
  },
];

const defaultContact = {
  cvLink: "/cv-alvien-ridho.pdf",
};

export default function Navbar() {
  const { t } = useLanguage();

  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] =
    useState(false);

  const [activeSection, setActiveSection] =
    useState("home");

  const [scrolled, setScrolled] =
    useState(false);

  const [contact, setContact] =
    useState(defaultContact);

  useEffect(() => {
    const onScroll = () => {
      const scrollY =
        window.scrollY;

      const windowHeight =
        window.innerHeight;

      const documentHeight =
        document.documentElement
          .scrollHeight;

      setScrolled(scrollY > 20);

      if (scrollY < 120) {
        setActiveSection("home");
        return;
      }

      const isNearBottom =
        scrollY +
          windowHeight >=
        documentHeight - 120;

      if (isNearBottom) {
        setActiveSection(
          "contact"
        );

        return;
      }

      const sections =
        NAV_ITEMS.map((item) => {
          const section =
            document.getElementById(
              item.id
            );

          if (!section)
            return null;

          const rect =
            section.getBoundingClientRect();

          return {
            id: item.id,
            top: rect.top,
            distance:
              Math.abs(
                rect.top - 140
              ),
          };
        }).filter(
          (v) => v !== null
        );

      const visible =
        sections.filter(
          (s) =>
            s.top <= 180
        );

      if (visible.length) {
        const closest =
          visible.reduce(
            (
              prev,
              current
            ) =>
              current.distance <
              prev.distance
                ? current
                : prev
          );

        setActiveSection(
          closest.id
        );
      }
    };

    onScroll();

    window.addEventListener(
      "scroll",
      onScroll,
      {
        passive: true,
      }
    );

    return () =>
      window.removeEventListener(
        "scroll",
        onScroll
      );
  }, []);

  useEffect(() => {
    async function loadContact() {
      try {
        const data =
          await contactService.get();

        if (data) {
          setContact({
            ...defaultContact,
            ...data,
          });
        }
      } catch (err) {
        console.error(err);
      }
    }

    loadContact();
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const scrollToSection = (
    id
  ) => {
    setIsOpen(false);

    if (
      location.pathname !==
      "/"
    ) {
      navigate("/");

      setTimeout(() => {
        executeScroll(id);
      }, 150);

      return;
    }

    executeScroll(id);
  };

  const executeScroll = (
    id
  ) => {
    if (id === "home") {
      window.scrollTo({
        top: 0,
        behavior:
          "smooth",
      });

      setActiveSection(
        "home"
      );

      return;
    }

    const section =
      document.getElementById(
        id
      );

    if (!section)
      return;

    section.scrollIntoView({
      behavior:
        "smooth",
      block: "start",
    });

    setActiveSection(id);
  };

  const isLocalCv =
    contact.cvLink?.startsWith(
      "/"
    );

  const isExternalCv =
    contact.cvLink?.startsWith(
      "http"
    );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-light-bg/80 dark:bg-black/80 backdrop-blur-xl"
          : "bg-light-bg/60 dark:bg-black/60 backdrop-blur-lg"
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5">

        {/* Logo */}
        <button
          onClick={() =>
            scrollToSection(
              "home"
            )
          }
          className="text-light-text dark:text-white font-semibold text-lg"
        >
          Alvien Ridho
          Nanda Pryastika
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-2">

          {NAV_ITEMS.map(
            (item) => {
              const Icon =
                item.icon;

              const active =
                activeSection ===
                item.id;

              return (
                <button
                  key={
                    item.id
                  }
                  onClick={() =>
                    scrollToSection(
                      item.id
                    )
                  }
                  className={`flex items-center gap-2 rounded-full px-5 py-3 transition ${
                    active
                      ? "bg-accent-green text-black"
                      : "text-light-text dark:text-white hover:bg-black/5 dark:hover:bg-white/10"
                  }`}
                >
                  <Icon
                    size={
                      18
                    }
                  />

                  {t(
                    `nav.${item.key}`
                  )}
                </button>
              );
            }
          )}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">

          <div className="hidden md:flex gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>

          <a
            href={contact.cvLink}
            download={
              isLocalCv
                ? "cv-alvien-ridho.pdf"
                : undefined
            }
            target={
              isExternalCv
                ? "_blank"
                : undefined
            }
            rel="noreferrer"
            className="
              group
              relative
              overflow-hidden
              flex
              h-12
              items-center
              justify-center
              rounded-full
              bg-accent-green
              px-4
              md:px-6
              text-sm
              font-semibold
              text-black
              transition-all
              duration-500
              hover:scale-[1.03]
              shadow-[0_0_18px_rgba(142,153,112,0.45)]
              hover:shadow-[0_0_35px_rgba(142,153,112,0.95)]
            "
          >

            {/* Glow */}
            <span
              className="
                absolute
                inset-0
                rounded-full
                bg-accent-green
                opacity-20
                blur-xl
                transition
                duration-700
                group-hover:opacity-50
              "
            />

            {/* Light Sweep */}
            <span
              className="
                absolute
                inset-y-0
                -left-[120%]
                w-[55%]
                rotate-12
                bg-gradient-to-r
                from-transparent
                via-white/60
                to-transparent
                transition-all
                duration-1000
                group-hover:left-[140%]
              "
            />

            <span className="relative z-10 whitespace-nowrap">
              <span className="md:hidden">
                CV
              </span>

              <span className="hidden md:inline">
                Download CV
              </span>
            </span>

          </a>

          <button
            onClick={() =>
              setIsOpen(
                !isOpen
              )
            }
            className="md:hidden flex h-12 w-12 items-center justify-center rounded-full border border-light-border dark:border-white/10 text-light-text dark:text-white"
          >
            {isOpen ? (
              <X />
            ) : (
              <Menu />
            )}
          </button>

        </div>

      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">

          <div className="rounded-3xl bg-light-bg/95 dark:bg-[#050505]/95 border border-light-border dark:border-transparent p-3">

            {NAV_ITEMS.map(
              (
                item
              ) => (
                <button
                  key={
                    item.id
                  }
                  onClick={() =>
                    scrollToSection(
                      item.id
                    )
                  }
                  className="flex w-full rounded-2xl px-4 py-4 text-light-text dark:text-white hover:bg-black/5 dark:hover:bg-white/10"
                >
                  {t(
                    `nav.${item.key}`
                  )}
                </button>
              )
            )}

            <div className="mt-3 flex justify-end gap-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>

          </div>

        </div>
      )}
    </header>
  );
}
