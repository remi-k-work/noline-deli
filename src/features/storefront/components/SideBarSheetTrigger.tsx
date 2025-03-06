"use client";

// react
import { useState } from "react";

// next
import { usePathname } from "next/navigation";

// prisma and db access
import type { ProductFilterData } from "@/features/storefront/db/types";

// other libraries
import { cn } from "@/lib/utils";
import useMediaQuery from "@/hooks/useMediaQuery";
import PathFinder from "@/lib/PathFinder";

// components
import { Button } from "@/components/ui/custom/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import SideBar from "./SideBar";

// assets
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";

// types
interface SideBarSheetTriggerProps {
  productFilterData: ProductFilterData;
  filteredCount?: number;
  className?: string;
}

export default function SideBarSheetTrigger({ productFilterData, filteredCount, className }: SideBarSheetTriggerProps) {
  // Large screens
  const isLarge = useMediaQuery("(min-width: 1024px)");

  // The controlled open state of the sheet
  const [open, setOpen] = useState(false);

  // Show a product filter only when displaying a bunch of products
  const pathname = usePathname();
  if (!PathFinder.isBunchOfProducts(pathname) || isLarge) return null;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className={className} asChild>
        <Button type="button" size="icon" variant="ghost" title="Filter Products">
          <AdjustmentsHorizontalIcon width={36} height={36} />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-(--surface-2)">
        <SheetHeader className="sr-only">
          <SheetTitle>SideBar</SheetTitle>
          <SheetDescription>SideBar</SheetDescription>
        </SheetHeader>
        <div className="max-h-[80vh] overflow-y-auto">
          <SideBar productFilterData={productFilterData} filteredCount={filteredCount} sheetMode={true} sheetSetOpen={setOpen} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function SideBarSheetTriggerSkeleton({ className }: Pick<SideBarSheetTriggerProps, "className">) {
  return <div className={cn("h-12 w-12 animate-pulse rounded-full bg-background", className)} />;
}
