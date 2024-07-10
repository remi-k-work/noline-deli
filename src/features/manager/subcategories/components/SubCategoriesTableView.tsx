// prisma and db access
import { allSubCategoriesWithPagination } from "../../categories/db";
import { getCreatedByUser } from "../../auth/db";

// other libraries
import SearchParamsState from "../../SearchParamsState";

// components
import SubCategoriesBrowseBar from "./SubCategoriesBrowseBar";
import NotFound from "@/components/NotFound";
import SubCategoriesTable from "./SubCategoriesTable";

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
        <NotFound message={"SubCategories were not found!"} />
      </>
    );

  return (
    <>
      <SubCategoriesBrowseBar itemsPerPage={10} totalItems={totalItems} />
      <SubCategoriesTable subCategories={subCategories} createdByUser={getCreatedByUser()} />
    </>
  );
}
