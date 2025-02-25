// prisma and db access
import { getProductFormData } from "@/features/manager/products/db";

// other libraries
import PathFinder from "@/lib/PathFinder";

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
    <>
      <SectionHero heroBanner={bannerProducts} sectionTitle={"Products"} sectionLink={PathFinder.toAllProducts()} />
      <ProductForm brands={brands} categories={categories} />
    </>
  );
}
