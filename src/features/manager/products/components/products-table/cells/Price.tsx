// other libraries
import { Row } from "@tanstack/react-table";
import { formatCurrency } from "@/lib/formatters";
import { ProductRow } from "../Columns";

// components
import { TableCell } from "@/components/ui/custom/table";

// types
interface PriceProps {
  row: Row<ProductRow>;
}

export default function Price({ row: { getValue } }: PriceProps) {
  return (
    <TableCell className="text-center">
      <b>{formatCurrency(getValue("price"))}</b>
      <br />
      {getValue("images")}
      <br />
      {getValue("popularity")}
    </TableCell>
  );
}
