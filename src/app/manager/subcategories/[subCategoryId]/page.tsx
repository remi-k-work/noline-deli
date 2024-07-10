// component css styles
import styles from "./page.module.css";

// next
import { notFound } from "next/navigation";

// prisma and db access
import { getSubCategory, allCategories } from "@/features/manager/categories/db";

// other libraries
import PathFinder from "@/features/manager/PathFinder";

// components
import SectionHero from "@/features/manager/components/SectionHero";
import SubCategoryForm from "@/features/manager/subcategories/components/SubCategoryForm";

// assets
import bannerSubCategories from "@/assets/manager/banner-subcategories.webp";

// types
interface PageProps {
  params: { subCategoryId: string };
}

export const metadata = {
  title: "NoLine-Deli ► Manager ► Edit SubCategory",
};

export default async function Page({ params: { subCategoryId } }: PageProps) {
  // Retrieve all of the categories from an external source (database)
  const categories = await allCategories();

  // Get all the information you need about this particular subcategory
  const subCategory = await getSubCategory(subCategoryId);

  // Ensure the subcategory exists
  if (!subCategory) {
    // Missing resource: redirect users to the 404 page
    notFound();
  }

  return (
    <article className={styles["page"]}>
      <SectionHero heroBanner={bannerSubCategories} sectionTitle={"SubCategories"} sectionLink={PathFinder.toAllSubCategories()} />
      <section className="bg-base-300 pb-4 pt-4">
        <SubCategoryForm subCategory={subCategory} categories={categories} />
      </section>
    </article>
  );
}
