"use client";

// react
import { useState } from "react";

// prisma and db access
import type { ProductFilterData } from "@/features/storefront/db/types";

// other libraries
import { cn } from "@/lib/utils";

// components
import { Popover, PopoverContent } from "@/components/ui/popover";
import Trigger from "./Trigger";
import AppliedFilters from "./AppliedFilters";
import Footer from "./Footer";

// types
interface ProductFilterIndicatorProps {
  productFilterData: ProductFilterData;
  className?: string;
}

export default function ProductFilterIndicator({ productFilterData, className }: ProductFilterIndicatorProps) {
  // The controlled open state of the popover
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Trigger className={className} />
      <PopoverContent className="grid place-items-center gap-4">
        <AppliedFilters productFilterData={productFilterData} />
        <Footer setOpen={setOpen} />
      </PopoverContent>
    </Popover>
  );
}

export function ProductFilterIndicatorSkeleton({ className }: Pick<ProductFilterIndicatorProps, "className">) {
  return <div className={cn("h-12 w-12 animate-pulse rounded-full bg-background", className)} />;
}
