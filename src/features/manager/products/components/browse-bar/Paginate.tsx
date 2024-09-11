"use client";

// component css styles
import styles from "./Paginate.module.css";

// react
import { useState } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { useTanTableInstanceContext } from "../../stores/tan-table-instance";

// components
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// assets
import { BackwardIcon, CheckIcon, ForwardIcon } from "@heroicons/react/24/solid";

// types
interface PaginateProps {
  className?: string;
}

export default function Paginate({ className }: PaginateProps) {
  const {
    table,
    tableState: { currentPage, totalPages },
  } = useTanTableInstanceContext();

  // The controlled open state of the drop-down menu
  const [open, setOpen] = useState(false);

  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <section className={cn(styles["paginate"], className)}>
      <Tooltip>
        <TooltipTrigger type="button" className={styles["paginate__prev"]} onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          <BackwardIcon width={24} height={24} />
        </TooltipTrigger>
        <TooltipContent>
          <p>Previous page</p>
        </TooltipContent>
      </Tooltip>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger className={styles["paginate__curr"]}>
          <Tooltip>
            <TooltipTrigger asChild>
              <header>
                {currentPage}&nbsp;/&nbsp;{totalPages}
              </header>
            </TooltipTrigger>
            <TooltipContent>
              <p>Change page</p>
            </TooltipContent>
          </Tooltip>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={styles["paginate__pages"]}>
          {pageNumbers.map((pageNumber) => {
            return pageNumber === currentPage ? (
              <DropdownMenuItem key={pageNumber} className={cn(styles["paginate__page-number"], styles["paginate__page-number--current"])}>
                {pageNumber}
                <CheckIcon width={24} height={24} />
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem key={pageNumber} asChild>
                <button
                  type="button"
                  className={styles["paginate__page-number"]}
                  onClick={() => {
                    table.setPageIndex(pageNumber - 1);
                    setOpen(false);
                  }}
                >
                  {pageNumber}
                </button>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
      <Tooltip>
        <TooltipTrigger type="button" className={styles["paginate__next"]} onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          <ForwardIcon width={24} height={24} />
        </TooltipTrigger>
        <TooltipContent>
          <p>Next page</p>
        </TooltipContent>
      </Tooltip>
    </section>
  );
}
