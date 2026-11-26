import { useEffect, useState } from "react";

/**
 * Shared live-clock hook used by macOS menu bar and iOS/iPadOS status bars.
 *
 * @param {"mac" | "ios"} variant
 *   - "mac"  → "Wed Nov 26, 10:18 AM"  (macOS menu bar format)
 *   - "ios"  → "10:18"                  (iOS/iPadOS status bar – h:mm, no AM/PM)
 * @returns {string} Formatted current time string, updated every 30 s.
 */
export function useLiveClock(variant = "mac") {
  const format = (date) => {
    if (variant === "ios") {
      // iOS status bar shows bare h:mm (no AM/PM)
      const h = date.getHours();
      const m = String(date.getMinutes()).padStart(2, "0");
      return `${h}:${m}`;
    }
    // macOS menu bar: "Wed Nov 26, 10:18 AM"
    return date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const [label, setLabel] = useState(() => format(new Date()));

  useEffect(() => {
    const tick = () => setLabel(format(new Date()));
    const id = window.setInterval(tick, 30_000);
    // Align first tick so minute transitions aren't late
    tick();
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant]);

  return label;
}

/**
 * Returns the current date formatted for iPadOS status bar: "Thu Nov 26"
 * Updates every 60 s.
 */
export function useLiveDate() {
  const format = (date) =>
    date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

  const [label, setLabel] = useState(() => format(new Date()));

  useEffect(() => {
    const tick = () => setLabel(format(new Date()));
    const id = window.setInterval(tick, 60_000);
    tick();
    return () => window.clearInterval(id);
  }, []);

  return label;
}
