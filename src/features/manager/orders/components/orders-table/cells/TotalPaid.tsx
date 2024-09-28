// other libraries
import { Row } from "@tanstack/react-table";
import { formatCurrency } from "@/lib/formatters";
import { OrderRow } from "../Columns";

// components
import { TableCell } from "@/components/ui/table";

// types
interface TotalPaidProps {
  row: Row<OrderRow>;
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
