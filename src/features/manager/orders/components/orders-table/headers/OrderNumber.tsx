// prisma and db access
import type { OrderWithItems } from "@/features/manager/orders/db";

// other libraries
import { cn } from "@/lib/utils";
import type { Table } from "@tanstack/react-table";

// components
import { TableHead } from "@/components/ui/custom/table";
import ColumnHeader from "@/features/manager/components/ColumnHeader";

// types
interface OrderNumberProps {
  table: Table<OrderWithItems>;
  className?: string;
}

export default function OrderNumber({ table: { getColumn }, className }: OrderNumberProps) {
  return (
    <TableHead className={cn("text-center", className)}>
      <ColumnHeader column={getColumn("orderNumber")!} title="Order#" />
      <br />
      <ColumnHeader column={getColumn("created")!} title="Created" />
    </TableHead>
  );
}
