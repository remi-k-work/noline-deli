// prisma and db access
import { allCategoriesWithPagination } from "../../db";
import { getCreatedByUser } from "../../../login/db";

// other libraries
import SearchParamsState from "../../../SearchParamsState";

// components
import BrowseBar from "../BrowseBar";
import NotFound from "@/components/NotFound";
import CategoriesTable from ".";

// types
interface ViewProps {
  searchParamsState: SearchParamsState;
}

export default async function View({ searchParamsState: { sortByField, sortByOrder, currentPage, keyword } }: ViewProps) {
  // Retrieve all categories from an external source (database) using offset pagination
  const [totalItems, categories] = await allCategoriesWithPagination(10, sortByField, sortByOrder, currentPage, keyword);

  if (categories.length === 0)
    return (
      <>
        <BrowseBar itemsPerPage={10} totalItems={totalItems} />
        <br />
        <NotFound message={"Categories were not found!"} />
      </>
    );

  return (
    <>
      <BrowseBar itemsPerPage={10} totalItems={totalItems} />
      <CategoriesTable categories={categories} createdByUser={getCreatedByUser()} />
    </>
  );
}
