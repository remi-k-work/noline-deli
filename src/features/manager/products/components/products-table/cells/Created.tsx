// other libraries
import { Row } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";
import { ProductRow } from "../Columns";

// components
import { TableCell } from "@/components/ui/table";

// assets
import { ClockIcon } from "@heroicons/react/24/solid";

// types
interface CreatedProps {
  row: Row<ProductRow>;
}

export default function Created({ row: { getValue } }: CreatedProps) {
  return (
    <TableCell className="text-center">
      <b>{getValue("brandName")}</b>
      <span className="m-auto flex w-fit items-center gap-2">
        <ClockIcon width={24} height={24} className="min-w-max" />
        {formatDistanceToNow(getValue("createdAt"))} ago
      </span>
      <span className="m-auto flex w-fit items-center gap-2">
        <ClockIcon width={24} height={24} className="min-w-max" />
        {formatDistanceToNow(getValue("updatedAt"))} ago
      </span>
    </TableCell>
  );
}
