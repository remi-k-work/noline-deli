// component css styles
import styles from "./ProductPreview.module.css";

// next
import Link from "next/link";
import Image from "next/image";

// prisma and db access
import type { OrderedItem, Product } from "@prisma/client";

// other libraries
import { cn } from "@/lib/utils";
import PathFinder from "@/lib/PathFinder";
import { formatCurrency } from "@/lib/formatters";

// types
interface ProductPreview {
  kind: "product";
  product: Product;
}

interface OrderedPreview {
  kind: "ordered";
  orderedItem: OrderedItem;
}

type ProductPreviewProps = ProductPreview | OrderedPreview;

export default function ProductPreview(props: ProductPreviewProps) {
  if (props.kind === "product") {
    const {
      product: { id, name, imageUrl, price },
    } = props;

    return (
      <article className={styles["product-preview"]}>
        <Link href={PathFinder.toSfProductDetails(name, id)} className="transition-transform delay-150 duration-700 ease-in-out hover:scale-110">
          <header>
            <Image src={PathFinder.toResolvedProductImage(imageUrl)} width={320} height={200} alt={name} sizes="50vw" className="object-contain" />
          </header>
          <footer>{formatCurrency(price)}</footer>
        </Link>
      </article>
    );
  } else {
    const {
      orderedItem: { name, imageUrl, price, quantity, total },
    } = props;

    return (
      <article className={cn(styles["product-preview"], styles["product-preview--ordered"])}>
        <header>
          <Image src={PathFinder.toResolvedProductImage(imageUrl)} width={320} height={200} alt={name} sizes="50vw" className="h-24 object-contain" />
        </header>
        <footer>
          {quantity} &times; {formatCurrency(price)}
          <br />
          <span className="text-text-1">{formatCurrency(total)}</span>
        </footer>
      </article>
    );
  }
}
export function ProductPreviewSkeleton() {
  return (
    <div className={styles["product-preview"]}>
      <header className="size-46 animate-pulse"></header>
      <footer>
        <div className="bg-background h-5.5 w-32 animate-pulse"></div>
      </footer>
    </div>
  );
}
