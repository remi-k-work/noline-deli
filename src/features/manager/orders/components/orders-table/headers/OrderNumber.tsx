// other libraries
import { Table } from "@tanstack/react-table";
import { OrderRow } from "../Columns";

// components
import { TableHead } from "@/components/ui/table";
import ColumnHeader from "../../../../components/ColumnHeader";

// types
interface OrderNumberProps {
  table: Table<OrderRow>;
  className?: string;
}

export default function OrderNumber({ table: { getColumn }, className }: OrderNumberProps) {
  return (
    <TableHead className={className}>
      <ColumnHeader column={getColumn("orderNumber")!} title="Order#" />
      <br />
      <ColumnHeader column={getColumn("created")!} title="Created" />
    </TableHead>
  );
}
