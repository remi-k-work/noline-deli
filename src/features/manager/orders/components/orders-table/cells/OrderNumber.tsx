// next
import Link from "next/link";

// other libraries
import { Row } from "@tanstack/react-table";
import PathFinder from "@/features/manager/PathFinder";
import { format } from "date-fns";
import { OrderRow } from "../Columns";

// components
import { TableCell } from "@/components/ui/table";

// assets
import { ClockIcon } from "@heroicons/react/24/solid";

// types
interface OrderNumberProps {
  row: Row<OrderRow>;
}

export default function OrderNumber({ row: { getValue, original } }: OrderNumberProps) {
  return (
    <TableCell className="overflow-clip">
      {/* <Link href={PathFinder.toOrderView(original.id)} className="link-hover link"> */}
      <b>{getValue("orderNumber")}</b>
      {/* </Link> */}
      <br />
      <span className="flex w-fit items-center gap-2">
        <ClockIcon width={24} height={24} className="min-w-max" />
        {format(getValue("created"), "EEEE, MMMM d, yyyy")}
      </span>
    </TableCell>
  );
}
