// next
import { notFound } from "next/navigation";

// prisma and db access
import { getSubCategory, allCategories } from "@/features/manager/categories/db";

// other libraries
import PathFinder from "@/lib/PathFinder";

// components
import SectionHero from "@/features/manager/components/SectionHero";
import SubCategoryForm from "@/features/manager/subcategories/components/SubCategoryForm";

// assets
import bannerSubCategories from "@/assets/manager/banner-subcategories.webp";

// types
interface PageProps {
  params: Promise<{ subCategoryId: string }>;
}

export const metadata = {
  title: "NoLine-Deli ► Manager ► Edit SubCategory",
};

export default async function Page(props: PageProps) {
  const params = await props.params;

  const {
    subCategoryId
  } = params;

  // Retrieve all of the categories from an external source (database)
  const categories = await allCategories();

  // Get all the information you need about this particular subcategory
  const subCategory = await getSubCategory(subCategoryId);

  // Ensure the subcategory exists
  if (!subCategory) notFound();

  return (
    <>
      <SectionHero heroBanner={bannerSubCategories} sectionTitle={"SubCategories"} sectionLink={PathFinder.toAllSubCategories()} />
      <SubCategoryForm subCategory={subCategory} categories={categories} />
    </>
  );
}
