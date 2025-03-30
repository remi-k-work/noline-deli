// prisma and db access
import type { OrderWithItems } from "@/features/storefront/db/types";

// other libraries
import { cn } from "@/lib/utils";
import type { Table } from "@tanstack/react-table";

// components
import { TableHead } from "@/components/ui/custom/table";
import ColumnHeader from "@/features/manager/components/ColumnHeader";

// types
interface TotalAndItemsProps {
  table: Table<OrderWithItems>;
  className?: string;
}

export default function TotalAndItems({ table: { getColumn }, className }: TotalAndItemsProps) {
  return (
    <TableHead className={cn("text-center", className)}>
      <ColumnHeader column={getColumn("totalPaid")!} title="Total" />
      <br />
      <ColumnHeader column={getColumn("totalQty")!} title="Items#" />
    </TableHead>
  );
}
