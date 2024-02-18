// component css styles
import styles from "./CartTableView.module.css";

// next
import Image from "next/image";

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
          <th>Thumbnail</th>
          <th>Name/Description</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((cartItem) => (
          <CartTableEntry key={cartItem.id} cartItem={cartItem} />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={4} className="text-end">
            Total Qty
          </td>
          <td>{totalQty}</td>
        </tr>
        <tr>
          <td colSpan={4} className="text-end">
            Subtotal
          </td>
          <td>{formatPrice(subTotal)}</td>
        </tr>
      </tfoot>
    </table>
  );
}
