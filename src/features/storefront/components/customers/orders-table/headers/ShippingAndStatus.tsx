// prisma and db access
import type { OrderWithItems } from "@/features/storefront/db/types";

// other libraries
import type { Table } from "@tanstack/react-table";

// components
import { TableHead } from "@/components/ui/custom/table";
import ColumnHeader, { ColumnHeaderSkeleton } from "@/features/manager/components/ColumnHeader";

// types
interface ShippingAndStatusHeaderProps {
  table: Table<OrderWithItems>;
}

export default function ShippingAndStatusHeader({ table: { getColumn } }: ShippingAndStatusHeaderProps) {
  return (
    <TableHead className="w-42 text-center">
      <ColumnHeader column={getColumn("shippingMethod")!} title="Shipping" />
      <br />
      <ColumnHeader column={getColumn("status")!} title="Status" />
    </TableHead>
  );
}

export function ShippingAndStatusHeaderSkeleton() {
  return (
    <TableHead className="w-42 text-center">
      <ColumnHeaderSkeleton title="Shipping" />
      <br />
      <ColumnHeaderSkeleton title="Status" />
    </TableHead>
  );
}
