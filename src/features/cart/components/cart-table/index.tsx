// prisma and db access
import type { DerivedCartWithItems } from "@/features/cart/db/cart";

// other libraries
import { formatCurrency } from "@/lib/formatters";

// components
import { Table, TableBody, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/custom/table";
import Entry from "./Entry";

// types
interface CartTableProps {
  cart: DerivedCartWithItems;
  shippingCost?: number;
}

export default function CartTable({ cart, shippingCost }: CartTableProps) {
  const { cartItems, totalQty, subTotal, taxAmount } = cart;

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
        {shippingCost && (
          <>
            <TableRow>
              <TableHead className="text-end text-xl">Taxes:</TableHead>
              <TableHead className="overflow-clip text-end text-xl whitespace-nowrap">{formatCurrency(taxAmount)}</TableHead>
            </TableRow>
            <TableRow>
              <TableHead className="text-end text-xl">Shipping:</TableHead>
              <TableHead className="overflow-clip text-end text-xl whitespace-nowrap">{formatCurrency(shippingCost)}</TableHead>
            </TableRow>
            <TableRow>
              <TableHead className="text-end text-2xl underline">TOTAL:</TableHead>
              <TableHead className="overflow-clip text-end text-2xl whitespace-nowrap underline">
                {formatCurrency(subTotal + taxAmount + shippingCost)}
              </TableHead>
            </TableRow>
          </>
        )}
      </TableFooter>
    </Table>
  );
}
