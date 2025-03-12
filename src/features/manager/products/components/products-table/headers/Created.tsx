// other libraries
import { cn } from "@/lib/utils";
import type { Table } from "@tanstack/react-table";
import type { ProductRow } from "@/features/manager/products/components/products-table/Columns";

// components
import { TableHead } from "@/components/ui/custom/table";
import ColumnHeader from "@/features/manager/components/ColumnHeader";

// types
interface CreatedProps {
  table: Table<ProductRow>;
  className?: string;
}

export default function Created({ table: { getColumn }, className }: CreatedProps) {
  return (
    <TableHead className={cn("text-center", className)}>
      <ColumnHeader column={getColumn("brandName")!} title="Brand Name" />
      <br />
      <ColumnHeader column={getColumn("createdAt")!} title="Created At" />
      <br />
      <ColumnHeader column={getColumn("updatedAt")!} title="Updated At" />
    </TableHead>
  );
}
