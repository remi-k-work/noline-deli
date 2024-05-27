// component css styles
import styles from "./CategoriesBrowseBar.module.css";

// next
import Link from "next/link";

// other libraries
import clsx from "clsx";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import PathFinder from "../PathFinder";

// components
import SearchPanel from "./SearchPanel";
import SortBy from "./SortBy";
import Paginate from "./Paginate";

// assets
import { lusitana } from "@/assets/fonts";

// types
interface CategoriesBrowseBarProps {
  itemsPerPage: number;
  totalItems: number;
}

export default async function CategoriesBrowseBar({ itemsPerPage, totalItems }: CategoriesBrowseBarProps) {
  return (
    <section className={clsx(lusitana.className, styles["categories-browse-bar"], "bg-base-100")}>
      <header className={styles["categories-browse-bar__total-items"]}>
        <span className="badge badge-info">{totalItems}</span>
      </header>
      <SearchPanel className={styles["categories-browse-bar__search-panel"]} />
      <SortBy sortByFields={["id", "name"]} totalItems={totalItems} className={styles["categories-browse-bar__sort-by"]} />
      <Paginate itemsPerPage={itemsPerPage} totalItems={totalItems} className={styles["categories-browse-bar__paginate"]} />
      <footer className={styles["categories-browse-bar__new-category"]}>
        <div className="lg:tooltip" data-tip="Create a new category">
          <Link href={PathFinder.toCategoryNew()} className="btn btn-circle">
            <PlusCircleIcon width={24} height={24} />
          </Link>
        </div>
      </footer>
    </section>
  );
}
