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
interface SideBarProps {
  children: ReactNode;
}

export default function SideBar({ children }: SideBarProps) {
  // Get the state and actions we need from the main layout store
  const isSheetMode = useMainLayoutStore((state) => state.isSheetMode);
  const isSideBarOpen = useMainLayoutStore((state) => state.isSideBarOpen);
  const toggledSideBar = useMainLayoutStore((state) => state.toggledSideBar);

  // On large screens, render the sidebar regularly
  if (!isSheetMode) return <aside className="bg-surface-2 [grid-area:sidebar]">{children}</aside>;

  // On small screens, render the sidebar in a sheet and show the sheet trigger
  return (
    <Sheet open={isSideBarOpen} onOpenChange={toggledSideBar}>
      <SheetTrigger asChild>
        <Button type="button" size="icon" variant="outline" title="Expand SideBar" className="fixed top-1/3 right-0 z-3">
          <Bars4Icon width={36} height={36} />
        </Button>
      </SheetTrigger>
      <SheetContent side={"right"} className="bg-surface-2">
        <SheetHeader className="sr-only">
          <SheetTitle>SideBar</SheetTitle>
          <SheetDescription>SideBar</SheetDescription>
        </SheetHeader>
        <nav className="max-h-[80vh] overflow-y-auto">{children}</nav>
      </SheetContent>
    </Sheet>
  );
}
