// other libraries
import { cn } from "@/lib/utils";
import { Table } from "@tanstack/react-table";
import { OrderRow } from "../Columns";

// components
import { TableHead } from "@/components/ui/custom/table";
import ColumnHeader from "../../../../components/ColumnHeader";

// types
interface StatusProps {
  table: Table<OrderRow>;
  className?: string;
}

export default function Status({ table: { getColumn }, className }: StatusProps) {
  return (
    <TableHead className={cn("text-center", className)}>
      <ColumnHeader column={getColumn("status")!} title="Status" />
    </TableHead>
  );
}
