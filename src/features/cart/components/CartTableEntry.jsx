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
      <td>
        <Link href={`/products/${productId}`}>
          <Image src={imageUrl} width={160} height={100} alt={name} className="m-auto rounded-lg object-cover" />
        </Link>
      </td>
      <td className="text-start">{name}</td>
      <td>{formatPrice(price)}</td>
      <td>
        <DecCartItemQtyForm cartItemId={id} />
      </td>
      <td>{quantity}</td>
      <td>
        <IncCartItemQtyForm cartItemId={id} />
      </td>
      <td>
        <DelCartItemForm cartItemId={id} />
      </td>
      <td className="text-end">{formatPrice(quantity * price)}</td>
    </tr>
  );
}
