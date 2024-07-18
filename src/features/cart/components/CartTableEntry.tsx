// component css styles
import styles from "./CartTableEntry.module.css";

// next
import Link from "next/link";
import Image from "next/image";

// prisma and db access
import { CartItemWithProduct } from "../cartDb";

// other libraries
import { formatPrice } from "@/lib/helpers";
import { routeToProductDetails } from "@/features/products/helpers";
import PathFinder from "@/features/manager/PathFinder";

// components
import { TableCell, TableRow } from "@/components/ui/table";
import { IncCartItemQtyForm, DecCartItemQtyForm, DelCartItemForm } from "./CartTableForms";
import ProductInfoTrigger from "@/features/products/components/ProductInfoTrigger";

// types
interface CartTableEntryProps {
  cartItem: CartItemWithProduct;
}

export default function CartTableEntry({ cartItem }: CartTableEntryProps) {
  const {
    id,
    productId,
    quantity,
    product,
    product: { name, imageUrl, price },
  } = cartItem;

  return (
    <TableRow className="odd:bg-[--surface-3] even:bg-[--surface-4]">
      <TableCell>
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
      </TableCell>
      <TableCell>
        <div className="flex flex-col place-content-center place-items-center gap-1 sm:flex-row sm:gap-3">
          <IncCartItemQtyForm cartItemId={id} />
          {quantity}
          <DecCartItemQtyForm cartItemId={id} />
        </div>
      </TableCell>
      <TableCell className="overflow-clip whitespace-nowrap text-end">{formatPrice(quantity * price)}</TableCell>
      <TableCell className="overflow-clip text-center">
        <DelCartItemForm cartItemId={id} productName={name} productImageUrl={imageUrl} productPrice={price} />
      </TableCell>
    </TableRow>
  );
}
