// prisma and db access
import type { OrderWithItems } from "@/features/storefront/db/types";

// other libraries
import type { Row } from "@tanstack/react-table";
import { formatDateTime } from "@/lib/formatters";

// components
import { TableCell } from "@/components/ui/custom/table";
import { Button } from "@/components/ui/custom/button";

// assets
import { ClockIcon, MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";

// types
interface OrderAndCreatedProps {
  row: Row<OrderWithItems>;
}

export default function OrderAndCreated({ row: { getValue, getCanExpand, getToggleExpandedHandler, getIsExpanded } }: OrderAndCreatedProps) {
  return (
    <TableCell>
      <Button type="button" variant={getIsExpanded() ? "secondary" : "default"} size="block" disabled={!getCanExpand()} onClick={getToggleExpandedHandler()}>
        {getIsExpanded() ? <MinusCircleIcon width={24} height={24} /> : <PlusCircleIcon width={24} height={24} />}
        <span className="truncate">{getValue("orderNumber")}</span>
      </Button>
      <span className="flex items-center justify-center gap-2">
        <ClockIcon width={24} height={24} className="min-w-max" />
        <span className="truncate">{formatDateTime(getValue("created"))}</span>
      </span>
    </TableCell>
  );
}
