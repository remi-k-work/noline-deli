// prisma and db access
import type { ProductWithInfo } from "@/features/manager/products/db";

// other libraries
import type { Row } from "@tanstack/react-table";
import PathFinder from "@/lib/PathFinder";

// components
import { TableCell } from "@/components/ui/custom/table";
import ItemImageWithTrigger from "@/components/ItemImageWithTrigger";

// types
interface ItemProps {
  row: Row<ProductWithInfo>;
}

export default function Item({ row: { original } }: ItemProps) {
  return (
    <TableCell>
      <ItemImageWithTrigger product={original} href={PathFinder.toProductEdit(original.id)} />
    </TableCell>
  );
}
