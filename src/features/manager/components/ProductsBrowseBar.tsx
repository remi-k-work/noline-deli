// component css styles
import styles from "./ProductsBrowseBar.module.css";

// prisma and db access
import { allCategories } from "@/features/manager/managerDb";

// other libraries
import clsx from "clsx";

// components
import BrowseByCategory from "./BrowseByCategory";
import SearchPanel from "./SearchPanel";

export default async function ProductsBrowseBar() {
  // Retrieve all of the categories from an external source (database)
  const categories = await allCategories();

  return (
    <section className={clsx(styles["products-browse-bar"], "bg-base-100")}>
      <BrowseByCategory categories={categories} />
      <SearchPanel />
    </section>
  );
}
