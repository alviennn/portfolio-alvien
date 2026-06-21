import { useLanguage } from "../../i18n/LanguageContext";
import heroImage from "../../assets/hero.png";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 px-6 md:px-8 overflow-hidden">
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Soft background glow */}
      <div className="absolute right-0 top-32 -z-10 h-72 w-72 rounded-full bg-accent-green/10 blur-3xl dark:bg-accent-green/20" />

      <div className="max-w-content mx-auto grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] fade-in">
        {/* Left Content */}
        <div>
          <p className="text-sm font-medium text-accent-green mb-4">
            {t("hero.role")}
          </p>

          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] max-w-3xl">
            {t("hero.title")}
          </h1>

          <p className="mt-6 text-base md:text-lg text-light-muted dark:text-dark-muted max-w-prose leading-relaxed">
            {t("hero.description")}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#projects" className="btn-primary">
              {t("hero.viewProjects")}
            </a>

            <a href="#contact" className="btn-secondary">
              {t("hero.contactMe")}
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative hidden lg:block">
          <div className="relative ml-auto max-w-[460px]">
            {/* Decorative shape */}
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-light-card/70 shadow-soft dark:bg-dark-card/70" />

           <div className="overflow-hidden rounded-[2rem] bg-light-card shadow-soft dark:bg-dark-card">
              <img
                src={heroImage}
                alt="Alvien Ridho portfolio preview"
                className="h-[520px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}