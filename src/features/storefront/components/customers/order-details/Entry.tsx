// prisma and db access
import type { OrderedItem } from "@prisma/client";

// other libraries
import { formatCurrency } from "@/lib/formatters";

// components
import { TableCell, TableRow } from "@/components/ui/custom/table";
import ItemImageWithTrigger from "@/components/ItemImageWithTrigger";

// types
interface EntryProps {
  orderedItem: OrderedItem;
}

export default function Entry({ orderedItem }: EntryProps) {
  const { quantity, name, total, categoryName, subCategoryName, status } = orderedItem;

  return (
    <TableRow>
      <TableCell>
        <article className="grid grid-cols-[9rem_1fr] items-center gap-2">
          <ItemImageWithTrigger orderedItem={orderedItem} />
          <footer>
            {name}
            <small>
              <br />
              {categoryName}
              <br />
              {subCategoryName}
            </small>
          </footer>
        </article>
      </TableCell>
      <TableCell className="overflow-clip text-end whitespace-nowrap">
        {quantity} / {formatCurrency(total)}
        <br className="clear-end" />
        {status.replace("_", " ").toUpperCase()}
      </TableCell>
    </TableRow>
  );
}
