// prisma and db access
import { allCategoriesWithPagination } from "../db";
import { getCreatedByUser } from "../../auth/db";

// other libraries
import SearchParamsState from "../../SearchParamsState";

// components
import CategoriesBrowseBar from "./CategoriesBrowseBar";
import NotFound from "@/components/NotFound";
import CategoriesTable from "./CategoriesTable";

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
      <CategoriesTable categories={categories} createdByUser={getCreatedByUser()} />
    </>
  );
}
