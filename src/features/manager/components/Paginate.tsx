"use client";

// component css styles
import styles from "./Paginate.module.css";

// next
import Link from "next/link";

// other libraries
import clsx from "clsx";
import { BackwardIcon, CheckIcon, ForwardIcon } from "@heroicons/react/24/solid";
import useSearchParamsState from "../useSearchParamsState";

// types
interface PaginateProps {
  itemsPerPage: number;
  totalItems: number;
  className?: string;
}

export default function Paginate({ itemsPerPage, totalItems, className }: PaginateProps) {
  const searchParamsState = useSearchParamsState();
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
      <section className={clsx(styles["paginate"], className)}>
        <div className="lg:tooltip" data-tip="Previous page">
          <Link href={prevPageHref} className={styles["paginate__prev"]}>
            <BackwardIcon width={24} height={24} />
          </Link>
        </div>
        <div className={clsx(styles["paginate__curr"], "dropdown dropdown-end")}>
          <div className="lg:tooltip" data-tip="Change page">
            <div tabIndex={0} role="button" className="min-w-16 p-2 text-center">
              {currentPage}&nbsp;/&nbsp;{totalPages}
            </div>
          </div>
          <ul tabIndex={0} className={clsx(styles["paginate__pages"], "dropdown-content")}>
            {pageNumbers.map((pageNumber) => {
              const currPageHref = searchParamsState.paginationChanged(pageNumber);

              return pageNumber === currentPage ? (
                <li key={pageNumber} className={clsx(styles["paginate__page-number"], styles["paginate__page-number--current"])}>
                  {pageNumber}
                  <CheckIcon width={24} height={24} />
                </li>
              ) : (
                <li key={pageNumber} className={styles["paginate__page-number"]}>
                  <Link href={currPageHref} className="block w-full">
                    {pageNumber}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="lg:tooltip" data-tip="Next page">
          <Link href={nextPageHref} className={styles["paginate__next"]}>
            <ForwardIcon width={24} height={24} />
          </Link>
        </div>
      </section>
    )
  );
}
