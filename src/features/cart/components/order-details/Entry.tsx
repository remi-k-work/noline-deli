// prisma and db access
import type { CartItemWithProduct } from "@/features/cart/db/types";

// other libraries
import { formatCurrency } from "@/lib/formatters";

// components
import { TableCell, TableRow } from "@/components/ui/custom/table";

// types
interface EntryProps {
  orderedCartItem: CartItemWithProduct;
}

export default function Entry({ orderedCartItem }: EntryProps) {
  const {
    quantity,
    product: { name, price, category, subCategory },
  } = orderedCartItem;

  return (
    <TableRow>
      <TableCell className="truncate">
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
