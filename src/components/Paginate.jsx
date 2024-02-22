// component css styles
import styles from "./Paginate.module.css";

// next
import Link from "next/link";

// other libraries
import clsx from "clsx";
import { BackwardIcon, ForwardIcon } from "@heroicons/react/24/solid";

export default function Paginate({ currentPage, itemsPerPage, totalItems, pathname, searchParams }) {
  const prevPageNumber = currentPage !== 1 ? currentPage - 1 : currentPage;
  const nextPageNumber = currentPage !== Math.ceil(totalItems / itemsPerPage) ? currentPage + 1 : currentPage;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Create href urls that respect the current pathname and previously used search params
  const params = new URLSearchParams(searchParams);
  params.set("page", prevPageNumber);
  const prevPageHref = `${pathname}?${params.toString()}`;
  params.set("page", nextPageNumber);
  const nextPageHref = `${pathname}?${params.toString()}`;

  return (
    // Do not render anything if there are no items to display
    totalItems > 0 && (
      <section className={styles["paginate"]}>
        <Link href={prevPageHref} className={styles["paginate__prev"]}>
          <BackwardIcon width={24} height={24} />
        </Link>
        <div className={styles["paginate__pages"]}>
          {pageNumbers.map((pageNumber) => {
            params.set("page", pageNumber);
            const currPageHref = `${pathname}?${params.toString()}`;

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
