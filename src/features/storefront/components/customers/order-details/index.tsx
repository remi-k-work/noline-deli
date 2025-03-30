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
      <TableFooter className="font-lusitana text-base">
        <TableRow>
          <TableHead className="text-end">Total Qty / Subtotal:</TableHead>
          <TableHead className="overflow-clip text-end whitespace-nowrap">
            {totalQty} / {formatCurrency(subTotal)}
          </TableHead>
        </TableRow>
        <TableRow>
          <TableHead className="text-end">Taxes:</TableHead>
          <TableHead className="overflow-clip text-end whitespace-nowrap">{formatCurrency(taxAmount)}</TableHead>
        </TableRow>
        <TableRow>
          <TableHead className="text-end">Shipping:</TableHead>
          <TableHead className="overflow-clip text-end whitespace-nowrap">{formatCurrency(shippingCost)}</TableHead>
        </TableRow>
        <TableRow>
          <TableHead className="text-end underline">TOTAL:</TableHead>
          <TableHead className="overflow-clip text-end whitespace-nowrap underline">{formatCurrency(totalPaid)}</TableHead>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
