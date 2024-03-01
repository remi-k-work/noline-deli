// component css styles
import styles from "./CartTableEntry.module.css";

// next
import Link from "next/link";
import Image from "next/image";

// other libraries
import { formatPrice } from "@/lib/helpers";
import { routeToProductDetails, routeToProductImage } from "@/features/products/helpers";

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
        <Link href={routeToProductDetails(name, productId)}>
          <Image src={routeToProductImage(imageUrl)} width={640} height={400} alt={name} className="h-24 w-auto rounded-lg object-cover" />
          <p>{name}</p>
        </Link>
      </td>
      <td>{formatPrice(price)}</td>
      <td>
        <div className="flex flex-col place-content-center gap-1 sm:flex-row sm:gap-3">
          <IncCartItemQtyForm cartItemId={id} />
          {quantity}
          <DecCartItemQtyForm cartItemId={id} />
        </div>
      </td>
      <td>{formatPrice(quantity * price)}</td>
      <td>
        <DelCartItemForm cartItemId={id} />
      </td>
    </tr>
  );
}
