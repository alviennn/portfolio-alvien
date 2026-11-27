import { Children } from "react";
import { ChevronRight, Search, X } from "../icons/AppleIcons";

/**
 * Apple-style squircle icon badge (macOS 20px, iOS/iPadOS 29px).
 */
export function SettingSquircleIcon({
  icon: Icon,
  gradient = "from-[#007AFF] to-[#0051D5]",
  size = "md",
  filled = false,
}) {
  const sizeClasses = {
    xs: "h-[20px] w-[20px] rounded-[5px]",
    sm: "h-[24px] w-[24px] rounded-[6px]",
    md: "h-[29px] w-[29px] rounded-[7px]",
    lg: "h-[34px] w-[34px] rounded-[8px]",
  }[size];

  const iconSize = size === "xs" ? 12 : size === "sm" ? 13 : size === "lg" ? 18 : 16;

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center bg-gradient-to-b ${gradient} text-white shadow-[inset_0_0.5px_0_rgba(255,255,255,0.32),0_1px_1.5px_rgba(0,0,0,0.12)] ${sizeClasses}`}
    >
      {filled ? (
        <Icon size={iconSize} className="text-white" />
      ) : (
        <Icon size={iconSize} strokeWidth={2.1} aria-hidden="true" />
      )}
    </span>
  );
}

/**
 * 1:1 iOS 18 / macOS Sequoia Toggle Switch (51x31px iOS standard, compact on macOS).
 */
export function IOSSwitch({ checked, onChange, ariaLabel, compact = false }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={(e) => {
        e.stopPropagation();
        onChange(!checked);
      }}
      className={`relative inline-flex shrink-0 cursor-pointer items-center rounded-full p-[2px] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--apple-accent)] ${
        compact ? "h-[22px] w-[38px]" : "h-[31px] w-[51px]"
      } ${checked ? "bg-[#34C759]" : "bg-[#E9E9EA] dark:bg-[#39393D]"}`}
    >
      <span
        className={`pointer-events-none inline-block rounded-full bg-white shadow-[0_2px_4px_rgba(0,0,0,0.22),0_0_1px_rgba(0,0,0,0.1)] transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          compact
            ? `h-[18px] w-[18px] ${checked ? "translate-x-[16px]" : "translate-x-0"}`
            : `h-[27px] w-[27px] ${checked ? "translate-x-[20px]" : "translate-x-0"}`
        }`}
      />
    </button>
  );
}

/**
 * Grouped inset card container matching Apple Settings.
 * Supports authentic indented hairline dividers (starts after icon on iOS/macOS).
 */
export function SettingsGroup({
  title,
  footer,
  children,
  className = "",
  variant = "ios",
}) {
  const items = Children.toArray(children).filter(Boolean);

  return (
    <section className={`space-y-1.5 ${className}`}>
      {title && (
        <h3
          className={`px-4 ${
            variant === "mac"
              ? "text-[12px] font-semibold text-[#6E6E73] dark:text-[#98989D]"
              : "text-[12.5px] font-normal uppercase tracking-[0.02em] text-[#6D6D72] dark:text-[#8E8E93]"
          }`}
        >
          {title}
        </h3>
      )}

      <div className="overflow-hidden rounded-[12px] border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#1C1C1E] lg:rounded-[10px] lg:dark:bg-[#272729]">
        {items.map((child, idx) => (
          <div key={child.key ?? idx}>
            {idx > 0 && (
              <div className="ml-[16px] h-[0.5px] bg-black/[0.1] dark:bg-white/[0.1]" />
            )}
            {child}
          </div>
        ))}
      </div>

      {footer && (
        <p className="px-4 text-[12px] leading-[1.4] text-[#6D6D72] dark:text-[#8E8E93]">
          {footer}
        </p>
      )}
    </section>
  );
}

/**
 * Authentic Settings Group specifically for icon-led navigation rows (divider indented past squircle icon).
 */
export function SettingsNavGroup({ title, footer, children, className = "" }) {
  const items = Children.toArray(children).filter(Boolean);

  return (
    <section className={`space-y-1.5 ${className}`}>
      {title && (
        <h3 className="px-4 text-[12.5px] font-normal uppercase tracking-[0.02em] text-[#6D6D72] dark:text-[#8E8E93]">
          {title}
        </h3>
      )}

      <div className="overflow-hidden rounded-[12px] bg-white dark:bg-[#1C1C1E]">
        {items.map((child, idx) => (
          <div key={child.key ?? idx}>
            {idx > 0 && (
              <div className="ml-[57px] h-[0.5px] bg-[#C6C6C8]/75 dark:bg-[#38383A]" />
            )}
            {child}
          </div>
        ))}
      </div>

      {footer && (
        <p className="px-4 text-[12px] leading-[1.4] text-[#6D6D72] dark:text-[#8E8E93]">
          {footer}
        </p>
      )}
    </section>
  );
}

/**
 * Single row inside a SettingsGroup / SettingsNavGroup.
 */
export function SettingsRow({
  icon,
  leadingIcon,
  gradient,
  filled = false,
  title,
  subtitle,
  value,
  allowValueWrap = false,
  badge,
  chevron = false,
  onClick,
  trailing,
  href,
  target,
  rel,
  className = "",
}) {
  const content = (
    <div
      className={`flex min-h-[44px] w-full items-center justify-between gap-3 px-4 py-2 text-left transition-colors ${
        onClick || href
          ? "cursor-pointer hover:bg-black/[0.025] active:bg-[#D1D1D6]/60 dark:hover:bg-white/[0.03] dark:active:bg-[#2C2C2E]"
          : ""
      } ${className}`}
    >
      <div className="flex min-w-0 items-center gap-3.5">
        {leadingIcon
          ? leadingIcon
          : icon && <SettingSquircleIcon icon={icon} gradient={gradient} filled={filled} />}
        <div className="min-w-0">
          <div className="truncate text-[15px] font-normal leading-snug text-[#000000] dark:text-[#FFFFFF] lg:text-[13.5px]">
            {title}
          </div>
          {subtitle && (
            <div className="truncate text-[12px] leading-snug text-[#8E8E93]">
              {subtitle}
            </div>
          )}
        </div>
      </div>

      <div
        className={`flex items-center gap-2 ${
          allowValueWrap ? "max-w-[65%] sm:max-w-none shrink" : "shrink-0"
        }`}
      >
        {value && (
          <span
            className={
              allowValueWrap
                ? "text-right text-[14px] leading-snug text-[#8E8E93] lg:text-[13px]"
                : "max-w-[165px] truncate text-[14.5px] text-[#8E8E93] lg:text-[13px]"
            }
          >
            {value}
          </span>
        )}
        {badge !== undefined && badge !== null && badge !== "" && (
          <span className="inline-flex min-w-[20px] items-center justify-center rounded-full bg-[#8E8E93]/15 px-1.5 py-0.5 text-[12px] font-medium text-[#6E6E73] dark:bg-white/[0.14] dark:text-[#D1D1D6]">
            {badge}
          </span>
        )}
        {trailing}
        {chevron && (
          <ChevronRight
            size={17}
            strokeWidth={2.2}
            className="text-[#C7C7CC] dark:text-[#48484A]"
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className="block">
        {content}
      </a>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className="block w-full">
        {content}
      </button>
    );
  }

  return content;
}

/**
 * Sidebar navigation item for macOS System Settings & iPadOS Settings.
 */
export function SidebarNavItem({
  icon,
  gradient,
  filled = false,
  label,
  active,
  badge,
  onClick,
  variant = "mac",
}) {
  if (variant === "mac") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-current={active ? "page" : undefined}
        className={`flex h-[28px] w-full items-center justify-between gap-2 rounded-[6px] px-2 text-left text-[13px] transition-colors ${
          active
            ? "bg-[var(--apple-accent)] font-medium text-white"
            : "font-normal text-[#1D1D1F] hover:bg-black/[0.045] dark:text-[#F5F5F7] dark:hover:bg-white/[0.06]"
        }`}
      >
        <span className="flex min-w-0 items-center gap-2">
          <SettingSquircleIcon icon={icon} gradient={gradient} size="xs" filled={filled} />
          <span className="truncate">{label}</span>
        </span>

        {badge !== undefined && badge !== null && (
          <span
            className={`text-[11px] font-medium ${
              active ? "text-white/85" : "text-[#8E8E93]"
            }`}
          >
            {badge}
          </span>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`flex min-h-[42px] w-full items-center justify-between gap-2.5 rounded-[10px] px-2.5 py-1.5 text-left text-[15px] transition-colors ${
        active
          ? "bg-[var(--apple-accent)] font-medium text-white"
          : "font-normal text-[#000000] hover:bg-black/[0.03] dark:text-[#FFFFFF] dark:hover:bg-white/[0.05]"
      }`}
    >
      <span className="flex min-w-0 items-center gap-3">
        <SettingSquircleIcon icon={icon} gradient={gradient} size="md" filled={filled} />
        <span className="truncate">{label}</span>
      </span>

      {badge !== undefined && badge !== null && (
        <span
          className={`text-[13px] ${
            active ? "text-white/85" : "text-[#8E8E93]"
          }`}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

/**
 * Authentic iOS / iPadOS Status Bar Icons (Signal, WiFi, Battery).
 */
export function AppleBatteryIcon({ level = 100 }) {
  return (
    <span className="inline-flex items-center gap-[1.5px]" aria-hidden="true">
      <span className="relative flex h-[11.5px] w-[23px] items-center rounded-[3.2px] border border-current/45 p-[1.5px]">
        <span
          className="h-full rounded-[1.5px] bg-current"
          style={{ width: `${level}%` }}
        />
      </span>
      <span className="h-[4px] w-[1.5px] rounded-r-[1px] bg-current/50" />
    </span>
  );
}

export function AppleSignalIcon() {
  return (
    <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor" aria-hidden="true">
      <rect x="0.5" y="7.5" width="2.5" height="3" rx="0.8" />
      <rect x="4.5" y="5.5" width="2.5" height="5" rx="0.8" />
      <rect x="8.5" y="3" width="2.5" height="7.5" rx="0.8" />
      <rect x="12.5" y="0.5" width="2.5" height="10" rx="0.8" />
    </svg>
  );
}

/**
 * iOS 26 / iPadOS 26 / macOS Tahoe floating Liquid Glass bottom search capsule.
 */
export function LiquidGlassSearchBar({
  value,
  onChange,
  onClear,
  placeholder,
  inputRef,
  compact = false,
  className = "",
}) {
  return (
    <div
      className={`apple-liquid-glass-search relative flex items-center ${
        compact ? "h-[34px] px-3" : "h-[44px] px-4"
      } ${className}`}
    >
      <Search
        size={compact ? 14 : 17}
        strokeWidth={2.1}
        className="shrink-0 text-[#6E6E73] dark:text-[#AEAEB2]"
        aria-hidden="true"
      />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-transparent text-[#000000] placeholder-[#6E6E73]/90 outline-none dark:text-[#FFFFFF] dark:placeholder-[#AEAEB2]/80 ${
          compact ? "pl-2 pr-5 text-[13px]" : "pl-2.5 pr-6 text-[16px]"
        }`}
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className={`flex shrink-0 items-center justify-center rounded-full bg-black/15 text-[#1D1D1F] transition-colors hover:bg-black/25 dark:bg-white/20 dark:text-white dark:hover:bg-white/30 ${
            compact ? "h-4 w-4" : "h-5 w-5"
          }`}
        >
          <X size={compact ? 10 : 12} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}
