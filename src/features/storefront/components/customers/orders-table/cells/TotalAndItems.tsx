// prisma and db access
import type { OrderWithItems } from "@/features/storefront/db/types";

// other libraries
import type { Row } from "@tanstack/react-table";
import { formatCurrency } from "@/lib/formatters";

// components
import { TableCell } from "@/components/ui/custom/table";

// types
interface TotalAndItemsCellProps {
  row: Row<OrderWithItems>;
}

export default function TotalAndItemsCell({ row: { getValue } }: TotalAndItemsCellProps) {
  return (
    <TableCell className="text-center">
      <b>{formatCurrency(getValue("totalPaid"))}</b>
      <br />
      {getValue("totalQty")}
    </TableCell>
  );
}

export function TotalAndItemsCellSkeleton() {
  return (
    <TableCell className="text-center">
      <div className="bg-background mx-auto h-5 w-18 animate-pulse"></div>
      <div className="bg-background mx-auto h-5 w-5 animate-pulse"></div>
    </TableCell>
  );
}
