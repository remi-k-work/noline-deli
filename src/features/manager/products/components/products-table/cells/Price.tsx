// prisma and db access
import type { ProductWithInfo } from "@/features/manager/products/db";

// other libraries
import type { Row } from "@tanstack/react-table";
import { formatCurrency } from "@/lib/formatters";

// components
import { TableCell } from "@/components/ui/custom/table";

// types
interface PriceProps {
  row: Row<ProductWithInfo>;
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
