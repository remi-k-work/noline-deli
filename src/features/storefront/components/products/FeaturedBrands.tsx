// component css styles
import styles from "./FeaturedBrands.module.css";

// prisma and db access
import { featuredBrands } from "@/features/storefront/db/get-data-for/featured";

// components
import BrandPreview, { BrandPreviewSkeleton } from "./BrandPreview";

export default async function FeaturedBrands() {
  // Fetch all of the brands first, then scramble them, and then select three random ones
  const brands = await featuredBrands();

  return (
    <article className={styles["featured-brands"]}>
      <h4 className="font-lusitana text-xl">Featured Brands</h4>
      {brands.map((brand) => (
        <BrandPreview key={brand.id} brand={brand} />
      ))}
    </article>
  );
}

export function FeaturedBrandsSkeleton() {
  return (
    <div className={styles["featured-brands"]}>
      <h4 className="font-lusitana text-xl">Featured Brands</h4>
      <BrandPreviewSkeleton />
      <BrandPreviewSkeleton />
      <BrandPreviewSkeleton />
    </div>
  );
}
