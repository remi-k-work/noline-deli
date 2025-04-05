// component css styles
import styles from "./ItemImageWithTrigger.module.css";

// next
import Link from "next/link";
import Image from "next/image";

// prisma and db access
import type { ProductWithAll } from "@/features/storefront/db/types";
import type { OrderedItem } from "@prisma/client";

// other libraries
import { cn } from "@/lib/utils";
import PathFinder from "@/lib/PathFinder";

// components
import ProductInfoTrigger from "@/features/storefront/components/products/ProductInfoTrigger";
import OrderedItemInfoTrigger from "@/features/manager/components/OrderedItemInfoTrigger";

// types
interface ItemImageWithTriggerProps {
  product?: ProductWithAll;
  orderedItem?: OrderedItem;
  href?: string;
}

export default function ItemImageWithTrigger({ product, orderedItem, href }: ItemImageWithTriggerProps) {
  if (product)
    return (
      <div className={styles["item-image-with-trigger"]}>
        {href ? (
          <Link href={href} className="[grid-area:img]">
            <Image
              src={PathFinder.toResolvedProductImage(product.imageUrl)}
              width={320}
              height={200}
              alt={product.name}
              title={product.name}
              sizes="50vw"
              className="h-auto w-36 rounded-lg object-cover"
            />
          </Link>
        ) : (
          <Image
            src={PathFinder.toResolvedProductImage(product.imageUrl)}
            width={320}
            height={200}
            alt={product.name}
            title={product.name}
            sizes="50vw"
            className="h-auto w-36 rounded-lg object-cover [grid-area:img]"
          />
        )}
        <ProductInfoTrigger product={product} className="z-1 [gird-area:inf]" />
      </div>
    );

  if (orderedItem)
    return (
      <div className={styles["item-image-with-trigger"]}>
        {href ? (
          <Link href={href} className="[grid-area:img]">
            <Image
              src={PathFinder.toResolvedProductImage(orderedItem.imageUrl)}
              width={320}
              height={200}
              alt={orderedItem.name}
              title={orderedItem.name}
              sizes="50vw"
              className="h-auto w-36 rounded-lg object-cover"
            />
          </Link>
        ) : (
          <Image
            src={PathFinder.toResolvedProductImage(orderedItem.imageUrl)}
            width={320}
            height={200}
            alt={orderedItem.name}
            title={orderedItem.name}
            sizes="50vw"
            className="h-auto w-36 rounded-lg object-cover [grid-area:img]"
          />
        )}
        <OrderedItemInfoTrigger orderedItem={orderedItem} className="z-1 [gird-area:inf]" />
      </div>
    );
}

export function ItemImageWithTriggerSkeleton() {
  return (
    <div className={cn(styles["item-image-with-trigger"], "animate-pulse")}>
      <div className="bg-background size-36 rounded-lg [grid-area:img]" />
      <div className="bg-background size-9 rounded-lg [grid-area:inf]" />
    </div>
  );
}
