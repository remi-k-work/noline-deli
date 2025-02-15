// other libraries
import { cn } from "@/lib/utils";
import { Table } from "@tanstack/react-table";
import { OrderRow } from "../Columns";

// components
import { TableHead } from "@/components/ui/custom/table";
import ColumnHeader from "../../../../components/ColumnHeader";

// types
interface CustomerProps {
  table: Table<OrderRow>;
  className?: string;
}

export default function Customer({ table: { getColumn }, className }: CustomerProps) {
  return (
    <TableHead className={cn("text-center", className)}>
      <ColumnHeader column={getColumn("customerEmail")!} title="Customer Email" />
      <br />
      <ColumnHeader column={getColumn("customerName")!} title="Customer Name" />
    </TableHead>
  );
}
