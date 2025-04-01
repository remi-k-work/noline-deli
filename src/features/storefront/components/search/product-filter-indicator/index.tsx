"use client";

// react
import { useState } from "react";

// prisma and db access
import type { ProductFilterData } from "@/features/storefront/db/types";

// components
import { Popover, PopoverContent } from "@/components/ui/popover";
import Trigger from "./Trigger";
import AppliedFilters from "./AppliedFilters";
import Footer from "./Footer";

// types
interface ProductFilterIndicatorProps {
  productFilterData: ProductFilterData;
}

export default function ProductFilterIndicator({ productFilterData }: ProductFilterIndicatorProps) {
  // The controlled open state of the popover
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Trigger className="[place-self:center_end] [grid-area:prfi]" />
      <PopoverContent className="grid place-items-center gap-4">
        <AppliedFilters productFilterData={productFilterData} />
        <Footer setOpen={setOpen} />
      </PopoverContent>
    </Popover>
  );
}

export function ProductFilterIndicatorSkeleton() {
  return <div className="bg-background h-12 w-12 animate-pulse [place-self:center_end] rounded-full [grid-area:prfi]" />;
}
