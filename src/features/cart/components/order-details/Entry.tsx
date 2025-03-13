// prisma and db access
import type { CartItemWithProduct } from "../../db/cart";

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
      <TableCell>
        {name}
        <small>
          <br />
          {category.name}
          <br />
          {subCategory?.name}
        </small>
      </TableCell>
      <TableCell className="overflow-clip text-end whitespace-nowrap">
        {quantity} / {formatCurrency(quantity * price)}
      </TableCell>
    </TableRow>
  );
}
