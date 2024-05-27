// component css styles
import styles from "./CategoriesTableView.module.css";

// prisma and db access
import { allCategoriesWithPagination } from "../dbCategories";

// other libraries
import clsx from "clsx";
import SearchParamsState from "../SearchParamsState";

// components
import CategoriesBrowseBar from "./CategoriesBrowseBar";
import CategoriesTableEntry from "./CategoriesTableEntry";
import NotFound from "@/components/NotFound";

// assets
import { lusitana } from "@/assets/fonts";

// types
interface CategoriesTableViewProps {
  searchParamsState: SearchParamsState;
}

export default async function CategoriesTableView({ searchParamsState: { sortByField, sortByOrder, currentPage, keyword } }: CategoriesTableViewProps) {
  // Retrieve all categories from an external source (database) using offset pagination
  const [totalItems, categories] = await allCategoriesWithPagination(10, sortByField, sortByOrder, currentPage, keyword);

  if (categories.length === 0)
    return (
      <>
        <CategoriesBrowseBar itemsPerPage={10} totalItems={totalItems} />
        <br />
        <NotFound message={"Categories were not found!"} />
      </>
    );

  return (
    <>
      <CategoriesBrowseBar itemsPerPage={10} totalItems={totalItems} />
      <table className={styles["categories-table-view"]}>
        <thead className={clsx(lusitana.className)}>
          <tr>
            <th>Name</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <CategoriesTableEntry key={category.id} category={category} />
          ))}
        </tbody>
        <tfoot className={clsx(lusitana.className)}>
          <tr>
            <th>Name</th>
            <th>&nbsp;</th>
          </tr>
        </tfoot>
      </table>
    </>
  );
}
