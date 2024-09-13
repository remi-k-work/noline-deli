// prisma and db access
import { OrderStatus } from "@prisma/client";

// server actions and mutations
import { chgOrderStatus } from "@/features/manager/orders/actions";

// other libraries
import { Row, Table } from "@tanstack/react-table";
import { OrderRow } from "../Columns";

// components
import { TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// types
interface StatusProps {
  row: Row<OrderRow>;
  table: Table<OrderRow>;
}

interface StatusCellProps {
  row: Row<OrderRow>;
  table: Table<OrderRow>;
  triggerCn?: string;
}

export default function Status({ row, table }: StatusProps) {
  return (
    <TableCell className="text-center">
      <StatusCell row={row} table={table} triggerCn="m-auto w-fit" />
    </TableCell>
  );
}

export function StatusCell({ table: { options }, row: { index, getValue, original }, triggerCn }: StatusCellProps) {
  return (
    <Select
      name={"orderStatus"}
      value={getValue("status")}
      onValueChange={async (value) => {
        options.meta?.updateData(index, "status", value);
        await chgOrderStatus({ orderId: original.id, newStatus: value as OrderStatus });
      }}
    >
      <SelectTrigger className={triggerCn}>
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
  );
}
