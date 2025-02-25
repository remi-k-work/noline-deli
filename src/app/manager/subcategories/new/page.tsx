// prisma and db access
import { allCategories } from "@/features/manager/categories/db";

// other libraries
import PathFinder from "@/lib/PathFinder";

// components
import SectionHero from "@/features/manager/components/SectionHero";
import SubCategoryForm from "@/features/manager/subcategories/components/SubCategoryForm";

// assets
import bannerSubCategories from "@/assets/manager/banner-subcategories.webp";

export const metadata = {
  title: "NoLine-Deli ► Manager ► New SubCategory",
};

export default async function Page() {
  // Retrieve all of the categories from an external source (database)
  const categories = await allCategories();

  return (
    <>
      <SectionHero heroBanner={bannerSubCategories} sectionTitle={"SubCategories"} sectionLink={PathFinder.toAllSubCategories()} />
      <SubCategoryForm categories={categories} />
    </>
  );
}
