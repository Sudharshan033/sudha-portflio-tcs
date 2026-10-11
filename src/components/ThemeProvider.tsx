"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext<{
  theme: string | undefined;
  setTheme: (theme: string) => void;
}>({ theme: "dark", setTheme: () => {} });

/* Applies the theme to <html>: data-theme attribute (CSS) + .dark/.light
   classes (Tailwind dark: variant). */
function applyTheme(t: string) {
  const root = document.documentElement;
  root.setAttribute("data-theme", t);
  root.classList.toggle("dark", t === "dark");
  root.classList.toggle("light", t === "light");
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<string | undefined>(undefined);

  useEffect(() => {
    /* saved choice wins; otherwise respect prefers-color-scheme */
    const saved = localStorage.getItem("theme");
    const initial =
      saved ??
      (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    applyTheme(initial);
    setThemeState(initial);
  }, []);

  const setTheme = (newTheme: string) => {
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
