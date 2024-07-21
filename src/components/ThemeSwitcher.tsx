"use client";

// other libraries
import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import useDarkMode from "@/lib/useDarkMode";

// types
interface ThemeSwitcherProps {
  className?: string;
}

const DARK_THEME_ALIAS = "coffee";
const LIGHT_THEME_ALIAS = "retro";

export default function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const { isDarkMode, toggle } = useDarkMode(DARK_THEME_ALIAS, LIGHT_THEME_ALIAS);

  return (
    <button type="button" className={cn("btn btn-circle btn-ghost", className)} title={"Switch Theme"} onClick={toggle}>
      {isDarkMode !== undefined && (isDarkMode ? <SunIcon width={24} height={24} /> : <MoonIcon width={24} height={24} />)}
    </button>
  );
}

export function ThemeSwitcherSkeleton({ className }: ThemeSwitcherProps) {
  return <div className={cn("skeleton h-12 w-12 rounded-full", className)} />;
}
