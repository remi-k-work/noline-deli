// next
import Link from "next/link";

// prisma and db access
import type { OrderWithItems } from "@/features/manager/orders/db";

// other libraries
import type { Row } from "@tanstack/react-table";
import PathFinder from "@/lib/PathFinder";
import { formatDateTime } from "@/lib/formatters";

// components
import { TableCell } from "@/components/ui/custom/table";

// assets
import { ClockIcon } from "@heroicons/react/24/solid";

// types
interface OrderNumberProps {
  row: Row<OrderWithItems>;
}

export default function OrderNumber({ row: { getValue, original } }: OrderNumberProps) {
  return (
    <TableCell className="text-center">
      <Link href={PathFinder.toOrderView(original.id)} className="link">
        <b className="truncate">{getValue("orderNumber")}</b>
      </Link>
      <span className="flex items-center justify-center gap-2">
        <ClockIcon width={24} height={24} className="min-w-max" />
        <span className="truncate">{formatDateTime(getValue("created"))}</span>
      </span>
    </TableCell>
  );
}
