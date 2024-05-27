// component css styles
import styles from "./SubCategoriesTableView.module.css";

// prisma and db access
import { allSubCategoriesWithPagination } from "../dbCategories";

// other libraries
import clsx from "clsx";
import SearchParamsState from "../SearchParamsState";

// components
import SubCategoriesBrowseBar from "./SubCategoriesBrowseBar";
import SubCategoriesTableEntry from "./SubCategoriesTableEntry";
import NotFound from "@/components/NotFound";

// assets
import { lusitana } from "@/assets/fonts";

// types
interface SubCategoriesTableViewProps {
  searchParamsState: SearchParamsState;
}

export default async function SubCategoriesTableView({ searchParamsState: { sortByField, sortByOrder, currentPage, keyword } }: SubCategoriesTableViewProps) {
  // Retrieve all subcategories from an external source (database) using offset pagination
  const [totalItems, subCategories] = await allSubCategoriesWithPagination(10, sortByField, sortByOrder, currentPage, keyword);

  if (subCategories.length === 0)
    return (
      <>
        <SubCategoriesBrowseBar itemsPerPage={10} totalItems={totalItems} />
        <br />
        <NotFound message={"Subcategories were not found!"} />
      </>
    );

  return (
    <>
      <SubCategoriesBrowseBar itemsPerPage={10} totalItems={totalItems} />
      <table className={styles["subcategories-table-view"]}>
        <thead className={clsx(lusitana.className)}>
          <tr>
            <th>Name</th>
            <th>Parent Category</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {subCategories.map((subCategory) => (
            <SubCategoriesTableEntry key={subCategory.id} subCategory={subCategory} />
          ))}
        </tbody>
        <tfoot className={clsx(lusitana.className)}>
          <tr>
            <th>Name</th>
            <th>Parent Category</th>
            <th>&nbsp;</th>
          </tr>
        </tfoot>
      </table>
    </>
  );
}
