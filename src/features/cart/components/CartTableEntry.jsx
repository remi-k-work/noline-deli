// component css styles
import styles from "./CartTableEntry.module.css";

// next
import Link from "next/link";
import Image from "next/image";

// other libraries
import { formatPrice } from "@/lib/helpers";
import { routeToProductDetails } from "@/features/products/helpers";
import PathFinder from "@/features/manager/PathFinder";

// components
import { IncCartItemQtyForm, DecCartItemQtyForm, DelCartItemForm } from "./CartTableForms";
import ProductInfoTrigger from "@/features/products/components/ProductInfoTrigger";

export default function CartTableEntry({ cartItem }) {
  // Ensure the cart item exists
  if (!cartItem) {
    // To prevent receiving the "cannot destructure property of undefined" exception, do not attempt to render anything
    return null;
  }

  const {
    id,
    productId,
    quantity,
    product,
    product: { name, imageUrl, price },
  } = cartItem;

  return (
    <tr className={styles["cart-table-entry"]}>
      <td>
        <div className={styles["cart-table-entry-image"]}>
          <Link href={routeToProductDetails(name, productId)} className={styles["cart-table-entry-image__link"]}>
            <Image
              src={PathFinder.toResolvedProductImage(imageUrl)}
              width={320}
              height={200}
              alt={name}
              sizes="50vw"
              className="max-h-24 w-full rounded-lg object-cover"
            />
          </Link>
          <ProductInfoTrigger product={product} className={styles["cart-table-entry-image__info"]} />
        </div>
      </td>
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
