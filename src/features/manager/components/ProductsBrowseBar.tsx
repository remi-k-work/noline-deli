// component css styles
import styles from "./ProductsBrowseBar.module.css";

// prisma and db access
import { allCategories } from "@/features/manager/managerDb";

// other libraries
import clsx from "clsx";

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
      <BrowseByCategory categories={categories} className={styles["products-browse-bar__browse-by-category"]} />
      <SearchPanel className={styles["products-browse-bar__search-panel"]} />
      <SortBy className={styles["products-browse-bar__sort-by"]} />
      <Paginate itemsPerPage={itemsPerPage} totalItems={totalItems} className={styles["products-browse-bar__paginate"]} />
    </section>
  );
}
