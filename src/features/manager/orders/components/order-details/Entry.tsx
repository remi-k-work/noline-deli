"use client";

// prisma and db access
import type { OrderedItem } from "@prisma/client";

// other libraries
import useMediaQuery from "@/hooks/useMediaQuery";
import { formatCurrency } from "@/lib/formatters";

// components
import { TableCell, TableRow } from "@/components/ui/table";
import ItemImageWithTrigger from "@/components/ItemImageWithTrigger";
import Status from "./Status";

// types
interface EntryProps {
  orderedItem: OrderedItem;
}

export default function Entry({ orderedItem }: EntryProps) {
  // Small devices (landscape phones, less than 768px)
  const isSmall = useMediaQuery("(max-width: 767.98px)");

  const { quantity, name, total, categoryName, subCategoryName } = orderedItem;

  return (
    <TableRow>
      <TableCell>
        {isSmall ? (
          <ItemImageWithTrigger orderedItem={orderedItem} />
        ) : (
          <article className="flex items-center gap-2">
            <ItemImageWithTrigger orderedItem={orderedItem} className="flex-none" />
            <footer className="flex-1">
              {name}
              <small>
                <br />
                {categoryName}
                <br />
                {subCategoryName}
              </small>
            </footer>
          </article>
        )}
      </TableCell>
      <TableCell className="overflow-clip whitespace-nowrap text-end">
        {quantity} / {formatCurrency(total)}
        <br className="clear-end" />
        <Status orderedItem={orderedItem} className="float-end w-fit" />
      </TableCell>
    </TableRow>
  );
}
