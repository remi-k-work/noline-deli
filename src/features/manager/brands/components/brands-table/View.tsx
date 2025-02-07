// prisma and db access
import { allBrandsWithPagination } from "../../db";
import { getCreatedByUser } from "../../../login/db";

// other libraries
import SearchParamsState from "../../../SearchParamsState";

// components
import BrowseBar from "../BrowseBar";
import NotFound from "@/components/NotFound";
import BrandsTable from ".";

// types
interface ViewProps {
  searchParamsState: SearchParamsState;
}

export default async function View({ searchParamsState: { sortByField, sortByOrder, currentPage, keyword } }: ViewProps) {
  // Retrieve all brands from an external source (database) using offset pagination
  const [totalItems, brands] = await allBrandsWithPagination(10, sortByField, sortByOrder, currentPage, keyword);

  if (brands.length === 0)
    return (
      <>
        <BrowseBar itemsPerPage={10} totalItems={totalItems} />
        <br />
        <NotFound message={"Brands were not found!"} />
      </>
    );

  return (
    <>
      <BrowseBar itemsPerPage={10} totalItems={totalItems} />
      <BrandsTable brands={brands} createdByUser={getCreatedByUser()} />
    </>
  );
}
