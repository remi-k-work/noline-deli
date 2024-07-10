// prisma and db access
import { allBrandsWithPagination } from "../db";
import { getCreatedByUser } from "../../auth/db";

// other libraries
import SearchParamsState from "../../SearchParamsState";

// components
import BrandsBrowseBar from "./BrandsBrowseBar";
import NotFound from "@/components/NotFound";
import BrandsTable from "./BrandsTable";

// types
interface BrandsTableViewProps {
  searchParamsState: SearchParamsState;
}

export default async function BrandsTableView({ searchParamsState: { sortByField, sortByOrder, currentPage, keyword } }: BrandsTableViewProps) {
  // Retrieve all brands from an external source (database) using offset pagination
  const [totalItems, brands] = await allBrandsWithPagination(10, sortByField, sortByOrder, currentPage, keyword);

  if (brands.length === 0)
    return (
      <>
        <BrandsBrowseBar itemsPerPage={10} totalItems={totalItems} />
        <br />
        <NotFound message={"Brands were not found!"} />
      </>
    );

  return (
    <>
      <BrandsBrowseBar itemsPerPage={10} totalItems={totalItems} />
      <BrandsTable brands={brands} createdByUser={getCreatedByUser()} />
    </>
  );
}
