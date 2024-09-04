// prisma and db access
import { CartItemWithProduct } from "../../db/cart";

// other libraries
import { formatPrice } from "@/lib/helpers";

// components
import { TableCell, TableRow } from "@/components/ui/table";

// types
interface EntryProps {
  orderedCartItem: CartItemWithProduct;
}

export default function Entry({ orderedCartItem }: EntryProps) {
  const {
    quantity,
    product: { name, price },
  } = orderedCartItem;

  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell className="overflow-clip text-center">{quantity}</TableCell>
      <TableCell className="overflow-clip whitespace-nowrap text-end">{formatPrice(quantity * price)}</TableCell>
    </TableRow>
  );
}
