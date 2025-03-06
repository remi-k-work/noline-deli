"use client";

// prisma and db access
import type { CategoriesTreeViewData } from "@/features/storefront/db/types";

// other libraries
import { cn } from "@/lib/utils";
import useMediaQuery from "@/hooks/useMediaQuery";

// components
import { Button } from "@/components/ui/custom/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import NavBar from "./NavBar";

// assets
import { Bars4Icon } from "@heroicons/react/24/solid";

// types
interface NavBarSheetTriggerProps {
  categoriesTreeViewData: CategoriesTreeViewData;
  className?: string;
}

export default function NavBarSheetTrigger({ categoriesTreeViewData, className }: NavBarSheetTriggerProps) {
  // Large screens
  const isLarge = useMediaQuery("(min-width: 1024px)");

  // Do not show the navbar sheet trigger on large screens
  if (isLarge) return null;

  return (
    <Sheet>
      <SheetTrigger className={className} asChild>
        <Button type="button" size="icon" variant="ghost" title="Browse by Category">
          <Bars4Icon width={36} height={36} />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="bg-(--surface-2)">
        <SheetHeader className="sr-only">
          <SheetTitle>NavBar</SheetTitle>
          <SheetDescription>NavBar</SheetDescription>
        </SheetHeader>
        <div className="max-h-[80vh] overflow-y-auto">
          <NavBar categoriesTreeViewData={categoriesTreeViewData} sheetMode={true} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function NavBarSheetTriggerSkeleton({ className }: Pick<NavBarSheetTriggerProps, "className">) {
  return <div className={cn("h-12 w-12 animate-pulse rounded-full bg-background", className)} />;
}
