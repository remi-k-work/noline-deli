// prisma and db access
import type { ProductWithInfo } from "@/features/manager/products/db";

// other libraries
import type { Row } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";

// components
import { TableCell } from "@/components/ui/custom/table";

// assets
import { ClockIcon } from "@heroicons/react/24/solid";

// types
interface CreatedProps {
  row: Row<ProductWithInfo>;
}

export default function Created({ row: { getValue } }: CreatedProps) {
  return (
    <TableCell className="text-center">
      <b>{getValue("brandName")}</b>
      <span className="flex items-center justify-center gap-2">
        <ClockIcon width={24} height={24} className="min-w-max" />
        {formatDistanceToNow(getValue("createdAt"))} ago
      </span>
      <span className="flex items-center justify-center gap-2">
        <ClockIcon width={24} height={24} className="min-w-max" />
        {formatDistanceToNow(getValue("updatedAt"))} ago
      </span>
    </TableCell>
  );
}
