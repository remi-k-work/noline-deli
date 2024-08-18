// prisma and db access
import { allProductsWithPagination } from "../../db";
import { getCreatedByUser } from "../../../auth/db";

// other libraries
import SearchParamsState from "../../../SearchParamsState";

// components
import BrowseBar from "../browse-bar";
import NotFound from "@/components/NotFound";
import ProductsTable from ".";

// types
interface ViewProps {
  searchParamsState: SearchParamsState;
}

export default async function View({ searchParamsState: { sortByField, sortByOrder, currentPage, categoryId, subCategoryId, keyword } }: ViewProps) {
  // Retrieve all products from an external source (database) using offset pagination
  const [totalItems, products] = await allProductsWithPagination(10, sortByField, sortByOrder, currentPage, categoryId, subCategoryId, keyword);

  if (products.length === 0)
    return (
      <>
        <BrowseBar itemsPerPage={10} totalItems={totalItems} />
        <br />
        <NotFound message={"Products were not found!"} />
      </>
    );

  return (
    <>
      <BrowseBar itemsPerPage={10} totalItems={totalItems} />
      <ProductsTable products={products} createdByUser={getCreatedByUser()} />
    </>
  );
}
