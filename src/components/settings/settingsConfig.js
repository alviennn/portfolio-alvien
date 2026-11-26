import {
  SFBriefcaseFill,
  SFCheckmarkSealFill,
  SFCircleLefthalfFilled,
  SFWrenchFill,
  SFGearshapeFill,
  SFGlobe,
  SFPhoneFill,
  SFSparkles,
  SFSquareGrid2x2Fill,
} from "../icons/AppleIcons";

export const ACCENT_COLORS = [
  { id: "blue", label: "Apple Blue", hex: "#007AFF", soft: "rgba(0, 122, 255, 0.14)" },
  { id: "sage", label: "Sage Green", hex: "#4F7A6B", soft: "rgba(79, 122, 107, 0.16)" },
  { id: "indigo", label: "Indigo", hex: "#5856D6", soft: "rgba(88, 86, 214, 0.15)" },
  { id: "orange", label: "Orange", hex: "#FF9500", soft: "rgba(255, 149, 0, 0.15)" },
  { id: "graphite", label: "Graphite", hex: "#6E6E73", soft: "rgba(110, 110, 115, 0.16)" },
];

/**
 * Approved Apple Settings portfolio menu order:
 * Top Card: overview (Apple Account / Introduction)
 * Group 1: experience -> certifications -> projects
 * Group 2: skills -> workProcess
 * Group 3: contact
 * Group 4: appearance -> language
 *
 * Icons are 1:1 SF Symbol equivalents matching real macOS/iOS Settings.
 * `filled: true` marks these as filled SVG components (no strokeWidth).
 */
export const SETTING_PANES = [
  {
    id: "overview",
    group: "profile",
    icon: SFSparkles,
    gradient: "from-[#38BDF8] to-[#007AFF]",
    filled: true,
  },
  {
    id: "experience",
    group: "portfolio",
    icon: SFBriefcaseFill,
    gradient: "from-[#32ADE6] to-[#007AFF]",
    filled: true,
  },
  {
    id: "certifications",
    group: "portfolio",
    icon: SFCheckmarkSealFill,
    gradient: "from-[#FFD60A] to-[#FF9500]",
    filled: true,
  },
  {
    id: "projects",
    group: "portfolio",
    icon: SFSquareGrid2x2Fill,
    gradient: "from-[#FF9F0A] to-[#FF5E3A]",
    filled: true,
  },
  {
    id: "skills",
    group: "skillsProcess",
    icon: SFWrenchFill,
    gradient: "from-[#34C759] to-[#248A3D]",
    filled: true,
  },
  {
    id: "workProcess",
    group: "skillsProcess",
    icon: SFGearshapeFill,
    gradient: "from-[#AEAEB2] to-[#8E8E93]",
    filled: true,
  },
  {
    id: "contact",
    group: "connect",
    icon: SFPhoneFill,
    gradient: "from-[#30D158] to-[#1F9D55]",
    filled: true,
  },
  {
    id: "appearance",
    group: "preferences",
    icon: SFCircleLefthalfFilled,
    gradient: "from-[#FF375F] to-[#AF52DE]",
    filled: true,
  },
  {
    id: "language",
    group: "preferences",
    icon: SFGlobe,
    gradient: "from-[#5AC8FA] to-[#007AFF]",
    filled: true,
  },
];

export const PANE_MAP = Object.fromEntries(
  SETTING_PANES.map((pane) => [pane.id, pane])
);
