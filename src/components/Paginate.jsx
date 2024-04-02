"use client";

// component css styles
import styles from "./Paginate.module.css";

// next
import Link from "next/link";

// other libraries
import clsx from "clsx";
import { BackwardIcon, ForwardIcon } from "@heroicons/react/24/solid";
import useSearchParamsState from "@/lib/useSearchParamsState";

export default function Paginate({ currentPage, itemsPerPage, totalItems }) {
  const searchParamsState = useSearchParamsState();

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
              <span key={pageNumber} className={clsx(styles["paginate__page-number"], styles["paginate__page-number--current"])}>
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
