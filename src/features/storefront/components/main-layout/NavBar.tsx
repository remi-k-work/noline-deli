"use client";

// react
import { ReactNode } from "react";

// other libraries
import { useMainLayoutStore } from "@/features/storefront/stores/mainLayoutProvider";

// components
import { Button } from "@/components/ui/custom/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

// assets
import { Bars4Icon } from "@heroicons/react/24/solid";

// types
interface NavBarProps {
  children: ReactNode;
}

export default function NavBar({ children }: NavBarProps) {
  // Get the state and actions we need from the main layout store
  const isSheetMode = useMainLayoutStore((state) => state.isSheetMode);
  const isNavBarOpen = useMainLayoutStore((state) => state.isNavBarOpen);
  const toggledNavBar = useMainLayoutStore((state) => state.toggledNavBar);

  // On large screens, render the navbar regularly
  if (!isSheetMode) return <nav className="bg-surface-2 [grid-area:navbar]">{children}</nav>;

  // On small screens, render the navbar in a sheet and show the sheet trigger
  return (
    <Sheet open={isNavBarOpen} onOpenChange={toggledNavBar}>
      <SheetTrigger asChild>
        <Button type="button" size="icon" variant="outline" title="Expand Menu" className="fixed top-1/3 left-0 z-3">
          <Bars4Icon width={36} height={36} />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="bg-surface-2">
        <SheetHeader className="sr-only">
          <SheetTitle>NavBar</SheetTitle>
          <SheetDescription>NavBar</SheetDescription>
        </SheetHeader>
        <nav className="max-h-[80vh] overflow-y-auto">{children}</nav>
      </SheetContent>
    </Sheet>
  );
}
