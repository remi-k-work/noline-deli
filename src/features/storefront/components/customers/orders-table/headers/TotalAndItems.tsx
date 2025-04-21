// prisma and db access
import type { OrderWithItems } from "@/features/storefront/db/types";

// other libraries
import type { Table } from "@tanstack/react-table";

// components
import { TableHead } from "@/components/ui/custom/table";
import ColumnHeader, { ColumnHeaderSkeleton } from "@/features/manager/components/ColumnHeader";

// types
interface TotalAndItemsHeaderProps {
  table: Table<OrderWithItems>;
}

export default function TotalAndItemsHeader({ table: { getColumn } }: TotalAndItemsHeaderProps) {
  return (
    <TableHead className="w-32 text-center">
      <ColumnHeader column={getColumn("totalPaid")!} title="Total" />
      <br />
      <ColumnHeader column={getColumn("totalQty")!} title="Items#" />
    </TableHead>
  );
}

export function TotalAndItemsHeaderSkeleton() {
  return (
    <TableHead className="w-32 text-center">
      <ColumnHeaderSkeleton title="Total" />
      <br />
      <ColumnHeaderSkeleton title="Items#" />
    </TableHead>
  );
}
