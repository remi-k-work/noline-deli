"use client";

// other libraries
import { cn } from "@/lib/utils";
import useDarkMode from "@/hooks/useDarkMode";

// components
import { Button } from "@/components/ui/custom/button";

// assets
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

// types
interface ThemeSwitcherProps {
  className?: string;
}

const DARK_THEME_ALIAS = "coffee";
const LIGHT_THEME_ALIAS = "retro";

export default function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const { isDarkMode, toggle } = useDarkMode(DARK_THEME_ALIAS, LIGHT_THEME_ALIAS);

  return (
    <Button type="button" size="icon" variant="ghost" className={className} title="Switch Theme" onClick={toggle}>
      {isDarkMode !== undefined && (isDarkMode ? <SunIcon width={36} height={36} /> : <MoonIcon width={36} height={36} />)}
    </Button>
  );
}

export function ThemeSwitcherSkeleton({ className }: ThemeSwitcherProps) {
  return <div className={cn("h-12 w-12 animate-pulse rounded-full bg-background", className)} />;
}
