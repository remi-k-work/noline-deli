"use client";

// prisma and db access
import { OrderedItem } from "@prisma/client";

// other libraries
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import { formatPrice } from "@/lib/helpers";

// components
import { TableCell, TableRow } from "@/components/ui/table";
import ItemImageWithTrigger from "@/components/ItemImageWithTrigger";

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
      <TableCell className="overflow-clip text-center">{quantity}</TableCell>
      <TableCell className="overflow-clip whitespace-nowrap text-end">{formatPrice(total)}</TableCell>
    </TableRow>
  );
}
