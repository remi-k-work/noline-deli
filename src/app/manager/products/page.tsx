// component css styles
import styles from "./page.module.css";

// components
import SectionHero from "@/features/manager/components/SectionHero";
import { default as ProductsTableView } from "@/features/manager/products/components/products-table/View";

// assets
import bannerProducts from "@/assets/manager/banner-products.webp";

export const metadata = {
  title: "NoLine-Deli ► Manager ► Products",
};

export default async function Page() {
  return (
    <article className={styles["page"]}>
      <SectionHero heroBanner={bannerProducts} sectionTitle={"Products"} />
      <ProductsTableView />
    </article>
  );
}
