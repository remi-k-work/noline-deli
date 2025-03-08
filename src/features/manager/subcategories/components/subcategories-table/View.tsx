// prisma and db access
import { allSubCategoriesWithPagination } from "@/features/manager/categories/db";
import { getCreatedByUser } from "@/features/manager/login/db";

// other libraries
import SearchParamsState from "@/features/manager/SearchParamsState";

// components
import BrowseBar from "@/features/manager/subcategories/components/BrowseBar";
import NotFound from "@/components/NotFound";
import SubCategoriesTable from ".";

// types
interface ViewProps {
  searchParamsState: SearchParamsState;
}

export default async function View({ searchParamsState: { sortByField, sortByOrder, currentPage, keyword } }: ViewProps) {
  // Retrieve all subcategories from an external source (database) using offset pagination
  const [totalItems, subCategories] = await allSubCategoriesWithPagination(10, sortByField, sortByOrder, currentPage, keyword);

  if (subCategories.length === 0)
    return (
      <>
        <BrowseBar itemsPerPage={10} totalItems={totalItems} />
        <br />
        <NotFound message={"SubCategories were not found!"} />
      </>
    );

  return (
    <>
      <BrowseBar itemsPerPage={10} totalItems={totalItems} />
      <SubCategoriesTable subCategories={subCategories} createdByUser={await getCreatedByUser()} />
    </>
  );
}
