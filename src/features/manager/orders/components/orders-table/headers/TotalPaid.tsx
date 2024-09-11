// other libraries
import { cn } from "@/lib/utils";
import { Table } from "@tanstack/react-table";
import { OrderRow } from "../Columns";

// components
import { TableHead } from "@/components/ui/table";
import ColumnHeader from "../../../../components/ColumnHeader";

// types
interface TotalPaidProps {
  table: Table<OrderRow>;
  className?: string;
}

export default function TotalPaid({ table: { getColumn }, className }: TotalPaidProps) {
  return (
    <TableHead className={cn("text-center", className)}>
      <ColumnHeader column={getColumn("totalPaid")!} title="Total" />
      <br />
      <ColumnHeader column={getColumn("totalQty")!} title="Items#" />
      <br />
      <ColumnHeader column={getColumn("shippingMethod")!} title="Shipping" />
    </TableHead>
  );
}
