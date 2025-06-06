// prisma and db access
import type { ProductWithInfo } from "@/features/manager/products/db";

// other libraries
import { cn } from "@/lib/utils";
import type { Table } from "@tanstack/react-table";

// components
import { TableHead } from "@/components/ui/custom/table";
import ColumnHeader from "@/features/manager/components/ColumnHeader";

// types
interface PriceProps {
  table: Table<ProductWithInfo>;
  className?: string;
}

export default function Price({ table: { getColumn }, className }: PriceProps) {
  return (
    <TableHead className={cn("text-center", className)}>
      <ColumnHeader column={getColumn("price")!} title="Price" />
      <br />
      <ColumnHeader column={getColumn("images")!} title="Images#" />
      <br />
      <ColumnHeader column={getColumn("popularity")!} title="Popularity#" />
    </TableHead>
  );
}
