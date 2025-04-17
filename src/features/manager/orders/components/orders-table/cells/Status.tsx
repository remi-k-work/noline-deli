// prisma and db access
import { OrderStatus } from "@prisma/client";
import type { OrderWithItems } from "@/features/manager/orders/db";

// server actions and mutations
import { chgOrderStatus } from "@/features/manager/orders/actions";

// other libraries
import type { Row, Table } from "@tanstack/react-table";
import { useAction } from "next-safe-action/hooks";

// components
import { TableCell } from "@/components/ui/custom/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// types
interface StatusProps {
  row: Row<OrderWithItems>;
  table: Table<OrderWithItems>;
}

export default function Status({ table: { options }, row: { index, getValue, original } }: StatusProps) {
  const { executeAsync } = useAction(chgOrderStatus, { onError: () => options.meta?.updateData(index, "status", original.status) });

  const handleStatusChanged = (newStatus: string) => {
    // Update the status of this order at both the tanstack table and the underlying database levels
    options.meta?.updateData(index, "status", newStatus);
    executeAsync({ orderId: original.id, newStatus: newStatus as OrderStatus });
  };

  return (
    <TableCell className="text-center">
      <Select name={"orderStatus"} value={getValue("status")} onValueChange={handleStatusChanged}>
        <SelectTrigger className="m-auto w-fit">
          <SelectValue placeholder="Choose Status" />
        </SelectTrigger>
        <SelectContent side="left" align="center">
          {Object.values(OrderStatus).map((orderStatus) => (
            <SelectItem key={orderStatus} value={orderStatus}>
              {orderStatus.replace("_", " ").toLowerCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </TableCell>
  );
}
