import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext =
  createContext(null);

const STORAGE_KEY =
  "alvien-portfolio-theme";

function getInitialTheme() {
  if (
    typeof window ===
    "undefined"
  ) {
    return "light";
  }

  const saved =
    localStorage.getItem(
      STORAGE_KEY
    );

  if (
    saved === "dark" ||
    saved === "light"
  ) {
    return saved;
  }

  return window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches
    ? "dark"
    : "light";
}

export function ThemeProvider({
  children,
}) {
  const [theme, setTheme] =
    useState(
      getInitialTheme
    );

  useEffect(() => {
    const root =
      document.documentElement;

    root.classList.remove(
      "light",
      "dark"
    );

    root.classList.add(
      theme
    );

    localStorage.setItem(
      STORAGE_KEY,
      theme
    );
  }, [theme]);

  useEffect(() => {
    const media =
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      );

    const handleChange =
      (e) => {
        const stored =
          localStorage.getItem(
            STORAGE_KEY
          );

        if (!stored) {
          setTheme(
            e.matches
              ? "dark"
              : "light"
          );
        }
      };

    media.addEventListener(
      "change",
      handleChange
    );

    return () => {
      media.removeEventListener(
        "change",
        handleChange
      );
    };
  }, []);

  const toggleTheme =
    () => {
      setTheme(
        (prev) =>
          prev === "dark"
            ? "light"
            : "dark"
      );
    };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        isDark:
          theme ===
          "dark",
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context =
    useContext(
      ThemeContext
    );

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
}