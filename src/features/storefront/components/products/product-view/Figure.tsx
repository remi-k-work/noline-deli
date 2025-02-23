// component css styles
import styles from "./Figure.module.css";

// next
import Image from "next/image";

// prisma and db access
import type { ProductWithAll } from "@/features/storefront/db/types";

// other libraries
import PathFinder from "@/lib/PathFinder";

// components
import ImageSlider from "@/features/storefront/components/products/image-slider";

// types
interface FigureProps {
  product: ProductWithAll;
}

export default function Figure({ product: { name, imageUrl, moreImages } }: FigureProps) {
  return (
    <figure className={styles["figure"]}>
      {moreImages.length > 0 ? (
        <ImageSlider productName={name} moreImages={[{ imageUrl }, ...moreImages]} />
      ) : (
        <Image src={PathFinder.toResolvedProductImage(imageUrl)} width={640} height={400} alt={name} sizes="100vw" />
      )}
    </figure>
  );
}

export function FigureSkeleton() {
  return (
    <div className={styles["figure-skeleton"]}>
      <div className="animate-pulse bg-background"></div>
    </div>
  );
}
