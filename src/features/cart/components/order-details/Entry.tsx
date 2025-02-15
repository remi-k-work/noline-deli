// prisma and db access
import type { CartItemWithProduct } from "../../db/cart";

// other libraries
import { formatCurrency } from "@/lib/formatters";

// components
import { TableCell, TableRow } from "@/components/ui/custom/table";

// types
interface EntryProps {
  orderedCartItem: CartItemWithProduct;
}

export default function Entry({ orderedCartItem }: EntryProps) {
  const {
    quantity,
    product: { name, price, categories, subCategories },
  } = orderedCartItem;

  const categoryName = categories[0].category.name;
  const subCategoryName = subCategories[0]?.subCategory.name;

  return (
    <TableRow>
      <TableCell>
        {name}
        <small>
          <br />
          {categoryName}
          <br />
          {subCategoryName}
        </small>
      </TableCell>
      <TableCell className="overflow-clip whitespace-nowrap text-end">
        {quantity} / {formatCurrency(quantity * price)}
      </TableCell>
    </TableRow>
  );
}
