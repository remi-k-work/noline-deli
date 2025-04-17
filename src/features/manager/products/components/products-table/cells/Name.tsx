// next
import Link from "next/link";

// prisma and db access
import type { ProductWithInfo } from "@/features/manager/products/db";

// other libraries
import type { Row } from "@tanstack/react-table";
import PathFinder from "@/lib/PathFinder";

// components
import { TableCell } from "@/components/ui/custom/table";

// types
interface NameProps {
  row: Row<ProductWithInfo>;
}

export default function Name({ row: { getValue, original } }: NameProps) {
  return (
    <TableCell>
      <Link href={PathFinder.toProductEdit(original.id)} className="link" scroll={false}>
        <p>
          <b>{getValue("name")}</b>
        </p>
      </Link>
      <br />
      {getValue("category")}
      <br />
      {getValue("subCategory")}
    </TableCell>
  );
}
