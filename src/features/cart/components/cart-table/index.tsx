// prisma and db access
import type { DerivedCartWithItems } from "@/features/cart/db/types";

// other libraries
import { formatCurrency } from "@/lib/formatters";

// components
import { Table, TableBody, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/custom/table";
import Entry from "./Entry";

// types
interface CartTableProps {
  cart: DerivedCartWithItems;
}

export default function CartTable({ cart }: CartTableProps) {
  const { cartItems, totalQty, subTotal } = cart;

  return (
    <Table>
      <TableHeader className="font-lusitana">
        <TableRow>
          <TableHead className="w-[70%]">Item</TableHead>
          <TableHead className="w-[30%] text-end">Qty / Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cartItems.map((cartItem) => (
          <Entry key={cartItem.id} cartItem={cartItem} />
        ))}
      </TableBody>
      <TableFooter className="font-lusitana">
        <TableRow>
          <TableHead className="text-end text-xl">Total Qty / Subtotal:</TableHead>
          <TableHead className="overflow-clip text-end text-xl whitespace-nowrap">
            {totalQty} / {formatCurrency(subTotal)}
          </TableHead>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
