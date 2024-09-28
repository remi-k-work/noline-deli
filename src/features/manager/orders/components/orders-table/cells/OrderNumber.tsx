// next
import Link from "next/link";

// other libraries
import { Row, Table } from "@tanstack/react-table";
import PathFinder from "@/lib/PathFinder";
import { formatDateTime } from "@/lib/formatters";
import { OrderRow } from "../Columns";

// components
import { TableCell } from "@/components/ui/table";
import { StatusCell } from "./Status";

// assets
import { ClockIcon } from "@heroicons/react/24/solid";

// types
interface OrderNumberProps {
  row: Row<OrderRow>;
  table: Table<OrderRow>;
  includeStatus?: boolean;
}

export default function OrderNumber({ row, table, row: { getValue, original }, includeStatus = false }: OrderNumberProps) {
  return (
    <TableCell className="overflow-clip">
      <Link href={PathFinder.toOrderView(original.id)} className="link-hover link">
        <b>{getValue("orderNumber")}</b>
      </Link>
      <span className="flex w-fit items-center gap-2">
        <ClockIcon width={24} height={24} className="min-w-max" />
        {formatDateTime(getValue("created"))}
      </span>
      {/* Merge this cell with another if it needs to squeeze more info (for example, on small displays) */}
      {includeStatus && <StatusCell row={row} table={table} triggerCn="w-fit" />}
    </TableCell>
  );
}
