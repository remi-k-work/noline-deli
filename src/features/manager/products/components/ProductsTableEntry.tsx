// component css styles
import styles from "./ProductsTableEntry.module.css";

// next
import Link from "next/link";
import Image from "next/image";

// prisma and db access
import { ProductWithAll } from "../db";

// other libraries
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/helpers";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import PathFinder from "../../PathFinder";
import useMediaQuery from "@/lib/useMediaQuery";

// components
import { TableCell, TableRow } from "@/components/ui/table";
import ProductInfo from "@/features/products/components/ProductInfo";
import ProductsTableActions from "./ProductsTableActions";

// types
interface ProductsTableEntryProps {
  product: ProductWithAll;
  createdByUser?: string;
}

export default function ProductsTableEntry({ product, createdByUser }: ProductsTableEntryProps) {
  // Small devices (landscape phones, less than 768px)
  const isSmall = useMediaQuery("(max-width: 767.98px)");

  // Ensure the product exists
  if (!product) {
    // To prevent receiving the "cannot destructure property of undefined" exception, do not attempt to render anything
    return null;
  }

  const {
    id,
    name,
    imageUrl,
    price,
    categories,
    subCategories,
    createdBy,
    user: { role },
  } = product;

  return (
    <TableRow
      className={cn("odd:bg-[--surface-3] even:bg-[--surface-4]", {
        "text-error": role === "ADMIN" || createdBy !== createdByUser,
      })}
    >
      <TableCell>
        <article className={styles["products-table-entry-image"]}>
          <Link href={PathFinder.toProductEdit(id)} className={styles["products-table-entry-image__link"]}>
            <Image
              src={PathFinder.toResolvedProductImage(imageUrl)}
              width={320}
              height={200}
              alt={name}
              title={name}
              sizes="50vw"
              className="h-auto max-h-14 w-auto rounded-lg object-cover"
            />
          </Link>
          <section className={cn(styles["products-table-entry-image__info"], "dropdown dropdown-right")}>
            <header className="lg:tooltip lg:tooltip-right" data-tip="Display all information about this product">
              <div tabIndex={0} role="button" className="btn btn-circle btn-info">
                <InformationCircleIcon width={24} height={24} />
              </div>
            </header>
            <aside tabIndex={0} className={cn(styles["products-table-entry__product-info"], "dropdown-content z-10 shadow")}>
              <ProductInfo product={product} />
            </aside>
          </section>
        </article>
      </TableCell>
      <TableCell>{name}</TableCell>
      {!isSmall && (
        <>
          <TableCell>
            <ul>
              {categories.map(({ category: { id, name } }) => (
                <li key={id}>{name}</li>
              ))}
            </ul>
          </TableCell>
          <TableCell>
            <ul>
              {subCategories.map(({ subCategory: { id, name } }) => (
                <li key={id}>{name}</li>
              ))}
            </ul>
          </TableCell>
          <TableCell className="overflow-clip whitespace-nowrap text-end">{formatPrice(price)}</TableCell>
        </>
      )}
      <TableCell>
        <ProductsTableActions productId={id} productName={name} productImageUrl={imageUrl} productPrice={price} />
      </TableCell>
    </TableRow>
  );
}
