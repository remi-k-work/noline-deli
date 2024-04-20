// component css styles
import styles from "./ProductsTableView.module.css";

// prisma and db access
import { allProductsWithPagination } from "@/features/manager/managerDb";

// other libraries
import clsx from "clsx";

// components
import ProductsTableEntry from "./ProductsTableEntry";
import NotFound from "@/components/NotFound";

// assets
import { lusitana } from "@/assets/fonts";

export default async function ProductsTableView() {
  // Retrieve all products from an external source (database) using offset pagination
  const { totalItems, products } = await allProductsWithPagination(1, 10, "id", "desc", "", 900000000, false);

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
