// component css styles
import styles from "./FeaturedProducts.module.css";

// prisma and db access
import { featuredProducts } from "@/features/storefront/db/get-data-for/featured";

// components
import ProductPreview, { ProductPreviewSkeleton } from "./ProductPreview";

export default async function FeaturedProducts() {
  // Fetch all of the products first, then scramble them, and then select three random ones
  const products = await featuredProducts();

  return (
    <article className={styles["featured-products"]}>
      <h4 className="font-lusitana text-xl">We Also Suggest</h4>
      {products.map((product) => (
        <ProductPreview key={product.id} product={product} />
      ))}
    </article>
  );
}

export function FeaturedProductsSkeleton() {
  return (
    <div className={styles["featured-products"]}>
      <h4 className="font-lusitana text-xl">We Also Suggest</h4>
      <ProductPreviewSkeleton />
      <ProductPreviewSkeleton />
      <ProductPreviewSkeleton />
    </div>
  );
}
