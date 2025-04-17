// prisma and db access
import type { ProductWithInfo } from "@/features/manager/products/db";

// other libraries
import type { Table } from "@tanstack/react-table";

// components
import { TableHead } from "@/components/ui/custom/table";
import ColumnHeader from "@/features/manager/components/ColumnHeader";

// types
interface NameProps {
  table: Table<ProductWithInfo>;
  className?: string;
}

export default function Name({ table: { getColumn }, className }: NameProps) {
  return (
    <TableHead className={className}>
      <ColumnHeader column={getColumn("name")!} title="Name" />
      <br />
      <ColumnHeader column={getColumn("category")!} title="Category" />
      <br />
      <ColumnHeader column={getColumn("subCategory")!} title="SubCategory" />
    </TableHead>
  );
}
