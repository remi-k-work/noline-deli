// prisma and db access
import type { OrderWithItems } from "@/features/storefront/db/types";

// other libraries
import { cn } from "@/lib/utils";
import type { Table } from "@tanstack/react-table";

// components
import { TableHead } from "@/components/ui/custom/table";
import ColumnHeader from "@/features/manager/components/ColumnHeader";

// types
interface ShippingAndStatusProps {
  table: Table<OrderWithItems>;
  className?: string;
}

export default function ShippingAndStatus({ table: { getColumn }, className }: ShippingAndStatusProps) {
  return (
    <TableHead className={cn("text-center", className)}>
      <ColumnHeader column={getColumn("shippingMethod")!} title="Shipping" />
      <br />
      <ColumnHeader column={getColumn("status")!} title="Status" />
    </TableHead>
  );
}
