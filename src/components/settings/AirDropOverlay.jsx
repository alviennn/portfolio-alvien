import { useEffect, useState } from "react";
import { Check, Copy, UserPlus, X } from "../icons/AppleIcons";

import { useLanguage } from "../../i18n/LanguageContext";
import heroImage from "../../assets/konten-hero.jpg";
import { useLiveClock } from "./useLiveClock";

/**
 * 1:1 iOS 17 NameDrop overlay.
 *
 * Layout reference (top → bottom):
 *   ┌─────────────────────────────────────────┐
 *   │  Status bar  (time + icons)             │
 *   │  ─ luminous glow ripples ─              │
 *   │  "Sharing with…" status pill            │
 *   │                                         │
 *   │  ┌──────── Contact Poster ────────────┐ │
 *   │  │  full-bleed portrait               │ │
 *   │  │  gradient → name + role at bottom  │ │
 *   │  │  email chip                        │ │
 *   │  └────────────────────────────────────┘ │
 *   │                                         │
 *   │  [ Share  ]   (primary – accent blue)   │
 *   │  [ Receive Only ]   (secondary – glass) │
 *   │                                         │
 *   └─────────────────────────────────────────┘
 *
 * Buttons are full-width stacked capsules below the card, matching the
 * real NameDrop two-button pattern: Share (primary) + Receive Only (secondary).
 */
export default function AirDropOverlay({ contact, onClose }) {
  const { t } = useLanguage();
  const statusTime = useLiveClock("ios");
  const [phase, setPhase] = useState("bringing"); // "bringing" | "ready"
  const [savedVcf, setSavedVcf] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const email = contact?.email || "alvien.rnp@gmail.com";
  const linkedin =
    contact?.linkedin || "https://www.linkedin.com/in/alvienrnp/";
  const github = contact?.github || "https://github.com/alviennn";

  useEffect(() => {
    const timer = window.setTimeout(() => setPhase("ready"), 1050);
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  /* ───── actions ───── */
  const handleSaveVCard = () => {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "N:Pryastika;Alvien Ridho Nanda;;;",
      "FN:Alvien Ridho Nanda Pryastika",
      "TITLE:UI/UX Designer & Frontend Developer",
      `EMAIL;TYPE=INTERNET:${email}`,
      `URL:${window.location.origin}`,
      `X-SOCIALPROFILE;type=linkedin:${linkedin}`,
      `X-SOCIALPROFILE;type=github:${github}`,
      "END:VCARD",
    ].join("\r\n");

    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Alvien-Ridho-Contact.vcf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setSavedVcf(true);
    window.setTimeout(() => setSavedVcf(false), 2200);
  };

  const handleCopyPortfolioLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      window.setTimeout(() => setCopiedLink(false), 2200);
    } catch {
      // Clipboard API blocked — silently ignore
    }
  };

  return (
    <div
      className="apple-os-font fixed inset-0 z-[120] flex flex-col items-center overflow-hidden bg-black select-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="NameDrop Contact Card"
    >
      {/* ── iOS Status Bar ── */}
      <div className="relative z-20 flex h-[54px] w-full shrink-0 items-center justify-between px-6 pt-2 text-[15px] font-semibold text-white">
        <span className="w-14 tabular-nums">{statusTime}</span>
        <div className="h-[27px] w-[98px] rounded-full bg-[#1C1C1E] ring-1 ring-white/10" />
        <div className="flex w-14 items-center justify-end gap-1.5 text-white">
          <svg width="15" height="11" viewBox="0 0 17 12" fill="currentColor" aria-hidden="true">
            <rect x="0" y="9" width="3" height="3" rx="0.5" opacity="0.4" />
            <rect x="4.5" y="6" width="3" height="6" rx="0.5" opacity="0.6" />
            <rect x="9" y="3" width="3" height="9" rx="0.5" opacity="0.8" />
            <rect x="13.5" y="0" width="3" height="12" rx="0.5" />
          </svg>
          <svg width="15" height="11" viewBox="0 0 16 12" fill="currentColor" aria-hidden="true">
            <path d="M8 3.6a5.3 5.3 0 0 1 3.6 1.4l1.1-1.1A6.9 6.9 0 0 0 8 2a6.9 6.9 0 0 0-4.7 1.9l1.1 1.1A5.3 5.3 0 0 1 8 3.6z" opacity="0.5" />
            <path d="M8 6.4c1 0 1.9.4 2.5 1l1.1-1.1A5 5 0 0 0 8 4.8a5 5 0 0 0-3.6 1.5l1.1 1.1c.6-.6 1.5-1 2.5-1z" opacity="0.75" />
            <circle cx="8" cy="9.5" r="1.5" />
          </svg>
          <svg width="22" height="11" viewBox="0 0 25 12" aria-hidden="true">
            <rect x="0" y="1" width="21" height="10" rx="2.5" stroke="currentColor" strokeWidth="1" fill="none" />
            <rect x="21.5" y="4" width="2" height="4" rx="1" fill="currentColor" opacity="0.4" />
            <rect x="1.5" y="2.5" width="18" height="7" rx="1.5" fill="#30D158" />
          </svg>
        </div>
      </div>

      {/* ── Luminous Glow Ripples (top edge) ── */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 z-10 -translate-x-1/2"
        aria-hidden="true"
      >
        <span
          className="airdrop-wave absolute left-1/2 top-0 h-56 w-56 rounded-full border border-sky-400/50 bg-gradient-to-b from-sky-400/30 to-transparent blur-[2px]"
          style={{ animationDelay: "0ms" }}
        />
        <span
          className="airdrop-wave absolute left-1/2 top-0 h-56 w-56 rounded-full border border-emerald-300/40 bg-gradient-to-b from-emerald-400/20 to-transparent blur-[2px]"
          style={{ animationDelay: "650ms" }}
        />
        <span
          className="airdrop-wave absolute left-1/2 top-0 h-56 w-56 rounded-full border border-white/30"
          style={{ animationDelay: "1300ms" }}
        />
        <div className="h-28 w-80 rounded-full bg-gradient-to-b from-sky-400/40 via-emerald-400/15 to-transparent blur-3xl" />
      </div>

      {/* ── Close Button (top-right) ── */}
      <button
        type="button"
        onClick={onClose}
        aria-label={t("common.close")}
        className="absolute right-5 top-14 z-30 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white/15 text-white/90 backdrop-blur-md transition-colors hover:bg-white/25 active:scale-95"
      >
        <X size={15} strokeWidth={2.5} />
      </button>

      {/* ── Scrollable Body ── */}
      <div
        className="relative z-10 flex flex-1 flex-col items-center justify-center gap-5 px-5 pb-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Status Pill */}
        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-4 py-1.5 text-[13px] font-medium text-white/95 backdrop-blur-xl">
          <span
            className={`inline-block h-2 w-2 rounded-full ${
              phase === "bringing"
                ? "animate-pulse bg-sky-400"
                : "bg-[#30D158]"
            }`}
          />
          <span>
            {phase === "bringing"
              ? t("settings.airdrop.bringingTogether")
              : `${t("settings.airdrop.title")} • ${t(
                  "settings.airdrop.connected"
                )}`}
          </span>
        </div>

        {/* ── Contact Poster Card ── */}
        <div className="airdrop-card-in w-full max-w-[320px] overflow-hidden rounded-[32px] bg-[#1C1C1E] shadow-[0_30px_100px_rgba(0,0,0,0.75)] ring-1 ring-white/15">
          {/* Portrait Area */}
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <img
              src={heroImage}
              alt="Alvien Ridho Nanda Pryastika"
              className="h-full w-full object-cover object-[center_18%]"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1E] via-[#1C1C1E]/30 to-black/10" />

            {/* Name + role at poster bottom */}
            <div className="absolute inset-x-0 bottom-0 px-6 pb-5 text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-2.5 py-[3px] text-[10px] font-semibold uppercase tracking-[0.06em] text-white/90 backdrop-blur-md">
                <span className="h-[5px] w-[5px] rounded-full bg-[#30D158]" />
                {t("settings.statusAvailable")}
              </span>

              <h2 className="mt-2.5 text-[28px] font-bold leading-none tracking-[-0.02em] text-white drop-shadow-lg">
                Alvien Ridho
              </h2>
              <p className="mt-1 text-[13px] font-medium text-white/75">
                {t("settings.airdrop.shareSubtitle")}
              </p>
            </div>
          </div>

          {/* Email chip */}
          <div className="bg-[#1C1C1E] px-5 pt-2 pb-4">
            <div className="rounded-[10px] bg-white/[0.06] px-3.5 py-2 text-center text-[12.5px] text-white/70">
              {email}
            </div>
          </div>
        </div>

        {/* ── Action Buttons (NameDrop pattern: Share + Receive Only) ── */}
        <div className="flex w-full max-w-[320px] flex-col gap-2.5">
          {/* Primary: "Share" → saves VCF contact */}
          <button
            type="button"
            onClick={handleSaveVCard}
            className="flex h-[50px] w-full items-center justify-center gap-2 rounded-full bg-[#0A84FF] text-[16px] font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-[#409CFF] active:scale-[0.98]"
          >
            {savedVcf ? (
              <>
                <Check size={18} strokeWidth={2.5} />
                <span>{t("settings.airdrop.savedContact")}</span>
              </>
            ) : (
              <>
                <UserPlus size={18} strokeWidth={2} />
                <span>{t("settings.airdrop.saveContact")}</span>
              </>
            )}
          </button>

          {/* Secondary: "Receive Only" → copies portfolio link */}
          <button
            type="button"
            onClick={handleCopyPortfolioLink}
            className="flex h-[50px] w-full items-center justify-center gap-2 rounded-full bg-white/[0.1] text-[16px] font-semibold text-white backdrop-blur-md transition-all hover:bg-white/[0.16] active:scale-[0.98]"
          >
            {copiedLink ? (
              <>
                <Check size={18} strokeWidth={2.5} className="text-[#30D158]" />
                <span>{t("settings.airdrop.copiedLink")}</span>
              </>
            ) : (
              <>
                <Copy size={16} strokeWidth={2} />
                <span>{t("settings.airdrop.copyLink")}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Home Indicator ── */}
      <div className="absolute bottom-2 left-1/2 z-20 h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-white/40" />
    </div>
  );
}
