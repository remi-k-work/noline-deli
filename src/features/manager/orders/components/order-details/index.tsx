// component css styles
import styles from "./index.module.css";

// prisma and db access
import type { OrderWithItems } from "../../db";

// other libraries
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/formatters";

// components
import { Table, TableBody, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/custom/table";
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
            <TableHead className="w-[70%]">Item and Description</TableHead>
            <TableHead className="w-[30%] text-end">
              Qty / Total
              <br />
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderedItems.map((orderedItem) => (
            <Entry key={orderedItem.id} orderedItem={orderedItem} />
          ))}
        </TableBody>
        <TableFooter className={lusitana.className}>
          <TableRow>
            <TableHead className="text-end text-xl">Total Qty / Subtotal:</TableHead>
            <TableHead className="overflow-clip whitespace-nowrap text-end text-xl">
              {totalQty} / {formatCurrency(subTotal)}
            </TableHead>
          </TableRow>
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
            <TableHead className="overflow-clip whitespace-nowrap text-end text-2xl underline">{formatCurrency(totalPaid)}</TableHead>
          </TableRow>
        </TableFooter>
      </Table>
    </section>
  );
}
