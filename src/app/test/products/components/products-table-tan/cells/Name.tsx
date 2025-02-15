// next
import Link from "next/link";

// other libraries
import { Row } from "@tanstack/react-table";
import PathFinder from "@/lib/PathFinder";
import { ProductRow } from "../Columns";

// components
import { TableCell } from "@/components/ui/custom/table";

// types
interface NameProps {
  row: Row<ProductRow>;
}

export default function Name({ row: { getValue, original } }: NameProps) {
  return (
    <TableCell>
      <Link href={PathFinder.toProductEdit(original.id)} className="link-hover link">
        <b>{getValue("name")}</b>
      </Link>
      <br />
      {getValue("category")}
      <br />
      {getValue("subCategory")}
    </TableCell>
  );
}
