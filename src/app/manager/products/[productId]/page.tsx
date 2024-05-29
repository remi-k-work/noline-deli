// component css styles
import styles from "./page.module.css";

// next
import { notFound } from "next/navigation";

// prisma and db access
import { getProduct, getProductFormData } from "@/features/manager/dbProducts";

// other libraries
import PathFinder from "@/features/manager/PathFinder";

// components
import SectionHero from "@/features/manager/components/SectionHero";
import ProductForm from "@/features/manager/components/ProductForm";

// assets
import bannerProducts from "@/assets/manager/banner-products.webp";

// types
interface PageProps {
  params: { productId: string };
}

export const metadata = {
  title: "NoLine-Deli ► Manager ► Edit Product",
};

export default async function Page({ params: { productId } }: PageProps) {
  // Gather the necessary data for the product form, such as a list of all available brands and categories
  const [brands, categories] = await getProductFormData();

  // Get all the information you need about this particular product
  const product = await getProduct(productId);

  // Ensure the product exists
  if (!product) {
    // Missing resource: redirect users to the 404 page
    notFound();
  }

  return (
    <article className={styles["page"]}>
      <SectionHero heroBanner={bannerProducts} sectionTitle={"Products"} sectionLink={PathFinder.toAllProducts()} />
      <section className="bg-base-content pb-4 pt-4">
        <ProductForm product={product} brands={brands} categories={categories} />
      </section>
    </article>
  );
}
