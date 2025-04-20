// prisma and db access
import type { OrderWithItems } from "@/features/storefront/db/types";

// other libraries
import { formatCurrency, formatDateTime } from "@/lib/formatters";

// components
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/custom/table";
import ProductPreview from "@/features/storefront/components/products/ProductPreview";

// assets
import { ClockIcon } from "@heroicons/react/24/solid";

// types
interface OrderExcerptProps {
  order: OrderWithItems;
}

export default function OrderExcerpt({ order: { orderNumber, created, totalQty, totalPaid, orderedItems } }: OrderExcerptProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="bg-surface-2 font-lusitana w-[50%]">Order#:</TableHead>
          <TableHead className="bg-surface-3 w-[50%] truncate text-end">{orderNumber}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-lusitana bg-surface-2">Created:</TableCell>
          <TableCell className="bg-surface-3 text-end">
            <span className="flex items-center justify-end gap-2">
              <ClockIcon width={24} height={24} className="min-w-max" />
              <span className="truncate">{formatDateTime(created)}</span>
            </span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={2} className="overflow-x-auto">
            <div className="flex gap-4">
              {orderedItems.map((orderedItem) => (
                <ProductPreview key={orderedItem.id} kind="ordered" orderedItem={orderedItem} />
              ))}
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableHead className="font-lusitana">Items# / Total:</TableHead>
          <TableHead className="truncate text-end">
            {totalQty} / {formatCurrency(totalPaid)}
          </TableHead>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
