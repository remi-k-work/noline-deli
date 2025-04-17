// prisma and db access
import type { OrderWithItems } from "@/features/manager/orders/db";

// other libraries
import type { Row } from "@tanstack/react-table";
import { formatCurrency } from "@/lib/formatters";

// components
import { TableCell } from "@/components/ui/custom/table";

// types
interface TotalPaidProps {
  row: Row<OrderWithItems>;
}

export default function TotalPaid({ row: { getValue } }: TotalPaidProps) {
  return (
    <TableCell className="text-center">
      <b>{formatCurrency(getValue("totalPaid"))}</b>
      <br />
      {getValue("totalQty")}
      <br />
      {getValue("shippingMethod")}
    </TableCell>
  );
}
