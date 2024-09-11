// other libraries
import { Row } from "@tanstack/react-table";
import { formatPrice } from "@/lib/helpers";
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
      <b>{formatPrice(getValue("price"))}</b>
      <br />
      {getValue("images")}
      <br />
      {getValue("popularity")}
    </TableCell>
  );
}
