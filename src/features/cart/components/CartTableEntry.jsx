// component css styles
import styles from "./CartTableEntry.module.css";

// next
import Link from "next/link";
import Image from "next/image";

// other libraries
import clsx from "clsx";
import { formatPrice } from "@/lib/helpers";

// components
import { IncCartItemQtyForm, DecCartItemQtyForm, DelCartItemForm } from "./CartTableForms";

export default function CartTableEntry({ cartItem }) {
  // Ensure the cart item exists
  if (!cartItem) {
    // To prevent receiving the "cannot destructure property of undefined" exception, do not attempt to render anything
    return null;
  }

  const {
    id,
    cartId,
    productId,
    quantity,
    product: { name, imageUrl, price },
  } = cartItem;

  return (
    <tr className={styles["cart-table-entry"]}>
      <td className="text-start">
        <Link href={`/products/${productId}`}>
          <Image src={imageUrl} width={160} height={100} alt={name} className="rounded-lg object-cover" />
          <p>{name}</p>
        </Link>
      </td>
      <td className="text-xs sm:text-base">{formatPrice(price)}</td>
      <td>
        <div className="flex flex-col place-content-center gap-1 sm:flex-row sm:gap-3">
          <IncCartItemQtyForm cartItemId={id} />
          {quantity}
          <DecCartItemQtyForm cartItemId={id} />
        </div>
      </td>
      <td className="text-end text-xs sm:text-base">{formatPrice(quantity * price)}</td>
      <td>
        <DelCartItemForm cartItemId={id} />
      </td>
    </tr>
  );
}
