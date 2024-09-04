// component css styles
import styles from "./Entry.module.css";

// next
import Link from "next/link";
import Image from "next/image";

// prisma and db access
import { CartItemWithProduct } from "../../db/cart";

// other libraries
import { formatPrice } from "@/lib/helpers";
import { routeToProductDetails } from "@/features/products/helpers";
import PathFinder from "@/features/manager/PathFinder";

// components
import { TableCell, TableRow } from "@/components/ui/table";
import { IncCartItemQtyForm, DecCartItemQtyForm, DelCartItemForm } from "./Forms";
import ProductInfoTrigger from "@/features/products/components/ProductInfoTrigger";

// types
interface EntryProps {
  cartItem: CartItemWithProduct;
}

export default function Entry({ cartItem }: EntryProps) {
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
        <div className={styles["entry-image"]}>
          <Link href={routeToProductDetails(name, productId)} className={styles["entry-image__link"]}>
            <Image
              src={PathFinder.toResolvedProductImage(imageUrl)}
              width={320}
              height={200}
              alt={name}
              sizes="50vw"
              className="max-h-24 w-full rounded-lg object-cover"
            />
          </Link>
          <ProductInfoTrigger product={product} className={styles["entry-image__info"]} />
        </div>
      </TableCell>
      <TableCell className="overflow-clip">
        <section className="flex items-center gap-1">
          <header className="flex flex-col items-center gap-1">
            <IncCartItemQtyForm cartItemId={id} />
            {quantity}
            <DecCartItemQtyForm cartItemId={id} />
          </header>
          <footer>
            <DelCartItemForm cartItemId={id} productName={name} productImageUrl={imageUrl} productPrice={price} />
          </footer>
        </section>
      </TableCell>
      <TableCell className="overflow-clip whitespace-nowrap text-end">{formatPrice(quantity * price)}</TableCell>
    </TableRow>
  );
}
