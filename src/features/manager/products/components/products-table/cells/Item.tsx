// other libraries
import { Row } from "@tanstack/react-table";
import PathFinder from "@/features/manager/PathFinder";
import { ProductRow } from "../Columns";

// components
import { TableCell } from "@/components/ui/table";
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
