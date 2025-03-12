// other libraries
import { cn } from "@/lib/utils";
import type { Table } from "@tanstack/react-table";
import type { OrderRow } from "@/features/manager/orders/components/orders-table/Columns";

// components
import { TableHead } from "@/components/ui/custom/table";
import ColumnHeader from "@/features/manager/components/ColumnHeader";

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
