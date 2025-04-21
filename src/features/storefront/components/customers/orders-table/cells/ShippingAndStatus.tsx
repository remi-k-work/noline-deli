// prisma and db access
import type { OrderWithItems } from "@/features/storefront/db/types";

// other libraries
import type { Row } from "@tanstack/react-table";

// components
import { TableCell } from "@/components/ui/custom/table";

// types
interface ShippingAndStatusCellProps {
  row: Row<OrderWithItems>;
}

export default function ShippingAndStatusCell({ row: { getValue, original } }: ShippingAndStatusCellProps) {
  return (
    <TableCell className="text-center">
      {getValue("shippingMethod")}
      <br />
      {original.status.replace("_", " ").toUpperCase()}
    </TableCell>
  );
}

export function ShippingAndStatusCellSkeleton() {
  return (
    <TableCell className="text-center">
      <div className="bg-background mx-auto h-5 w-16 animate-pulse"></div>
      <div className="bg-background mx-auto h-5 w-40 animate-pulse"></div>
    </TableCell>
  );
}
