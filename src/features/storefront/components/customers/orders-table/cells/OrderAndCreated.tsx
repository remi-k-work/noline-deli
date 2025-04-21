// prisma and db access
import type { OrderWithItems } from "@/features/storefront/db/types";

// other libraries
import type { Row } from "@tanstack/react-table";
import { formatDateTime } from "@/lib/formatters";

// components
import { TableCell } from "@/components/ui/custom/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/custom/button";

// assets
import { ClockIcon, MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";

// types
interface OrderAndCreatedCellProps {
  row: Row<OrderWithItems>;
}

export default function OrderAndCreatedCell({ row: { getValue, getCanExpand, getToggleExpandedHandler, getIsExpanded } }: OrderAndCreatedCellProps) {
  return (
    <TableCell>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant={getIsExpanded() ? "secondary" : "default"}
            size="block"
            disabled={!getCanExpand()}
            onClick={getToggleExpandedHandler()}
          >
            {getIsExpanded() ? <MinusCircleIcon width={24} height={24} /> : <PlusCircleIcon width={24} height={24} />}
            <span className="truncate">{getValue("orderNumber")}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>{getIsExpanded() ? <p>Collapse this order</p> : <p>Expand this order</p>}</TooltipContent>
      </Tooltip>
      <span className="flex items-center justify-center gap-2">
        <ClockIcon width={24} height={24} className="min-w-max" />
        <span className="truncate">{formatDateTime(getValue("created"))}</span>
      </span>
    </TableCell>
  );
}

export function OrderAndCreatedCellSkeleton() {
  return (
    <TableCell>
      <Button type="button" variant="default" size="block" disabled>
        <PlusCircleIcon width={24} height={24} />
        <span className="bg-background h-5 w-43 animate-pulse"></span>
      </Button>
      <span className="flex items-center justify-center gap-2">
        <ClockIcon width={24} height={24} className="min-w-max" />
        <span className="bg-background h-5 w-43 animate-pulse"></span>
      </span>
    </TableCell>
  );
}
