// component css styles
import styles from "./CartTable.module.css";

// prisma and db access
import { DerivedCartWithItems } from "../cartDb";

// other libraries
import { formatPrice } from "@/lib/helpers";

// components
import { Table, TableBody, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CartTableEntry from "./CartTableEntry";

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
    <Table className={styles["cart-table"]}>
      <TableHeader className={lusitana.className}>
        <TableRow>
          <TableHead className="w-[44%]">Item</TableHead>
          <TableHead className="w-[24%]">Qty</TableHead>
          <TableHead className="w-[32%] text-end">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cartItems.map((cartItem) => (
          <CartTableEntry key={cartItem.id} cartItem={cartItem} />
        ))}
      </TableBody>
      <TableFooter className={lusitana.className}>
        <TableRow>
          <TableHead className="text-end text-xl">Total Qty:</TableHead>
          <TableHead className="text-xl">{totalQty}</TableHead>
          <TableHead>&nbsp;</TableHead>
        </TableRow>
        <TableRow>
          <TableHead className="text-end text-xl">Subtotal:</TableHead>
          <TableHead colSpan={2} className="overflow-clip whitespace-nowrap text-end text-xl">
            {formatPrice(subTotal)}
          </TableHead>
        </TableRow>
        {shippingCost && (
          <>
            <TableRow>
              <TableHead className="text-end text-xl">Taxes:</TableHead>
              <TableHead colSpan={2} className="overflow-clip whitespace-nowrap text-end text-xl">
                {formatPrice(taxAmount)}
              </TableHead>
            </TableRow>
            <TableRow>
              <TableHead className="text-end text-xl">Shipping:</TableHead>
              <TableHead colSpan={2} className="overflow-clip whitespace-nowrap text-end text-xl">
                {formatPrice(shippingCost)}
              </TableHead>
            </TableRow>
            <TableRow>
              <TableHead className="text-end text-2xl underline">TOTAL:</TableHead>
              <TableHead colSpan={2} className="overflow-clip whitespace-nowrap text-end text-2xl underline">
                {formatPrice(subTotal + taxAmount + shippingCost)}
              </TableHead>
            </TableRow>
          </>
        )}
      </TableFooter>
    </Table>
  );
}
