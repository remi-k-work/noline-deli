// other libraries
import type { Row } from "@tanstack/react-table";
import type { OrderRow } from "@/features/manager/orders/components/orders-table/Columns";

// components
import { TableCell } from "@/components/ui/custom/table";

// types
interface CustomerProps {
  row: Row<OrderRow>;
}

export default function Customer({ row: { getValue } }: CustomerProps) {
  return (
    <TableCell className="text-center">
      <b>{getValue("customerEmail")}</b>
      <br />
      {getValue("customerName")}
    </TableCell>
  );
}
