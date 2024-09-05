"use client";

// component css styles
import styles from "./ByCategory.module.css";

// react
import { forwardRef, useState } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { useTanTableInstanceContext } from "../../stores/TanTableInstance";

// components
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// types
interface ByCategoryProps {
  className?: string;
}

export default function ByCategory({ className }: ByCategoryProps) {
  const { totalItems } = useTanTableInstanceContext();

  // The controlled open state of the drop-down menu
  const [open, setOpen] = useState(false);

  return (
    <section className={cn(styles["by-category"], className)}>
      <header className={styles["by-category__total"]}>
        <span className="badge badge-info">{totalItems}</span>
      </header>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger className={styles["by-category__context"]}>
          <Tooltip>
            <TooltipTrigger asChild>
              <ByContext />
            </TooltipTrigger>
            <TooltipContent>
              <p>Browse by category</p>
            </TooltipContent>
          </Tooltip>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className={styles["by-category__dropdown-content"]}>
          <DropdownMenuItem
            onClick={() => {
              setOpen(false);
            }}
          >
            All Orders
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
}

const ByContext = forwardRef<HTMLElement>(({ ...props }, ref) => {
  const { isSearchMode } = useTanTableInstanceContext();

  return (
    <footer ref={ref} {...props}>
      {isSearchMode ? <>Search Results</> : <>All Orders</>}
    </footer>
  );
});
ByContext.displayName = "ByContext";
