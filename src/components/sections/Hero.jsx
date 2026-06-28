import { useLanguage } from "../../i18n/LanguageContext";
import heroImage from "../../assets/hero-alvien.jpg";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden px-6 pt-28 pb-20 md:px-8 md:pt-36 md:pb-28 lg:pt-40">
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 -z-20 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Soft background glow */}
      <div className="absolute -left-24 top-24 -z-10 h-72 w-72 rounded-full bg-accent-green/10 blur-3xl dark:bg-accent-green/20" />
      <div className="absolute -right-24 bottom-10 -z-10 h-72 w-72 rounded-full bg-accent-green/10 blur-3xl dark:bg-accent-green/20" />

      <div className="mx-auto grid max-w-content items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Left Content */}
        <div className="order-2 text-center fade-in lg:order-1 lg:text-left">
          <p className="mb-4 text-sm font-medium text-accent-green">
            {t("hero.role")}
          </p>

          <h1 className="mx-auto max-w-3xl font-display text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:mx-0">
            {t("hero.title")}
          </h1>

          <p className="mx-auto mt-6 max-w-prose text-base leading-relaxed text-light-muted dark:text-dark-muted md:text-lg lg:mx-0">
            {t("hero.description")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <a href="#projects" className="btn-primary">
              {t("hero.viewProjects")}
            </a>

            <a href="#contact" className="btn-secondary">
              {t("hero.contactMe")}
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="order-1 mx-auto w-full max-w-[290px] fade-in sm:max-w-[340px] md:max-w-[380px] lg:order-2 lg:ml-auto lg:max-w-[430px]">
          <div className="relative">
            {/* Back decorative layer */}
            <div className="absolute inset-3 translate-x-2 translate-y-2 rounded-[1.8rem] rounded-tr-[5rem] rounded-bl-[4rem] bg-accent-green/5 dark:bg-accent-green/10" />

            {/* Outer frame */}
            <div className="relative overflow-hidden rounded-[2rem] rounded-tr-[6rem] rounded-bl-[5rem] border border-light-border/70 bg-light-card p-3 shadow-soft dark:border-dark-border dark:bg-dark-card">
              {/* Inner image mask */}
              <div className="overflow-hidden rounded-[1.5rem] rounded-tr-[5rem] rounded-bl-[4rem] bg-light-bgSecondary dark:bg-dark-bgSecondary">
                <div className="aspect-[4/5] w-full overflow-hidden">
                  <img
                    src={heroImage}
                    alt="Alvien Ridho Nanda Pryastika"
                    className="h-full w-full object-cover object-[center_18%]"
                    loading="eager"
                  />
                </div>
              </div>
            </div>

            {/* Small soft accent */}
            <div className="absolute -left-5 top-8 h-16 w-16 rounded-full border border-light-border/60 bg-light-card/70 blur-[1px] dark:border-dark-border/60 dark:bg-dark-card/70" />
            <div className="absolute -right-4 bottom-10 h-24 w-24 rounded-[1.5rem] border border-light-border/60 bg-light-card/50 dark:border-dark-border/60 dark:bg-dark-card/50" />
          </div>
        </div>
      </div>
    </section>
  );
}