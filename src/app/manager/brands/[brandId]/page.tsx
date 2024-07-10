// component css styles
import styles from "./page.module.css";

// next
import { notFound } from "next/navigation";

// prisma and db access
import { getBrand } from "@/features/manager/brands/db";

// other libraries
import PathFinder from "@/features/manager/PathFinder";

// components
import SectionHero from "@/features/manager/components/SectionHero";
import BrandForm from "@/features/manager/brands/components/BrandForm";

// assets
import bannerBrands from "@/assets/manager/banner-brands.webp";

// types
interface PageProps {
  params: { brandId: string };
}

export const metadata = {
  title: "NoLine-Deli ► Manager ► Edit Brand",
};

export default async function Page({ params: { brandId } }: PageProps) {
  // Get all the information you need about this particular brand
  const brand = await getBrand(brandId);

  // Ensure the brand exists
  if (!brand) {
    // Missing resource: redirect users to the 404 page
    notFound();
  }

  return (
    <article className={styles["page"]}>
      <SectionHero heroBanner={bannerBrands} sectionTitle={"Brands"} sectionLink={PathFinder.toAllBrands()} />
      <section className="bg-base-300 pb-4 pt-4">
        <BrandForm brand={brand} />
      </section>
    </article>
  );
}
