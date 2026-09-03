"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext<{
  theme: string | undefined;
  setTheme: (theme: string) => void;
}>({ theme: "dark", setTheme: () => {} });

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}) {
  const [theme, setThemeState] = useState<string | undefined>(undefined);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      setThemeState(saved);
      if (saved === "light") {
        document.documentElement.classList.remove("dark");
      } else {
        document.documentElement.classList.add("dark");
      }
    } else {
      setThemeState("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
