// next
import { notFound } from "next/navigation";

// prisma and db access
import { getBrand } from "@/features/manager/brands/db";

// other libraries
import PathFinder from "@/lib/PathFinder";

// components
import SectionHero from "@/features/manager/components/SectionHero";
import BrandForm from "@/features/manager/brands/components/brand-form";

// assets
import bannerBrands from "@/assets/manager/banner-brands.webp";

// types
interface PageProps {
  params: Promise<{ brandId: string }>;
}

export const metadata = {
  title: "NoLine-Deli ► Manager ► Edit Brand",
};

export default async function Page(props: PageProps) {
  const params = await props.params;

  const {
    brandId
  } = params;

  // Get all the information you need about this particular brand
  const brand = await getBrand(brandId);

  // Ensure the brand exists
  if (!brand) notFound();

  return (
    <>
      <SectionHero heroBanner={bannerBrands} sectionTitle={"Brands"} sectionLink={PathFinder.toAllBrands()} />
      <BrandForm brand={brand} />
    </>
  );
}
