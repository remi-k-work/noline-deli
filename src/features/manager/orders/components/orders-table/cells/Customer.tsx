// other libraries
import { Row } from "@tanstack/react-table";
import { OrderRow } from "../Columns";

// components
import { TableCell } from "@/components/ui/table";

// types
interface CustomerProps {
  row: Row<OrderRow>;
}

export default function Customer({ row: { getValue } }: CustomerProps) {
  return (
    <TableCell className="text-center">
      {getValue("customerEmail")}
      <br />
      {getValue("customerName")}
    </TableCell>
  );
}
