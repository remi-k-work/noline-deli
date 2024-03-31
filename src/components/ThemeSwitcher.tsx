"use client";

// component css styles
import styles from "./ThemeSwitcher.module.css";

// react
import { useEffect, useState } from "react";

// other libraries
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export default function ThemeSwitcher() {
  const darkThemeAlias: string = "coffee";
  const lightThemeAlias: string = "retro";

  const [theme, setTheme] = useState<string>("");

  useEffect(() => {
    // We will try to figure out whether or not the user prefers the dark mode
    let prefersDark: boolean = false;

    // Ensure client-side code executes only when the window object is defined
    if (typeof window !== "undefined") {
      // This allows us to securely handle the "window is not defined" error in react and next.js
      // (preventing any issues during server-side rendering)
      prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      setTheme(prefersDark ? darkThemeAlias : lightThemeAlias);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <section className={styles["theme-switcher"]}>
      <button type="button" className="btn btn-square btn-ghost" onClick={() => setTheme(theme === lightThemeAlias ? darkThemeAlias : lightThemeAlias)}>
        {theme === darkThemeAlias ? <SunIcon width={24} height={24} /> : <MoonIcon width={24} height={24} />}
      </button>
    </section>
  );
}
