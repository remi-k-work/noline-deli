// component css styles
import styles from "./ProductsBrowseBar.module.css";

// next
import Link from "next/link";

// prisma and db access
import { allCategories } from "@/features/manager/managerDb";

// other libraries
import clsx from "clsx";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import PathFinder from "../PathFinder";

// components
import BrowseByCategory from "./BrowseByCategory";
import SearchPanel from "./SearchPanel";
import SortBy from "./SortBy";
import Paginate from "./Paginate";

// assets
import { lusitana } from "@/assets/fonts";

// types
interface ProductsBrowseBarProps {
  itemsPerPage: number;
  totalItems: number;
}

export default async function ProductsBrowseBar({ itemsPerPage, totalItems }: ProductsBrowseBarProps) {
  // Retrieve all of the categories from an external source (database)
  const categories = await allCategories();

  return (
    <section className={clsx(lusitana.className, styles["products-browse-bar"], "bg-base-100")}>
      <BrowseByCategory categories={categories} totalItems={totalItems} className={styles["products-browse-bar__browse-by-category"]} />
      <SearchPanel className={styles["products-browse-bar__search-panel"]} />
      <SortBy totalItems={totalItems} className={styles["products-browse-bar__sort-by"]} />
      <Paginate itemsPerPage={itemsPerPage} totalItems={totalItems} className={styles["products-browse-bar__paginate"]} />
      <footer className={styles["products-browse-bar__new-product"]}>
        <div className="lg:tooltip" data-tip="Add a new product">
          <Link href={PathFinder.toProductNew()} className="btn btn-circle">
            <PlusCircleIcon width={24} height={24} />
          </Link>
        </div>
      </footer>
    </section>
  );
}
