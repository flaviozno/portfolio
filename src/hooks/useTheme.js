import { useEffect, useState } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "light");

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const syncSystemTheme = () => {
      let saved;
      try { saved = localStorage.getItem("portfolio-theme"); } catch { saved = null; }
      if (saved !== "light" && saved !== "dark") setTheme(media.matches ? "dark" : "light");
    };
    media.addEventListener("change", syncSystemTheme);
    return () => media.removeEventListener("change", syncSystemTheme);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#121417" : "#faf9f6");
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    try { localStorage.setItem("portfolio-theme", next); } catch { /* Storage can be unavailable. */ }
    setTheme(next);
  };

  return { theme, toggleTheme };
};

export default useTheme;
