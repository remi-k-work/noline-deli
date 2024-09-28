// component css styles
import styles from "./ItemImageWithTrigger.module.css";

// next
import Link from "next/link";
import Image from "next/image";

// prisma and db access
import { ProductWithAll } from "@/features/products/productsDb";
import { OrderedItem } from "@prisma/client";

// other libraries
import { cn } from "@/lib/utils";
import PathFinder from "@/lib/PathFinder";

// components
import ProductInfoTrigger from "@/features/products/components/ProductInfoTrigger";
import OrderedItemInfoTrigger from "@/features/manager/components/OrderedItemInfoTrigger";

// types
interface ItemImageWithTriggerProps {
  product?: ProductWithAll;
  orderedItem?: OrderedItem;
  href?: string;
  className?: string;
}

export default function ItemImageWithTrigger({ product, orderedItem, href, className }: ItemImageWithTriggerProps) {
  if (product)
    return (
      <div className={cn(styles["item-image-with-trigger"], className)}>
        {href ? (
          <Link href={href} className={styles["item-image-with-trigger__image"]}>
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
            className={cn(styles["item-image-with-trigger__image"], "h-auto w-36 rounded-lg object-cover")}
          />
        )}
        <ProductInfoTrigger product={product} className={cn(styles["item-image-with-trigger__trigger"], "z-10")} />
      </div>
    );

  if (orderedItem)
    return (
      <div className={styles["item-image-with-trigger"]}>
        {href ? (
          <Link href={href} className={styles["item-image-with-trigger__image"]}>
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
            className={cn(styles["item-image-with-trigger__image"], "h-auto w-36 rounded-lg object-cover")}
          />
        )}
        <OrderedItemInfoTrigger orderedItem={orderedItem} className={cn(styles["item-image-with-trigger__trigger"], "z-10")} />
      </div>
    );
}
