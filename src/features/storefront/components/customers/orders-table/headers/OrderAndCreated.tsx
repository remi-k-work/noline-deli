// prisma and db access
import type { OrderWithItems } from "@/features/storefront/db/types";

// other libraries
import type { Table } from "@tanstack/react-table";

// components
import { TableHead } from "@/components/ui/custom/table";
import ColumnHeader, { ColumnHeaderSkeleton } from "@/features/manager/components/ColumnHeader";

// types
interface OrderAndCreatedHeaderProps {
  table: Table<OrderWithItems>;
}

export default function OrderAndCreatedHeader({ table: { getColumn } }: OrderAndCreatedHeaderProps) {
  return (
    <TableHead className="w-80 text-center">
      <ColumnHeader column={getColumn("orderNumber")!} title="Order#" />
      <br />
      <ColumnHeader column={getColumn("created")!} title="Created" />
    </TableHead>
  );
}

export function OrderAndCreatedHeaderSkeleton() {
  return (
    <TableHead className="w-80 text-center">
      <ColumnHeaderSkeleton title="Order#" />
      <br />
      <ColumnHeaderSkeleton title="Created" />
    </TableHead>
  );
}
