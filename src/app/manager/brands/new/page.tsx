// other libraries
import PathFinder from "@/lib/PathFinder";

// components
import SectionHero from "@/features/manager/components/SectionHero";
import BrandForm from "@/features/manager/brands/components/brand-form";

// assets
import bannerBrands from "@/assets/manager/banner-brands.webp";

export const metadata = {
  title: "NoLine-Deli ► Manager ► New Brand",
};

export default async function Page() {
  return (
    <>
      <SectionHero heroBanner={bannerBrands} sectionTitle={"Brands"} sectionLink={PathFinder.toAllBrands()} />
      <BrandForm />
    </>
  );
}
