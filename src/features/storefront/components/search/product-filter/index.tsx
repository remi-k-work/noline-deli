// component css styles
import styles from "./index.module.css";

// prisma and db access
import productFilter from "@/features/storefront/db/get-data-for/productFilter";

// components
import ByBrandId, { ByBrandIdSkeleton } from "./ByBrandId";
import ByPriceBelow, { ByPriceBelowSkeleton } from "./ByPriceBelow";
import ByFreeShipping, { ByFreeShippingSkeleton } from "./ByFreeShipping";
import Footer, { FooterSkeleton } from "./Footer";

export default async function ProductFilter() {
  // Gather the necessary data for the product filter, such as a list of all available brands and pricing ranges
  const productFilterData = await productFilter();

  return (
    <article className={styles["product-filter"]}>
      <h4 className="font-lusitana text-xl">Filter Products</h4>
      <form>
        <ByBrandId productFilterData={productFilterData} />
        <ByPriceBelow productFilterData={productFilterData} />
        <ByFreeShipping />
        <Footer />
      </form>
    </article>
  );
}

export function ProductFilterSkeleton() {
  return (
    <div className={styles["product-filter"]}>
      <h4 className="font-lusitana text-xl">Filter Products</h4>
      <form>
        <ByBrandIdSkeleton />
        <ByPriceBelowSkeleton />
        <ByFreeShippingSkeleton />
        <FooterSkeleton />
      </form>
    </div>
  );
}
