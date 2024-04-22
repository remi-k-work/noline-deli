// component css styles
import styles from "./ProductsTableView.module.css";

// prisma and db access
import { allProductsWithPagination } from "@/features/manager/managerDb";

// other libraries
import clsx from "clsx";
import SearchParamsState from "../SearchParamsState";

// components
import ProductsTableEntry from "./ProductsTableEntry";
import NotFound from "@/components/NotFound";

// assets
import { lusitana } from "@/assets/fonts";

// types
interface ProductsTableViewProps {
  searchParamsState: SearchParamsState;
}

export default async function ProductsTableView({ searchParamsState: { categoryId, subCategoryId } }: ProductsTableViewProps) {
  // Retrieve all products from an external source (database) using offset pagination
  const { totalItems, products } = await allProductsWithPagination(1, 10, "id", "desc", categoryId, subCategoryId);

  if (products.length === 0) return <NotFound message={"Products were not found!"} />;

  return (
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
  );
}
