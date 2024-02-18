// component css styles
import styles from "./CartTableEntry.module.css";

// next
import Link from "next/link";
import Image from "next/image";

// other libraries
import clsx from "clsx";
import { formatPrice } from "@/lib/helpers";

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
        <Link href={`/products/${productId}`} className="transition-shadow hover:shadow-xl">
          <Image src={imageUrl} width={160} height={100} alt={name} className="rounded-lg object-cover" />
        </Link>
      </td>
      <td>{name}</td>
      <td>{formatPrice(price)}</td>
      <td>{quantity}</td>
      <td>{formatPrice(quantity * price)}</td>
    </tr>
  );
}
