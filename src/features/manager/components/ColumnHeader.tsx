// other libraries
import { Column } from "@tanstack/react-table";

// components
import { Button } from "@/components/ui/custom/button";

// assets
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

// types
interface ColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
}

export default function ColumnHeader<TData, TValue>({ column, title }: ColumnHeaderProps<TData, TValue>) {
  return (
    <Button type="button" variant="ghost" size="sm" onClick={column.getToggleSortingHandler()}>
      {title}
      {column.getIsSorted() ? (
        column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : (
          <ArrowDown className="ml-2 h-4 w-4" />
        )
      ) : (
        <ArrowUpDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
}
