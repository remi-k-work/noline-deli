"use client";

// component css styles
import styles from "./SortBy.module.css";

// next
import Link from "next/link";

// other libraries
import clsx from "clsx";
import { ArrowsUpDownIcon, ChevronDownIcon, ChevronUpIcon, CurrencyDollarIcon, LanguageIcon, TagIcon } from "@heroicons/react/24/solid";
import useSearchParamsState from "../useSearchParamsState";

// types
interface SortByProps {
  className?: string;
}

export default function SortBy({ className }: SortByProps) {
  const searchParamsState = useSearchParamsState();

  return (
    <section className={clsx(styles["sort-by"], className)}>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="flex items-center">
          <div className="lg:tooltip" data-tip="Sort items">
            <ArrowsUpDownIcon width={24} height={24} />
          </div>
        </div>
        <div tabIndex={0} className={clsx(styles["sort-by__choices"], "dropdown-content translate-x-1/3")}>
          <Link href={"#id|desc"} className={styles["sort-by__choice"]}>
            <div className="flex items-center">
              <TagIcon width={24} height={24} />
              <ChevronUpIcon width={24} height={24} />
            </div>
            Newest item first
          </Link>
          <Link href={"#id|asc"} className={styles["sort-by__choice"]}>
            <div className="flex items-center">
              <TagIcon width={24} height={24} />
              <ChevronDownIcon width={24} height={24} />
            </div>
            Oldest item first
          </Link>
          <Link href={"#price|asc"} className={styles["sort-by__choice"]}>
            <div className="flex items-center">
              <CurrencyDollarIcon width={24} height={24} />
              <ChevronUpIcon width={24} height={24} />
            </div>
            Least expensive first
          </Link>
          <Link href={"#price|desc"} className={styles["sort-by__choice"]}>
            <div className="flex items-center">
              <CurrencyDollarIcon width={24} height={24} />
              <ChevronDownIcon width={24} height={24} />
            </div>
            Most expensive first
          </Link>
          <Link href={"#name|asc"} className={styles["sort-by__choice"]}>
            <div className="flex items-center">
              <LanguageIcon width={24} height={24} />
              <ChevronUpIcon width={24} height={24} />
            </div>
            By name from A to Z
          </Link>
          <Link href={"#name|desc"} className={styles["sort-by__choice"]}>
            <div className="flex items-center">
              <LanguageIcon width={24} height={24} />
              <ChevronDownIcon width={24} height={24} />
            </div>
            By name from Z to A
          </Link>
        </div>
      </div>
    </section>
  );
}
