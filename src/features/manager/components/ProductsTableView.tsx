// component css styles
import styles from "./ProductsTableView.module.css";

// prisma and db access
import { allProductsWithPagination } from "@/features/manager/managerDb";

// other libraries
import clsx from "clsx";
import SearchParamsState from "../SearchParamsState";

// components
import ProductsBrowseBar from "./ProductsBrowseBar";
import ProductsTableEntry from "./ProductsTableEntry";
import NotFound from "@/components/NotFound";

// assets
import { lusitana } from "@/assets/fonts";

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
      <table className={styles["products-table-view"]}>
        <thead className={clsx(lusitana.className)}>
          <tr>
            <th>&nbsp;</th>
            <th>Name</th>
            <th>Category</th>
            <th>SubCategory</th>
            <th>Price</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductsTableEntry key={product.id} product={product} />
          ))}
        </tbody>
        <tfoot className={clsx(lusitana.className)}>
          <tr>
            <th>&nbsp;</th>
            <th>Name</th>
            <th>Category</th>
            <th>SubCategory</th>
            <th>Price</th>
            <th>&nbsp;</th>
          </tr>
        </tfoot>
      </table>
    </>
  );
}
