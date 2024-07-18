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
}

export default function CartTable({ cart }: CartTableProps) {
  const { cartItems, totalQty, subTotal } = cart;

  return (
    <Table className={styles["cart-table"]}>
      <TableHeader className={lusitana.className}>
        <TableRow>
          <TableHead className="w-[35%] text-center">Item</TableHead>
          <TableHead className="w-[20%] text-center">Qty</TableHead>
          <TableHead className="w-[30%] text-end">Total</TableHead>
          <TableHead className="w-[15%]">&nbsp;</TableHead>
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
          <TableHead className="text-center text-xl">{totalQty}</TableHead>
          <TableHead>&nbsp;</TableHead>
          <TableHead>&nbsp;</TableHead>
        </TableRow>
        <TableRow>
          <TableHead colSpan={2} className="text-end text-xl">
            Subtotal:
          </TableHead>
          <TableHead className="overflow-clip whitespace-nowrap text-end text-xl">{formatPrice(subTotal)}</TableHead>
          <TableHead>&nbsp;</TableHead>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
