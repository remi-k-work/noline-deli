// prisma and db access
import type { CartItemWithProduct } from "@/features/cart/db/types";

// other libraries
import { formatCurrency } from "@/lib/formatters";
import PathFinder from "@/lib/PathFinder";

// components
import { TableCell, TableRow } from "@/components/ui/custom/table";
import ItemImageWithTrigger, { ItemImageWithTriggerSkeleton } from "@/components/ItemImageWithTrigger";
import IncCartItem, { IncCartItemSkeleton } from "./actions/IncCartItem";
import DelCartItem, { DelCartItemSkeleton } from "./actions/DelCartItem";
import DecCartItem, { DecCartItemSkeleton } from "./actions/DecCartItem";

// types
interface EntryProps {
  cartItem: CartItemWithProduct;
}

export default function Entry({
  cartItem,
  cartItem: {
    productId,
    quantity,
    product,
    product: { name, price, category, subCategory },
  },
}: EntryProps) {
  return (
    <TableRow className="odd:bg-surface-3 even:bg-surface-4">
      <TableCell>
        <section className="flex items-center gap-1">
          <ItemImageWithTrigger product={product} href={PathFinder.toSfProductDetails(name, productId)} />
          <footer className="flex flex-col items-center gap-1">
            <IncCartItem cartItem={cartItem} />
            <DelCartItem cartItem={cartItem} />
            <DecCartItem cartItem={cartItem} />
          </footer>
        </section>
      </TableCell>
      <TableCell className="collapse truncate sm:visible">
        {name}
        <br />
        <small>
          {category.name}
          {subCategory && (
            <>
              <br />
              {subCategory.name}
            </>
          )}
        </small>
      </TableCell>
      <TableCell className="truncate text-end">
        {quantity} / {formatCurrency(quantity * price)}
      </TableCell>
    </TableRow>
  );
}

export function EntrySkeleton() {
  return (
    <TableRow className="odd:bg-surface-3 even:bg-surface-4">
      <TableCell>
        <section className="flex items-center gap-1">
          <ItemImageWithTriggerSkeleton />
          <footer className="flex flex-col items-center gap-1">
            <IncCartItemSkeleton />
            <DelCartItemSkeleton />
            <DecCartItemSkeleton />
          </footer>
        </section>
      </TableCell>
      <TableCell className="collapse sm:visible">
        <div className="bg-background h-4.5 animate-pulse"></div>
        <div className="bg-background h-3.5 animate-pulse"></div>
        <div className="bg-background h-3.5 animate-pulse"></div>
      </TableCell>
      <TableCell className="truncate text-end">
        <div className="bg-background h-4.5 animate-pulse"></div>
      </TableCell>
    </TableRow>
  );
}
