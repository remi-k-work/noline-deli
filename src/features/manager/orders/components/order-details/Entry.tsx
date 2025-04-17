// prisma and db access
import type { OrderedItem } from "@prisma/client";

// other libraries
import { formatCurrency } from "@/lib/formatters";

// components
import { TableCell, TableRow } from "@/components/ui/custom/table";
import ItemImageWithTrigger from "@/components/ItemImageWithTrigger";
import Status from "./Status";

// types
interface EntryProps {
  orderedItem: OrderedItem;
}

export default function Entry({ orderedItem }: EntryProps) {
  const { quantity, name, total, categoryName, subCategoryName } = orderedItem;

  return (
    <TableRow>
      <TableCell>
        <ItemImageWithTrigger orderedItem={orderedItem} />
      </TableCell>
      <TableCell className="collapse truncate sm:visible">
        {name}
        <br />
        <small>
          {categoryName}
          {subCategoryName && (
            <>
              <br />
              {subCategoryName}
            </>
          )}
        </small>
      </TableCell>
      <TableCell className="truncate text-end">
        {quantity} / {formatCurrency(total)}
        <br className="clear-end" />
        <Status orderedItem={orderedItem} className="float-end w-fit" />
      </TableCell>
    </TableRow>
  );
}
