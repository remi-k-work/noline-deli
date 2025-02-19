// component css styles
import styles from "./SingleProductView.module.css";

// next
import Image from "next/image";

// prisma and db access
import type { ProductWithAll } from "@/features/storefront/db/types";

// other libraries
import { cn } from "@/lib/utils";
import PathFinder from "@/lib/PathFinder";

// components
import ImageSlider from "./ImageSlider";
import BrandTag from "./BrandTag";
import { default as PriceTag } from "@/features/storefront/components/products/tags/Price";
import AddToCartForm from "@/features/cart/components/AddToCartForm";

// assets
import { lusitana } from "@/assets/fonts";

// types
interface SingleProductViewProps {
  product: ProductWithAll;
}

export default function SingleProductView({ product }: SingleProductViewProps) {
  // Ensure the product exists
  if (!product) return null;

  const { id, name, description, imageUrl, price, moreImages, brand } = product;

  return (
    <article className={styles["single-product-view"]}>
      {/* Display the picture slider when there are several images for a product */}
      {moreImages.length > 0 ? (
        <ImageSlider productName={name} moreImages={[{ imageUrl }, ...moreImages]} />
      ) : (
        <>
          {/* The width and height properties determine the image's right aspect ratio and prevent layout shifts during loading */}
          {/* The "srcset" that determines the set of images + condition descriptors from which the browser can choose will be generated automatically */}
          {/* "sizes": how large is the image going to be on the particular viewport? */}
          <Image
            src={PathFinder.toResolvedProductImage(imageUrl)}
            width={640}
            height={400}
            alt={name}
            sizes="100vw"
            className="m-auto h-96 w-auto object-contain"
            priority
          />
        </>
      )}
      <h2 className={cn(lusitana.className, "text-4xl")}>{name}</h2>
      <BrandTag brand={brand} />
      <p>{description}</p>
      <PriceTag priceInCents={price} />
      <AddToCartForm productId={id} />
    </article>
  );
}

export function SingleProductViewSkeleton() {
  return (
    <article className={styles["single-product-view-skeleton"]}>
      <div className="h-96 animate-pulse rounded-lg bg-background"></div>
      <div className="h-10 animate-pulse bg-background"></div>
      <div className="h-16 animate-pulse bg-background"></div>
      <div className="h-4 animate-pulse bg-background"></div>
      <div className="h-4 animate-pulse bg-background"></div>
      <div className="h-4 animate-pulse bg-background"></div>
      <div className="h-4 w-1/6 animate-pulse bg-background"></div>
      <div className="h-12 w-1/4 animate-pulse bg-background"></div>
    </article>
  );
}
