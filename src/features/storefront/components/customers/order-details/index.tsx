// prisma and db access
import type { OrderWithItems } from "@/features/storefront/db/types";

// other libraries
import { formatCurrency } from "@/lib/formatters";

// components
import { Table, TableBody, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/custom/table";
import Entry from "./Entry";

// types
interface OrderDetailsProps {
  order: OrderWithItems;
}

export default function OrderDetails({ order: { orderedItems, totalQty, subTotal, taxAmount, shippingCost, totalPaid } }: OrderDetailsProps) {
  return (
    <Table className="w-full table-fixed border-collapse">
      <TableHeader className="font-lusitana text-base">
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
      <TableFooter className="font-lusitana text-base">
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
  );
}
