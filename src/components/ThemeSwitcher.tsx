"use client";

// component css styles
import styles from "./ThemeSwitcher.module.css";

// other libraries
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import useDarkMode from "@/lib/useDarkMode";

const DARK_THEME_ALIAS = "coffee";
const LIGHT_THEME_ALIAS = "retro";

export default function ThemeSwitcher() {
  const { isDarkMode, toggle } = useDarkMode(DARK_THEME_ALIAS, LIGHT_THEME_ALIAS);

  return (
    <section className={styles["theme-switcher"]}>
      <button type="button" className="btn btn-circle btn-ghost" onClick={toggle}>
        {isDarkMode !== undefined && (isDarkMode ? <SunIcon width={24} height={24} /> : <MoonIcon width={24} height={24} />)}
      </button>
    </section>
  );
}

export function ThemeSwitcherSkeleton() {
  return (
    <section className={styles["theme-switcher-skeleton"]}>
      <button type="button" className="btn btn-circle btn-ghost" disabled={true}>
        &nbsp;
      </button>
    </section>
  );
}
