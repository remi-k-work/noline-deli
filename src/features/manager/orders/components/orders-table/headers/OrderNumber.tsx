// other libraries
import type { Table } from "@tanstack/react-table";
import type { OrderRow } from "@/features/manager/orders/components/orders-table/Columns";

// components
import { TableHead } from "@/components/ui/custom/table";
import ColumnHeader from "@/features/manager/components/ColumnHeader";

// types
interface OrderNumberProps {
  table: Table<OrderRow>;
  includeStatus?: boolean;
  className?: string;
}

export default function OrderNumber({ table: { getColumn }, includeStatus = false, className }: OrderNumberProps) {
  return (
    <TableHead className={className}>
      <ColumnHeader column={getColumn("orderNumber")!} title="Order#" />
      <br />
      <ColumnHeader column={getColumn("created")!} title="Created" />
      {/* Merge this header with another if it needs to squeeze more info (for example, on small displays) */}
      {includeStatus && (
        <>
          <br />
          <ColumnHeader column={getColumn("status")!} title="Status" />
        </>
      )}
    </TableHead>
  );
}
