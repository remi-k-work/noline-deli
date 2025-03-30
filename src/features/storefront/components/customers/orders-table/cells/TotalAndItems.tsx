// prisma and db access
import type { OrderWithItems } from "@/features/storefront/db/types";

// other libraries
import type { Row } from "@tanstack/react-table";
import { formatCurrency } from "@/lib/formatters";

// components
import { TableCell } from "@/components/ui/custom/table";

// types
interface TotalAndItemsProps {
  row: Row<OrderWithItems>;
}

export default function TotalAndItems({ row: { getValue } }: TotalAndItemsProps) {
  return (
    <TableCell className="text-center">
      <b>{formatCurrency(getValue("totalPaid"))}</b>
      <br />
      {getValue("totalQty")}
    </TableCell>
  );
}
