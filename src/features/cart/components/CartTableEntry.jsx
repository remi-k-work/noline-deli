// component css styles
import styles from "./CartTableEntry.module.css";

// next
import Link from "next/link";
import Image from "next/image";

// other libraries
import clsx from "clsx";
import { formatPrice } from "@/lib/helpers";
import { routeToProductDetails, routeToProductImage } from "@/features/products/helpers";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

// components
import { IncCartItemQtyForm, DecCartItemQtyForm, DelCartItemForm } from "./CartTableForms";
import ProductInfo from "@/features/products/components/ProductInfo";

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
      <td className={styles["cart-table-entry-image"]}>
        <Link href={routeToProductDetails(name, productId)} className={styles["cart-table-entry-image__link"]}>
          <Image src={routeToProductImage(imageUrl)} width={640} height={400} alt={name} className="h-24 w-auto rounded-lg object-cover" />
        </Link>
        <details className={clsx(styles["cart-table-entry-image__info"], "dropdown")}>
          <summary className="btn btn-circle btn-info">
            <InformationCircleIcon width={24} height={24} />
          </summary>
          <div className="menu dropdown-content z-10 w-96 rounded-box bg-base-100 p-2 shadow">
            <ProductInfo product={product} />
          </div>
        </details>
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
