"use client";

// component css styles
import styles from "./Paginate.module.css";

// next
import Link from "next/link";

// other libraries
import { cn } from "@/lib/utils";
import useSearchParamsState from "@/hooks/useSearchParamsState";

// assets
import { BackwardIcon, ForwardIcon } from "@heroicons/react/24/solid";

// types
interface PaginateProps {
  itemsPerPage: number;
  totalItems: number;
}

export default function Paginate({ itemsPerPage, totalItems }: PaginateProps) {
  const { currentPage = 1, paginationChanged } = useSearchParamsState();

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const prevPageNumber = currentPage !== 1 ? currentPage - 1 : currentPage;
  const nextPageNumber = currentPage !== totalPages ? currentPage + 1 : currentPage;

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);

  // Do not render anything if there are no items to display
  if (totalItems === 0) return null;

  return (
    <section className={styles["paginate"]}>
      <Link href={paginationChanged(prevPageNumber)} className={styles["paginate__prev"]}>
        <BackwardIcon width={24} height={24} />
      </Link>
      <div className={styles["paginate__pages"]}>
        {pageNumbers.map((pageNumber) =>
          pageNumber === currentPage ? (
            <span key={pageNumber} className={cn(styles["paginate__page-number"], styles["paginate__page-number--current"])}>
              {pageNumber}
            </span>
          ) : (
            <Link key={pageNumber} href={paginationChanged(pageNumber)} className={styles["paginate__page-number"]}>
              {pageNumber}
            </Link>
          ),
        )}
      </div>
      <Link href={paginationChanged(nextPageNumber)} className={styles["paginate__next"]}>
        <ForwardIcon width={24} height={24} />
      </Link>
    </section>
  );
}

export function PaginateSkeleton() {
  return (
    <section className={styles["paginate"]}>
      <div className={cn(styles["paginate__prev"], "animate-pulse bg-background")}>
        <BackwardIcon width={24} height={24} />
      </div>
      <div className={styles["paginate__pages"]}>
        <div className={cn(styles["paginate__page-number"], "animate-pulse bg-background")}>&nbsp;</div>
        <div className={cn(styles["paginate__page-number"], "animate-pulse bg-background")}>&nbsp;</div>
        <div className={cn(styles["paginate__page-number"], "animate-pulse bg-background")}>&nbsp;</div>
        <div className={cn(styles["paginate__page-number"], "animate-pulse bg-background")}>&nbsp;</div>
      </div>
      <div className={cn(styles["paginate__next"], "animate-pulse bg-background")}>
        <ForwardIcon width={24} height={24} />
      </div>
    </section>
  );
}
