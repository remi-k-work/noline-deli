// prisma and db access
import type { CartItemWithProduct } from "@/features/cart/db/types";

// other libraries
import { formatCurrency } from "@/lib/formatters";
import PathFinder from "@/lib/PathFinder";

// components
import { TableCell, TableRow } from "@/components/ui/custom/table";
import ItemImageWithTrigger from "@/components/ItemImageWithTrigger";
import { IncCartItemQtyButton, DecCartItemQtyButton, DelCartItemButton } from "./Actions";

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
    product: { name, price },
  },
}: EntryProps) {
  return (
    <TableRow className="odd:bg-surface-3 even:bg-surface-4">
      <TableCell>
        <section className="flex items-center gap-1">
          <ItemImageWithTrigger product={product} href={PathFinder.toSfProductDetails(name, productId)} />
          <footer className="flex flex-col items-center gap-1">
            <IncCartItemQtyButton cartItem={cartItem} />
            <DelCartItemButton cartItem={cartItem} />
            <DecCartItemQtyButton cartItem={cartItem} />
          </footer>
        </section>
      </TableCell>
      <TableCell className="overflow-clip text-end whitespace-nowrap">
        {quantity} / {formatCurrency(quantity * price)}
      </TableCell>
    </TableRow>
  );
}
