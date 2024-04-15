// component css styles
import styles from "./ProductsTableView.module.css";

// other libraries
import clsx from "clsx";
import { formatPrice } from "@/lib/helpers";

// components
// import CartTableEntry from "./CartTableEntry";

// assets
import { lusitana } from "@/assets/fonts";

export default function ProductsTableView() {
  return (
    <table className={styles["products-table-view"]}>
      <thead className={clsx(lusitana.className)}>
        <tr>
          <th>Item</th>
          <th>Category</th>
          <th>Price</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Nike Sneakers</td>
          <td>Shoes ► Jogging</td>
          <td>$50.95</td>
          <td>...</td>
        </tr>
      </tbody>
      <tfoot className={clsx(lusitana.className)}>
        <tr>
          <th>Item</th>
          <th>Category</th>
          <th>Price</th>
          <th>&nbsp;</th>
        </tr>
      </tfoot>
    </table>
  );
}
