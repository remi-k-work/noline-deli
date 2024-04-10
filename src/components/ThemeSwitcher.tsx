"use client";

// component css styles
import styles from "./ThemeSwitcher.module.css";

// react
import { useEffect, useState } from "react";

// other libraries
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export default function ThemeSwitcher() {
  const darkThemeAlias = "coffee";
  const lightThemeAlias = "retro";

  const [theme, setTheme] = useState<string>("");

  useEffect(() => {
    const loadedTheme = loadTheme();
    document.documentElement.setAttribute("data-theme", loadedTheme);
    setTheme(loadedTheme);
  }, []);

  function loadTheme() {
    // The component is rendering on the client side
    if (typeof window !== "undefined") {
      const loadedTheme = localStorage.getItem("theme");
      if (loadedTheme) {
        return loadedTheme;
      }

      // We will try to figure out whether or not the user prefers the dark mode
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      if (prefersDark) {
        return darkThemeAlias;
      }
    }
    return lightThemeAlias;
  }

  function saveTheme(theme: typeof darkThemeAlias | typeof lightThemeAlias) {
    // The component is rendering on the client side
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
      setTheme(theme);
    }
  }

  return (
    <section className={styles["theme-switcher"]}>
      <button type="button" className="btn btn-circle btn-ghost" onClick={() => saveTheme(theme === lightThemeAlias ? darkThemeAlias : lightThemeAlias)}>
        {theme && (theme === darkThemeAlias ? <SunIcon width={24} height={24} /> : <MoonIcon width={24} height={24} />)}
      </button>
    </section>
  );
}
