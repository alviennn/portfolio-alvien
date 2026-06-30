import { useRef } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import heroImage from "../../assets/konten-hero.jpg";

export default function Hero() {
  const { t } = useLanguage();
  const imageCardRef = useRef(null);
  const shineRef = useRef(null);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    window.history.replaceState(null, "", "/");
  };

  const handleMouseMove = (event) => {
    const card = imageCardRef.current;
    const shine = shineRef.current;

    if (!card || !shine) return;

    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.025)`;

    shine.style.opacity = "1";
    shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.34), rgba(255,255,255,0.12) 18%, transparent 42%)`;
  };

  const handleMouseLeave = () => {
    const card = imageCardRef.current;
    const shine = shineRef.current;

    if (!card || !shine) return;

    card.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";

    shine.style.opacity = "0";
  };

  return (
    <section className="editorial-bg relative min-h-screen overflow-hidden px-6 pt-28 pb-20 text-white md:px-8 md:pt-36 md:pb-28 lg:pt-40">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="hero-gradient-move absolute inset-0 bg-[length:220%_220%] opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(142,153,112,0.18), transparent 26%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.06), transparent 24%), radial-gradient(circle at 50% 85%, rgba(142,153,112,0.12), transparent 30%)",
          }}
        />

        <div className="hero-orb absolute left-[8%] top-[22%] h-56 w-56 rounded-full bg-accent-green/10 blur-3xl" />
        <div className="hero-orb-slow absolute right-[10%] top-[18%] h-64 w-64 rounded-full bg-white/[0.045] blur-3xl" />
        <div className="hero-orb absolute bottom-[8%] left-[42%] h-72 w-72 rounded-full bg-accent-green/[0.08] blur-3xl" />

        <div className="absolute left-0 top-1/2 h-px w-[200%] -translate-y-1/2 overflow-hidden opacity-10">
          <div className="hero-line-move h-px w-full bg-gradient-to-r from-transparent via-accent-green/60 to-transparent" />
        </div>

        <div className="absolute left-0 top-[62%] h-px w-[200%] -translate-y-1/2 overflow-hidden opacity-5">
          <div className="hero-line-move h-px w-full bg-gradient-to-r from-transparent via-white to-transparent" />
        </div>
      </div>
      <div className="editorial-grid absolute inset-0 -z-20 opacity-70" />

      <div className="absolute -left-28 top-24 -z-10 h-80 w-80 rounded-full bg-accent-green/15 blur-3xl" />
      <div className="absolute -right-28 bottom-8 -z-10 h-80 w-80 rounded-full bg-accent-green/10 blur-3xl" />

      <div className="mx-auto grid max-w-content items-center gap-14 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16">
        <div className="order-2 text-center fade-in lg:order-1 lg:text-left">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-accent-green md:text-sm">
            {t("hero.role")}
          </p>

          <h1 className="mx-auto max-w-5xl font-display text-[3.1rem] font-semibold leading-[0.98] tracking-[-0.06em] text-white sm:text-6xl md:text-7xl lg:mx-0 lg:text-8xl">
            {t("hero.title")}
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg lg:mx-0">
            {t("hero.description")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <button
              type="button"
              onClick={() => scrollToSection("projects")}
              className="btn-primary"
            >
              {t("hero.viewProjects")}
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="btn-secondary"
            >
              {t("hero.contactMe")}
            </button>
          </div>
        </div>

        <div className="order-1 mx-auto w-full max-w-[285px] fade-in sm:max-w-[335px] md:max-w-[380px] lg:order-2 lg:ml-auto lg:max-w-[430px]">
          <div className="relative">
            <div className="absolute inset-4 translate-x-2 translate-y-2 rounded-[1.7rem] rounded-tr-[5rem] rounded-bl-[4rem] border border-accent-green/15 bg-accent-green/[0.04]" />

            <div
              ref={imageCardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="group relative overflow-hidden rounded-[2rem] rounded-tr-[6.5rem] rounded-bl-[5rem] border border-white/10 bg-white/[0.035] p-3 backdrop-blur-md transition-transform duration-300 ease-out will-change-transform"
            >
              <div className="pointer-events-none absolute inset-0 z-20 rounded-[2rem] rounded-tr-[6.5rem] rounded-bl-[5rem] bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-20" />

              <div
                ref={shineRef}
                className="pointer-events-none absolute inset-0 z-30 opacity-0 transition-opacity duration-300"
              />

              <div className="pointer-events-none absolute -inset-full z-30 rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100" />

              <div className="relative z-10 overflow-hidden rounded-[1.45rem] rounded-tr-[5.5rem] rounded-bl-[4.2rem] bg-white/[0.04]">
                <div className="aspect-[4/5] w-full overflow-hidden">
                  <img
                    src={heroImage}
                    alt="Alvien Ridho Nanda Pryastika"
                    className="h-full w-full object-cover object-[center_18%] transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="eager"
                  />
                </div>
              </div>
            </div>

            <div className="absolute -left-3 top-10 h-12 w-12 rounded-full border border-white/10 bg-white/[0.035]" />
            <div className="absolute -right-3 bottom-12 h-16 w-16 rounded-[1.35rem] border border-accent-green/20 bg-accent-green/[0.06]" />
          </div>
        </div>
      </div>
    </section>
  );
}