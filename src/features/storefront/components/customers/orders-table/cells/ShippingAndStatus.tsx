// prisma and db access
import type { OrderWithItems } from "@/features/storefront/db/types";

// other libraries
import type { Row } from "@tanstack/react-table";

// components
import { TableCell } from "@/components/ui/custom/table";

// types
interface ShippingAndStatusProps {
  row: Row<OrderWithItems>;
}

export default function ShippingAndStatus({ row: { getValue, original } }: ShippingAndStatusProps) {
  return (
    <TableCell className="text-center">
      {getValue("shippingMethod")}
      <br />
      {original.status.replace("_", " ").toUpperCase()}
    </TableCell>
  );
}
