// component css styles
import styles from "./index.module.css";

// prisma and db access
import { OrderWithItems } from "../../db";

// other libraries
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/helpers";

// components
import { Table, TableBody, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Entry from "./Entry";

// assets
import { lusitana } from "@/assets/fonts";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";

// types
interface OrderDetailsProps {
  order: OrderWithItems;
  className?: string;
}

export default function OrderDetails({ order: { orderedItems, totalQty, subTotal, taxAmount, shippingCost, totalPaid }, className }: OrderDetailsProps) {
  return (
    <section className={cn(styles["order-details"], className)}>
      <h2 className={lusitana.className}>
        <ShoppingBagIcon width={64} height={64} />
        Order Details
      </h2>
      <Table>
        <TableHeader className={lusitana.className}>
          <TableRow>
            <TableHead className="w-[60%]">Item / Description</TableHead>
            <TableHead className="w-[20%] text-center">Qty</TableHead>
            <TableHead className="w-[20%] text-end">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderedItems.map((orderedItem) => (
            <Entry key={orderedItem.id} orderedItem={orderedItem} />
          ))}
        </TableBody>
        <TableFooter className={lusitana.className}>
          <TableRow>
            <TableHead className="text-end text-xl">Total Qty:</TableHead>
            <TableHead className="text-center text-xl">{totalQty}</TableHead>
            <TableHead>&nbsp;</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="text-end text-xl">Subtotal:</TableHead>
            <TableHead colSpan={2} className="overflow-clip whitespace-nowrap text-end text-xl">
              {formatPrice(subTotal)}
            </TableHead>
          </TableRow>
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
              {formatPrice(totalPaid)}
            </TableHead>
          </TableRow>
        </TableFooter>
      </Table>
    </section>
  );
}
