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
      <thead className={clsx(lusitana.className, "font-bold")}>
        <tr>
          <th>Item</th>
          <th className="text-start">Name and Description</th>
          <th>Price</th>
          <th>&nbsp;</th>
          <th>Qty</th>
          <th>&nbsp;</th>
          <th>&nbsp;</th>
          <th className="text-end">Total</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((cartItem) => (
          <CartTableEntry key={cartItem.id} cartItem={cartItem} />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={4} className={clsx(lusitana.className, "text-end text-xl font-bold")}>
            Total Qty:
          </td>
          <td className={clsx(lusitana.className, "text-xl font-bold")}>{totalQty}</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td colSpan={7} className={clsx(lusitana.className, "text-end text-xl font-bold")}>
            Subtotal:
          </td>
          <td className={clsx(lusitana.className, "text-end text-xl font-bold")}>{formatPrice(subTotal)}</td>
        </tr>
      </tfoot>
    </table>
  );
}
