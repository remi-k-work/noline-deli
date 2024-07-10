// component css styles
import styles from "./CartTableView.module.css";

// other libraries
import { cn } from "@/lib/utils";
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
      <thead className={cn(lusitana.className)}>
        <tr>
          <th>Item</th>
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
          <th className={cn(lusitana.className, "text-end text-xl")}>Qty:</th>
          <td className={cn(lusitana.className, "text-xl font-bold")}>{totalQty}</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <th colSpan={2} className={cn(lusitana.className, "text-end text-xl")}>
            Subtotal:
          </th>
          <td className={cn(lusitana.className, styles["cart-table-view__subtotal"], "text-xl font-bold")}>{formatPrice(subTotal)}</td>
          <td>&nbsp;</td>
        </tr>
      </tfoot>
    </table>
  );
}
