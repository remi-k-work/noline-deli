// component css styles
import styles from "./SubCategoriesBrowseBar.module.css";

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
interface SubCategoriesBrowseBarProps {
  itemsPerPage: number;
  totalItems: number;
}

export default async function SubCategoriesBrowseBar({ itemsPerPage, totalItems }: SubCategoriesBrowseBarProps) {
  return (
    <section className={clsx(lusitana.className, styles["subcategories-browse-bar"], "bg-base-100")}>
      <header className={styles["subcategories-browse-bar__total-items"]}>
        <span className="badge badge-info">{totalItems}</span>
      </header>
      <SearchPanel className={styles["subcategories-browse-bar__search-panel"]} />
      <SortBy sortByFields={["id", "name"]} totalItems={totalItems} className={styles["subcategories-browse-bar__sort-by"]} />
      <Paginate itemsPerPage={itemsPerPage} totalItems={totalItems} className={styles["subcategories-browse-bar__paginate"]} />
      <footer className={styles["subcategories-browse-bar__new-subcategory"]}>
        <div className="lg:tooltip" data-tip="Create a new subcategory">
          <Link href={PathFinder.toSubCategoryNew()} className="btn btn-circle">
            <PlusCircleIcon width={24} height={24} />
          </Link>
        </div>
      </footer>
    </section>
  );
}
