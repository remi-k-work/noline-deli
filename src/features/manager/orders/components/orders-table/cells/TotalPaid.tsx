// other libraries
import { Row } from "@tanstack/react-table";
import { formatPrice } from "@/lib/helpers";
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
      {getValue("totalQty")}
      <br />
      <b>{formatPrice(getValue("totalPaid"))}</b>
      <hr className="border-dotted" />
      {getValue("shippingMethod")}
    </TableCell>
  );
}
