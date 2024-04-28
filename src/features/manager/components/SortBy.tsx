"use client";

// component css styles
import styles from "./SortBy.module.css";

// next
import Link from "next/link";

// other libraries
import clsx from "clsx";
import { ChevronDownIcon, ChevronUpIcon, CurrencyDollarIcon, LanguageIcon, TagIcon } from "@heroicons/react/24/solid";
import { SortByField, SortByOrder } from "../SearchParamsState";
import useSearchParamsState from "../useSearchParamsState";

// types
interface SortByProps {
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
}

export default function SortBy({ totalItems, className }: SortByProps) {
  const searchParamsState = useSearchParamsState();
  const { sortByField, sortByOrder } = searchParamsState;

  return (
    // Do not render anything if there are no items to sort
    totalItems > 0 && (
      <section className={clsx(styles["sort-by"], "dropdown dropdown-end", className)}>
        {/* This is the "trigger" for a dropdown, and we need to style it so that it takes up the entire container */}
        <div tabIndex={0} role="button" className="flex h-full items-center p-2">
          <div className="lg:tooltip" data-tip="Sort items">
            <SortByIcon sortByField={sortByField} sortByOrder={sortByOrder} />
          </div>
        </div>
        <div tabIndex={0} className={clsx(styles["sort-by__choices"], "dropdown-content translate-x-1/3")}>
          <SortByLink newSortByField="id" newSortByOrder="asc" description="Oldest item first" />
          <SortByLink newSortByField="id" newSortByOrder="desc" description="Newest item first" />
          <SortByLink newSortByField="price" newSortByOrder="asc" description="Least expensive first" />
          <SortByLink newSortByField="price" newSortByOrder="desc" description="Most expensive first" />
          <SortByLink newSortByField="name" newSortByOrder="asc" description="By name from A to Z" />
          <SortByLink newSortByField="name" newSortByOrder="desc" description="By name from Z to A" />
        </div>
      </section>
    )
  );
}

function SortByIcon({ sortByField, sortByOrder }: SortByIconProps) {
  return (
    <div className="flex items-center">
      {sortByField === "id" && <TagIcon width={24} height={24} />}
      {sortByField === "price" && <CurrencyDollarIcon width={24} height={24} />}
      {sortByField === "name" && <LanguageIcon width={24} height={24} />}
      {sortByOrder === "asc" ? <ChevronUpIcon width={24} height={24} /> : <ChevronDownIcon width={24} height={24} />}
    </div>
  );
}

function SortByLink({ newSortByField, newSortByOrder, description }: SortByLinkProps) {
  const searchParamsState = useSearchParamsState();

  return searchParamsState.isSortBySelected(newSortByField, newSortByOrder) ? (
    <div className={clsx(styles["sort-by__choice"], styles["sort-by__choice--current"])}>
      <SortByIcon sortByField={newSortByField} sortByOrder={newSortByOrder} />
      {description}
    </div>
  ) : (
    <Link href={searchParamsState.sortByChanged(newSortByField, newSortByOrder)} className={styles["sort-by__choice"]}>
      <SortByIcon sortByField={newSortByField} sortByOrder={newSortByOrder} />
      {description}
    </Link>
  );
}
