// prisma and db access
import { allProductsWithPagination } from "../db";
import { getCreatedByUser } from "../../auth/db";

// other libraries
import SearchParamsState from "../../SearchParamsState";

// components
import ProductsBrowseBar from "./ProductsBrowseBar";
import NotFound from "@/components/NotFound";
import ProductsTable from "./ProductsTable";

// types
interface ProductsTableViewProps {
  searchParamsState: SearchParamsState;
}

export default async function ProductsTableView({
  searchParamsState: { sortByField, sortByOrder, currentPage, categoryId, subCategoryId, keyword },
}: ProductsTableViewProps) {
  // Retrieve all products from an external source (database) using offset pagination
  const [totalItems, products] = await allProductsWithPagination(10, sortByField, sortByOrder, currentPage, categoryId, subCategoryId, keyword);

  if (products.length === 0)
    return (
      <>
        <ProductsBrowseBar itemsPerPage={10} totalItems={totalItems} />
        <br />
        <NotFound message={"Products were not found!"} />
      </>
    );

  return (
    <>
      <ProductsBrowseBar itemsPerPage={10} totalItems={totalItems} />
      <ProductsTable products={products} createdByUser={getCreatedByUser()} />
    </>
  );
}
