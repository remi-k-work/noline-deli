"use client";

// component css styles
import styles from "./SortBy.module.css";

// react
import { Dispatch, forwardRef, SetStateAction, useState } from "react";

// next
import Link from "next/link";

// other libraries
import { cn } from "@/lib/utils";
import type { SortByField, SortByOrder } from "../SearchParamsState";
import useSearchParamsState from "../hooks/useSearchParamsState";

// components
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// assets
import { ChevronDownIcon, ChevronUpIcon, CurrencyDollarIcon, LanguageIcon, TagIcon } from "@heroicons/react/24/solid";

// types
interface SortByProps {
  sortByFields: SortByField[];
  totalItems: number;
  className?: string;
}

interface SortByIconProps {
  sortByField: SortByField;
  sortByOrder: SortByOrder;
}

interface SortByLinkProps {
  newSortByField: SortByField;
  newSortByOrder: SortByOrder;
  description: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function SortBy({ sortByFields, totalItems, className }: SortByProps) {
  const { sortByField, sortByOrder } = useSearchParamsState();

  // The controlled open state of the drop-down menu
  const [open, setOpen] = useState(false);

  return (
    // Do not render anything if there are no items to sort
    totalItems > 0 && (
      <section className={className}>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger className={styles["sort-by"]}>
            <Tooltip>
              <TooltipTrigger asChild>
                <SortByIcon sortByField={sortByField} sortByOrder={sortByOrder} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Sort items</p>
              </TooltipContent>
            </Tooltip>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={styles["sort-by__choices"]}>
            {sortByFields.includes("id") && (
              <>
                <SortByLink newSortByField="id" newSortByOrder="asc" description="Oldest item first" setOpen={setOpen} />
                <SortByLink newSortByField="id" newSortByOrder="desc" description="Newest item first" setOpen={setOpen} />
              </>
            )}
            {sortByFields.includes("price") && (
              <>
                <SortByLink newSortByField="price" newSortByOrder="asc" description="Least expensive first" setOpen={setOpen} />
                <SortByLink newSortByField="price" newSortByOrder="desc" description="Most expensive first" setOpen={setOpen} />
              </>
            )}
            {sortByFields.includes("name") && (
              <>
                <SortByLink newSortByField="name" newSortByOrder="asc" description="By name from A to Z" setOpen={setOpen} />
                <SortByLink newSortByField="name" newSortByOrder="desc" description="By name from Z to A" setOpen={setOpen} />
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
    )
  );
}

const SortByIcon = forwardRef<HTMLElement, SortByIconProps>(({ sortByField, sortByOrder, ...props }: SortByIconProps, ref) => {
  return (
    <header ref={ref} className="flex items-center" {...props}>
      {sortByField === "id" && <TagIcon width={24} height={24} />}
      {sortByField === "price" && <CurrencyDollarIcon width={24} height={24} />}
      {sortByField === "name" && <LanguageIcon width={24} height={24} />}
      {sortByOrder === "asc" ? <ChevronUpIcon width={24} height={24} /> : <ChevronDownIcon width={24} height={24} />}
    </header>
  );
});
SortByIcon.displayName = "SortByIcon";

function SortByLink({ newSortByField, newSortByOrder, description, setOpen }: SortByLinkProps) {
  const { isSortBySelected, sortByChanged } = useSearchParamsState();

  return isSortBySelected(newSortByField, newSortByOrder) ? (
    <DropdownMenuItem className={cn(styles["sort-by__choice"], styles["sort-by__choice--current"])}>
      <SortByIcon sortByField={newSortByField} sortByOrder={newSortByOrder} />
      {description}
    </DropdownMenuItem>
  ) : (
    <DropdownMenuItem className={styles["sort-by__choice"]}>
      <Link href={sortByChanged(newSortByField, newSortByOrder)} className="flex w-full items-center justify-between" onClick={() => setOpen(false)}>
        <SortByIcon sortByField={newSortByField} sortByOrder={newSortByOrder} />
        {description}
      </Link>
    </DropdownMenuItem>
  );
}
