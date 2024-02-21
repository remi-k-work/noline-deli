// component css styles
import styles from "./CartTableView.module.css";

// other libraries
import clsx from "clsx";
import { formatPrice } from "@/lib/helpers";

// components
import CartTableEntry from "./CartTableEntry";

// assets
import { lusitana } from "@/assets/fonts";

export default function CartTableView({ cart }) {
  // Ensure the cart exists
  if (!cart) {
    // To prevent receiving the "cannot destructure property of undefined" exception, do not attempt to render anything
    return null;
  }

  const { cartItems, totalQty, subTotal } = cart;

  return (
    <table className={styles["cart-table-view"]}>
      <thead className={clsx(lusitana.className)}>
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Total</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((cartItem) => (
          <CartTableEntry key={cartItem.id} cartItem={cartItem} />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th colSpan={2} className={clsx(lusitana.className, "text-end text-xl")}>
            Total Qty:
          </th>
          <td className={clsx(lusitana.className, "text-xl font-bold")}>{totalQty}</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <th colSpan={3} className={clsx(lusitana.className, "text-end text-xl")}>
            Subtotal:
          </th>
          <td className={clsx(lusitana.className, styles["cart-table-view__subtotal"], "text-xl font-bold")}>{formatPrice(subTotal)}</td>
          <td>&nbsp;</td>
        </tr>
      </tfoot>
    </table>
  );
}
