"use client";

// component css styles
import styles from "./Paginate.module.css";

// next
import Link from "next/link";

// other libraries
import { cn } from "@/lib/utils";
import useSearchParamsState from "@/lib/hooks/useSearchParamsState";

// assets
import { BackwardIcon, ForwardIcon } from "@heroicons/react/24/solid";

// types
interface PaginateProps {
  itemsPerPage: number;
  totalItems: number;
}

export default function Paginate({ itemsPerPage, totalItems }: PaginateProps) {
  const searchParamsState = useSearchParamsState();
  const { currentPage } = searchParamsState;

  const prevPageNumber = currentPage !== 1 ? currentPage - 1 : currentPage;
  const nextPageNumber = currentPage !== Math.ceil(totalItems / itemsPerPage) ? currentPage + 1 : currentPage;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Create href urls that respect the current pathname and previously used search params
  const prevPageHref = searchParamsState.paginationChanged(prevPageNumber);
  const nextPageHref = searchParamsState.paginationChanged(nextPageNumber);

  return (
    // Do not render anything if there are no items to display
    totalItems > 0 && (
      <section className={styles["paginate"]}>
        <Link href={prevPageHref} className={styles["paginate__prev"]}>
          <BackwardIcon width={24} height={24} />
        </Link>
        <div className={styles["paginate__pages"]}>
          {pageNumbers.map((pageNumber) => {
            const currPageHref = searchParamsState.paginationChanged(pageNumber);

            return pageNumber === currentPage ? (
              <span key={pageNumber} className={cn(styles["paginate__page-number"], styles["paginate__page-number--current"])}>
                {pageNumber}
              </span>
            ) : (
              <Link key={pageNumber} href={currPageHref} className={styles["paginate__page-number"]}>
                {pageNumber}
              </Link>
            );
          })}
        </div>
        <Link href={nextPageHref} className={styles["paginate__next"]}>
          <ForwardIcon width={24} height={24} />
        </Link>
      </section>
    )
  );
}

export function PaginateSkeleton() {
  return (
    <section className={styles["paginate"]}>
      <div className={cn(styles["paginate__prev"], "skeleton")}>
        <BackwardIcon width={24} height={24} />
      </div>
      <div className={styles["paginate__pages"]}>
        <div className={cn(styles["paginate__page-number"], "skeleton")}>&nbsp;</div>
        <div className={cn(styles["paginate__page-number"], "skeleton")}>&nbsp;</div>
        <div className={cn(styles["paginate__page-number"], "skeleton")}>&nbsp;</div>
        <div className={cn(styles["paginate__page-number"], "skeleton")}>&nbsp;</div>
      </div>
      <div className={cn(styles["paginate__next"], "skeleton")}>
        <ForwardIcon width={24} height={24} />
      </div>
    </section>
  );
}
