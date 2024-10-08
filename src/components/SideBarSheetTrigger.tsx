"use client";

// react
import { useState } from "react";

// next
import { usePathname } from "next/navigation";

// prisma and db access
import { ProductFilterData } from "@/features/storefront/db/types";

// other libraries
import { cn } from "@/lib/utils";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import PathFinder from "@/lib/PathFinder";

// components
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import SideBar from "@/components/SideBar";

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
  if (!PathFinder.isBunchOfProducts(pathname)) return null;

  return (
    !isLarge && (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className={cn("btn btn-circle btn-ghost", className)}>
          <AdjustmentsHorizontalIcon width={24} height={24} />
        </SheetTrigger>
        <SheetContent className="bg-[--surface-2]">
          <SheetHeader className="sr-only">
            <SheetTitle>SideBar</SheetTitle>
            <SheetDescription>SideBar</SheetDescription>
          </SheetHeader>
          <div className="max-h-[80vh] overflow-y-auto">
            <SideBar productFilterData={productFilterData} filteredCount={filteredCount} sheetMode={true} sheetSetOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
    )
  );
}

export function SideBarSheetTriggerSkeleton({ className }: Pick<SideBarSheetTriggerProps, "className">) {
  return <div className={cn("skeleton h-12 w-12 rounded-full", className)} />;
}
