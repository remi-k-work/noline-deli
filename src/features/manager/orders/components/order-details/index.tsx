// component css styles
import styles from "./index.module.css";

// prisma and db access
import type { OrderWithItems } from "@/features/manager/orders/db";

// other libraries
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/formatters";

// components
import { Table, TableBody, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/custom/table";
import Entry from "./Entry";

// assets
import { ShoppingBagIcon } from "@heroicons/react/24/solid";

// types
interface OrderDetailsProps {
  order: OrderWithItems;
  className?: string;
}

export default function OrderDetails({ order: { orderedItems, totalQty, subTotal, taxAmount, shippingCost, totalPaid }, className }: OrderDetailsProps) {
  return (
    <section className={cn(styles["order-details"], className)}>
      <h2 className="font-lusitana">
        <ShoppingBagIcon width={64} height={64} />
        Order Details
      </h2>
      <Table>
        <TableHeader className="font-lusitana">
          <TableRow>
            <TableHead className="w-46">Item and Description</TableHead>
            <TableHead className="collapse w-[0%] sm:visible sm:w-[100%]">&nbsp;</TableHead>
            <TableHead className="w-42 text-end">
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
        <TableFooter className="font-lusitana">
          <TableRow>
            <TableHead colSpan={2} className="text-end">
              Total Qty / Subtotal:
            </TableHead>
            <TableHead className="truncate text-end">
              {totalQty} / {formatCurrency(subTotal)}
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead colSpan={2} className="text-end">
              Taxes:
            </TableHead>
            <TableHead className="truncate text-end">{formatCurrency(taxAmount)}</TableHead>
          </TableRow>
          <TableRow>
            <TableHead colSpan={2} className="text-end">
              Shipping:
            </TableHead>
            <TableHead className="truncate text-end">{formatCurrency(shippingCost)}</TableHead>
          </TableRow>
          <TableRow>
            <TableHead colSpan={2} className="text-end underline">
              TOTAL:
            </TableHead>
            <TableHead className="truncate text-end underline">{formatCurrency(totalPaid)}</TableHead>
          </TableRow>
        </TableFooter>
      </Table>
    </section>
  );
}
