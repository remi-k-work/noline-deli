// component css styles
import styles from "./ProductPreview.module.css";

// next
import Link from "next/link";
import Image from "next/image";

// prisma and db access
import type { Product } from "@prisma/client";

// other libraries
import PathFinder from "@/lib/PathFinder";
import { formatCurrency } from "@/lib/formatters";

// types
interface ProductPreviewProps {
  product: Product;
}

export default function ProductPreview({ product: { id, name, imageUrl, price } }: ProductPreviewProps) {
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
