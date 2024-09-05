// other libraries
import { Row } from "@tanstack/react-table";
import { OrderRow } from "../Columns";

// components
import { TableCell } from "@/components/ui/table";

// types
interface StatusProps {
  row: Row<OrderRow>;
}

export default function Status({ row: { getValue } }: StatusProps) {
  return <TableCell className="text-center">{getValue("status")}</TableCell>;
}
