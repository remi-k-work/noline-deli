// prisma and db access
import { CartItemWithProduct } from "../../db/cart";

// other libraries
import { formatPrice } from "@/lib/helpers";

// components
import { TableCell, TableRow } from "@/components/ui/table";

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
        {quantity} / {formatPrice(quantity * price)}
      </TableCell>
    </TableRow>
  );
}
