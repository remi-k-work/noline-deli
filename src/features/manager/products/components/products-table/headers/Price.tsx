// other libraries
import { cn } from "@/lib/utils";
import { Table } from "@tanstack/react-table";
import { ProductRow } from "../Columns";

// components
import { TableHead } from "@/components/ui/table";
import ColumnHeader from "../../../../components/ColumnHeader";

// types
interface PriceProps {
  table: Table<ProductRow>;
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
