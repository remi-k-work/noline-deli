"use client";

// other libraries
import useDarkMode from "@/hooks/useDarkMode";

// components
import { Button } from "@/components/ui/custom/button";

// assets
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

const DARK_THEME_ALIAS = "dark";
const LIGHT_THEME_ALIAS = "light";

export default function ThemeSwitcher() {
  const { isDarkMode, toggle } = useDarkMode(DARK_THEME_ALIAS, LIGHT_THEME_ALIAS);

  return (
    <Button type="button" size="icon" variant="ghost" className="[place-self:center_end] [grid-area:thsw]" title="Switch Theme" onClick={toggle}>
      {isDarkMode !== undefined && (isDarkMode ? <SunIcon width={36} height={36} /> : <MoonIcon width={36} height={36} />)}
    </Button>
  );
}

export function ThemeSwitcherSkeleton() {
  return <div className="bg-background h-12 w-12 animate-pulse [place-self:center_end] rounded-full [grid-area:thsw]" />;
}
