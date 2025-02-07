"use client";

// prisma and db access
import { CategoriesTreeViewData } from "@/features/storefront/db/types";

// other libraries
import { cn } from "@/lib/utils";
import useMediaQuery from "@/hooks/useMediaQuery";

// components
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

  return (
    !isLarge && (
      <Sheet>
        <SheetTrigger className={cn("btn btn-circle btn-ghost", className)}>
          <Bars4Icon width={24} height={24} />
        </SheetTrigger>
        <SheetContent side={"left"} className="bg-[--surface-2]">
          <SheetHeader className="sr-only">
            <SheetTitle>NavBar</SheetTitle>
            <SheetDescription>NavBar</SheetDescription>
          </SheetHeader>
          <div className="max-h-[80vh] overflow-y-auto">
            <NavBar categoriesTreeViewData={categoriesTreeViewData} sheetMode={true} />
          </div>
        </SheetContent>
      </Sheet>
    )
  );
}

export function NavBarSheetTriggerSkeleton({ className }: Pick<NavBarSheetTriggerProps, "className">) {
  return <div className={cn("skeleton h-12 w-12 rounded-full", className)} />;
}
