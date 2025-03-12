// other libraries
import type { Row } from "@tanstack/react-table";
import PathFinder from "@/lib/PathFinder";
import type { ProductRow } from "@/features/manager/products/components/products-table/Columns";

// components
import { TableCell } from "@/components/ui/custom/table";
import ItemImageWithTrigger from "@/components/ItemImageWithTrigger";

// types
interface ItemProps {
  row: Row<ProductRow>;
}

export default function Item({ row: { original } }: ItemProps) {
  return (
    <TableCell>
      <ItemImageWithTrigger product={original} href={PathFinder.toProductEdit(original.id)} />
    </TableCell>
  );
}
