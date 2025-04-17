// prisma and db access
import type { OrderWithItems } from "@/features/manager/orders/db";

// other libraries
import type { Row } from "@tanstack/react-table";

// components
import { TableCell } from "@/components/ui/custom/table";

// types
interface CustomerProps {
  row: Row<OrderWithItems>;
}

export default function Customer({ row: { getValue } }: CustomerProps) {
  return (
    <TableCell className="text-center">
      <b className="truncate">{getValue("customerEmail")}</b>
      <br />
      {getValue("customerName")}
    </TableCell>
  );
}
