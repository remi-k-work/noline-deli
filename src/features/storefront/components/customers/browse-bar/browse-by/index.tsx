"use client";

// component css styles
import styles from "./index.module.css";

// react
import { useState } from "react";

// other libraries
import { useInstanceContext } from "@/features/storefront/stores/customers/orders-table";

// components
import { Badge } from "@/components/ui/custom/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import ByContext from "./ByContext";
import AllOrders from "./AllOrders";
import ByDate from "./ByDate";
import ByCustomDate from "./ByCustomDate";
import ByShipping from "./ByShipping";
import ByStatus from "./ByStatus";
import ByBrand from "./ByBrand";

export default function BrowseBy() {
  const {
    state: { totalItems },
  } = useInstanceContext();

  // The controlled open state of the drop-down menu
  const [open, setOpen] = useState(false);

  return (
    <section className={styles["browse-by"]}>
      <header>
        <Badge className="w-fit text-base">{totalItems}</Badge>
      </header>
      <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
        <DropdownMenuTrigger className={styles["browse-by__context"]}>
          <Tooltip>
            <TooltipTrigger asChild>
              <ByContext />
            </TooltipTrigger>
            <TooltipContent>
              <p>Browse orders</p>
            </TooltipContent>
          </Tooltip>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" alignOffset={-36} className={styles["browse-by__dropdown-content"]}>
          <AllOrders setOpen={setOpen} />
          <ByDate setOpen={setOpen} />
          <ByCustomDate setOpen={setOpen} />
          <ByShipping setOpen={setOpen} />
          <ByStatus setOpen={setOpen} />
          <ByBrand setOpen={setOpen} />
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
}

export function BrowseBySkeleton() {
  return <div className="bg-foreground h-11 max-w-(--size-content-2) animate-pulse rounded-2xl [grid-area:bsc]"></div>;
}
