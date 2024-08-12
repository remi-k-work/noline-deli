// component css styles
import styles from "./ProductsTableEntry.module.css";

// next
import Link from "next/link";
import Image from "next/image";

// prisma and db access
import { ProductWithInfo } from "../db";

// other libraries
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/helpers";
import PathFinder from "../../PathFinder";
import useMediaQuery from "@/lib/useMediaQuery";
import { formatDistanceToNow } from "date-fns";

// components
import { TableCell, TableRow } from "@/components/ui/table";
import ProductInfoTrigger from "@/features/products/components/ProductInfoTrigger";
import ProductsTableActions from "./ProductsTableActions";

// assets
import { ClockIcon } from "@heroicons/react/24/solid";

// types
interface ProductsTableEntryProps {
  product: ProductWithInfo;
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
    _count: { moreImages, carts },
    createdAt,
    updatedAt,
  } = product;

  return (
    <TableRow
      className={cn("odd:bg-[--surface-3] even:bg-[--surface-4]", {
        "text-error": role === "ADMIN" || createdBy !== createdByUser,
      })}
    >
      <TableCell>
        <article className={styles["products-table-entry-image"]}>
          <Link
            href={PathFinder.toProductEdit(id)}
            className={cn(styles["products-table-entry-image__link"], "transition-transform delay-150 duration-700 ease-in-out hover:translate-x-2")}
          >
            <Image
              src={PathFinder.toResolvedProductImage(imageUrl)}
              width={320}
              height={200}
              alt={name}
              title={name}
              sizes="50vw"
              className="max-h-14 w-auto rounded-lg object-cover"
            />
          </Link>
          <ProductInfoTrigger product={product} className={cn(styles["products-table-entry-image__info"], "z-10")} />
        </article>
      </TableCell>
      <TableCell>
        <Link href={PathFinder.toProductEdit(id)} className="link-hover link">
          <b>{name}</b>
        </Link>
        <br />
        <ul>
          {categories.map(({ category: { id, name } }) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
        <ul>
          {subCategories.map(({ subCategory: { id, name } }) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
      </TableCell>
      {!isSmall && (
        <>
          <TableCell className="text-center">
            {moreImages + 1}
            <hr className="border-dotted" />
            {carts}
            <br />
            <b>{formatPrice(price)}</b>
          </TableCell>
          <TableCell className="text-center">
            <span className="m-auto flex w-fit items-center gap-2">
              <ClockIcon width={24} height={24} className="min-w-max" />
              {formatDistanceToNow(createdAt)} ago
            </span>
            <hr className="border-dotted" />
            <span className="m-auto flex w-fit items-center gap-2">
              <ClockIcon width={24} height={24} className="min-w-max" />
              {formatDistanceToNow(updatedAt)} ago
            </span>
          </TableCell>
        </>
      )}
      <TableCell>
        <ProductsTableActions productId={id} productName={name} productImageUrl={imageUrl} productPrice={price} />
      </TableCell>
    </TableRow>
  );
}
