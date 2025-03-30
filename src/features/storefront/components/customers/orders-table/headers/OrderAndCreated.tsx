// prisma and db access
import type { OrderWithItems } from "@/features/storefront/db/types";

// other libraries
import { cn } from "@/lib/utils";
import type { Table } from "@tanstack/react-table";

// components
import { TableHead } from "@/components/ui/custom/table";
import ColumnHeader from "@/features/manager/components/ColumnHeader";

// types
interface OrderAndCreatedProps {
  table: Table<OrderWithItems>;
  className?: string;
}

export default function OrderAndCreated({ table: { getColumn }, className }: OrderAndCreatedProps) {
  return (
    <TableHead className={cn("text-center", className)}>
      <ColumnHeader column={getColumn("orderNumber")!} title="Order#" />
      <br />
      <ColumnHeader column={getColumn("created")!} title="Created" />
    </TableHead>
  );
}
