// component css styles
import styles from "./page.module.css";

// next
import { notFound } from "next/navigation";

// prisma and db access
import { getSubCategory, allCategories } from "@/features/manager/dbCategories";

// other libraries
import clsx from "clsx";

// components
import SubCategoryForm from "@/features/manager/components/SubCategoryForm";

// assets
import { lusitana } from "@/assets/fonts";

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
      <h1 className={clsx(lusitana.className, "mb-8 text-xl lg:text-3xl")}>Manager ► Edit SubCategory</h1>
      <SubCategoryForm subCategory={subCategory} categories={categories} />
    </article>
  );
}
