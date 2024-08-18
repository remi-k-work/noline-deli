// component css styles
import styles from "./page.module.css";

// prisma and db access
import { getProductFormData } from "@/features/manager/products/db";

// other libraries
import PathFinder from "@/features/manager/PathFinder";

// components
import SectionHero from "@/features/manager/components/SectionHero";
import ProductForm from "@/features/manager/products/components/product-form";

// assets
import bannerProducts from "@/assets/manager/banner-products.webp";

export const metadata = {
  title: "NoLine-Deli ► Manager ► New Product",
};

export default async function Page() {
  // Gather the necessary data for the product form, such as a list of all available brands and categories
  const [brands, categories] = await getProductFormData();

  return (
    <article className={styles["page"]}>
      <SectionHero heroBanner={bannerProducts} sectionTitle={"Products"} sectionLink={PathFinder.toAllProducts()} />
      <section className="bg-base-300 pb-4 pt-4">
        <ProductForm brands={brands} categories={categories} />
      </section>
    </article>
  );
}
