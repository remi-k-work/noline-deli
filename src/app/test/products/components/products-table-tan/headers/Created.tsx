// other libraries
import { cn } from "@/lib/utils";
import { Table } from "@tanstack/react-table";
import { ProductRow } from "../Columns";

// components
import { TableHead } from "@/components/ui/custom/table";
import ColumnHeader from "./ColumnHeader";

// types
interface CreatedProps {
  table: Table<ProductRow>;
  className?: string;
}

export default function Created({ table: { getColumn }, className }: CreatedProps) {
  return (
    <TableHead className={cn("text-center", className)}>
      <ColumnHeader column={getColumn("createdAt")!} title="Created At" />
      <hr className="border-dotted" />
      <ColumnHeader column={getColumn("updatedAt")!} title="Updated At" />
    </TableHead>
  );
}
