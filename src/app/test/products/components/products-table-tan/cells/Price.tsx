// other libraries
import { Row } from "@tanstack/react-table";
import { formatCurrency } from "@/lib/formatters";
import { ProductRow } from "../Columns";

// components
import { TableCell } from "@/components/ui/table";

// types
interface PriceProps {
  row: Row<ProductRow>;
}

export default function Price({ row: { getValue } }: PriceProps) {
  return (
    <TableCell className="text-center">
      {getValue("images")}
      <hr className="border-dotted" />
      {getValue("popularity")}
      <br />
      <b>{formatCurrency(getValue("price"))}</b>
    </TableCell>
  );
}
