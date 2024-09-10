"use client";

// component css styles
import styles from "./index.module.css";

// react
import { useState } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { useTanTableInstanceContext } from "../../../stores/tan-table-instance";

// components
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import ByContext from "./ByContext";
import AllOrders from "./AllOrders";
import ByDate from "./ByDate";
import ByCustomDate from "./ByCustomDate";
import ByCustomer from "./ByCustomer";
import ByShipping from "./ByShipping";
import ByStatus from "./ByStatus";
import ByBrand from "./ByBrand";

// types
interface BrowseByProps {
  className?: string;
}

export default function BrowseBy({ className }: BrowseByProps) {
  const {
    tableState: { totalItems },
  } = useTanTableInstanceContext();

  // The controlled open state of the drop-down menu
  const [open, setOpen] = useState(false);

  return (
    <section className={cn(styles["browse-by"], className)}>
      <header className={styles["browse-by__total"]}>
        <span className="badge badge-info">{totalItems}</span>
      </header>
      <DropdownMenu open={open} onOpenChange={setOpen}>
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
        <DropdownMenuContent align="start" className={styles["browse-by__dropdown-content"]}>
          <AllOrders setOpen={setOpen} />
          <ByDate setOpen={setOpen} />
          <ByCustomDate setOpen={setOpen} />
          <ByCustomer setOpen={setOpen} />
          <ByShipping setOpen={setOpen} />
          <ByStatus setOpen={setOpen} />
          <ByBrand setOpen={setOpen} />
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
}
