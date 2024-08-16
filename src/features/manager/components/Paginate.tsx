"use client";

// component css styles
import styles from "./Paginate.module.css";

// react
import { useState } from "react";

// next
import Link from "next/link";

// other libraries
import { cn } from "@/lib/utils";
import useSearchParamsState from "../hooks/useSearchParamsState";

// components
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// assets
import { BackwardIcon, CheckIcon, ForwardIcon } from "@heroicons/react/24/solid";

// types
interface PaginateProps {
  itemsPerPage: number;
  totalItems: number;
  className?: string;
}

export default function Paginate({ itemsPerPage, totalItems, className }: PaginateProps) {
  const searchParamsState = useSearchParamsState();

  // The controlled open state of the drop-down menu
  const [open, setOpen] = useState(false);

  const { currentPage = 1 } = searchParamsState;

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const prevPageNumber = currentPage !== 1 ? currentPage - 1 : currentPage;
  const nextPageNumber = currentPage !== totalPages ? currentPage + 1 : currentPage;

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Create href urls that respect the current pathname and previously used search params
  const prevPageHref = searchParamsState.paginationChanged(prevPageNumber);
  const nextPageHref = searchParamsState.paginationChanged(nextPageNumber);

  return (
    // Do not render anything if there are no items to display
    totalItems > 0 && (
      <section className={cn(styles["paginate"], className)}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={prevPageHref} className={styles["paginate__prev"]}>
              <BackwardIcon width={24} height={24} />
            </Link>
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
              const currPageHref = searchParamsState.paginationChanged(pageNumber);

              return pageNumber === currentPage ? (
                <DropdownMenuItem key={pageNumber} className={cn(styles["paginate__page-number"], styles["paginate__page-number--current"])}>
                  {pageNumber}
                  <CheckIcon width={24} height={24} />
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem key={pageNumber} className={styles["paginate__page-number"]}>
                  <Link href={currPageHref} className="block w-full" onClick={() => setOpen(false)}>
                    {pageNumber}
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={nextPageHref} className={styles["paginate__next"]}>
              <ForwardIcon width={24} height={24} />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Next page</p>
          </TooltipContent>
        </Tooltip>
      </section>
    )
  );
}
