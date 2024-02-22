// component css styles
import styles from "./Paginate.module.css";

// next
import Link from "next/link";

// other libraries
import clsx from "clsx";
import { BackwardIcon, ForwardIcon } from "@heroicons/react/24/solid";

export default function Paginate({ currentPage, itemsPerPage, totalItems }) {
  const prevPageNumber = currentPage !== 1 ? currentPage - 1 : currentPage;
  const nextPageNumber = currentPage !== Math.ceil(totalItems / itemsPerPage) ? currentPage + 1 : currentPage;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    // Do not render anything if there are no items to display
    totalItems > 0 && (
      <section className={styles["paginate"]}>
        <Link href={`?page=${prevPageNumber}`} className={styles["paginate__prev"]}>
          <BackwardIcon width={24} height={24} />
        </Link>
        <div className={styles["paginate__pages"]}>
          {pageNumbers.map((pageNumber) =>
            pageNumber === currentPage ? (
              <span key={pageNumber} className={clsx(styles["paginate__page-number"], styles["paginate__page-number--current"])}>
                {pageNumber}
              </span>
            ) : (
              <Link key={pageNumber} href={`?page=${pageNumber}`} className={styles["paginate__page-number"]}>
                {pageNumber}
              </Link>
            ),
          )}
        </div>
        <Link href={`?page=${nextPageNumber}`} className={styles["paginate__next"]}>
          <ForwardIcon width={24} height={24} />
        </Link>
      </section>
    )
  );
}
