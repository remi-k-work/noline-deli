// prisma and db access
import { DerivedCartWithItems } from "../../db/cart";

// other libraries
import { formatCurrency } from "@/lib/formatters";

// components
import { Table, TableBody, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Entry from "./Entry";

// assets
import { lusitana } from "@/assets/fonts";

// types
interface CartTableProps {
  cart: DerivedCartWithItems;
  shippingCost?: number;
}

export default function CartTable({ cart, shippingCost }: CartTableProps) {
  const { cartItems, totalQty, subTotal, taxAmount } = cart;

  return (
    <Table>
      <TableHeader className={lusitana.className}>
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
      <TableFooter className={lusitana.className}>
        <TableRow>
          <TableHead className="text-end text-xl">Total Qty / Subtotal:</TableHead>
          <TableHead className="overflow-clip whitespace-nowrap text-end text-xl">
            {totalQty} / {formatCurrency(subTotal)}
          </TableHead>
        </TableRow>
        {shippingCost && (
          <>
            <TableRow>
              <TableHead className="text-end text-xl">Taxes:</TableHead>
              <TableHead className="overflow-clip whitespace-nowrap text-end text-xl">{formatCurrency(taxAmount)}</TableHead>
            </TableRow>
            <TableRow>
              <TableHead className="text-end text-xl">Shipping:</TableHead>
              <TableHead className="overflow-clip whitespace-nowrap text-end text-xl">{formatCurrency(shippingCost)}</TableHead>
            </TableRow>
            <TableRow>
              <TableHead className="text-end text-2xl underline">TOTAL:</TableHead>
              <TableHead className="overflow-clip whitespace-nowrap text-end text-2xl underline">
                {formatCurrency(subTotal + taxAmount + shippingCost)}
              </TableHead>
            </TableRow>
          </>
        )}
      </TableFooter>
    </Table>
  );
}
