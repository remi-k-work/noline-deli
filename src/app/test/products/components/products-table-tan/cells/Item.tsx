// component css styles
import styles from "./Item.module.css";

// next
import Link from "next/link";
import Image from "next/image";

// other libraries
import { cn } from "@/lib/utils";
import { Row } from "@tanstack/react-table";
import PathFinder from "@/lib/PathFinder";
import { ProductRow } from "../Columns";

// components
import { TableCell } from "@/components/ui/table";
import ProductInfoTrigger from "@/features/storefront/components/products/ProductInfoTrigger";

// types
interface ItemProps {
  row: Row<ProductRow>;
}

export default function Item({ row: { getValue, original } }: ItemProps) {
  return (
    <TableCell>
      <article className={styles["item-image"]}>
        <Link
          href={PathFinder.toProductEdit(original.id)}
          className={cn(styles["item-image__link"], "transition-transform delay-150 duration-700 ease-in-out hover:translate-x-2")}
        >
          <Image
            src={PathFinder.toResolvedProductImage(original.imageUrl)}
            width={320}
            height={200}
            alt={getValue("name")}
            title={getValue("name")}
            sizes="50vw"
            className="max-h-14 w-auto rounded-lg object-cover"
          />
        </Link>
        <ProductInfoTrigger product={original} className={cn(styles["item-image__info"], "z-10")} />
      </article>
    </TableCell>
  );
}
