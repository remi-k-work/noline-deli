// component css styles
import styles from "./page.module.css";

// next
import { notFound } from "next/navigation";

// prisma and db access
import { getCategory } from "@/features/manager/dbCategories";

// other libraries
import clsx from "clsx";

// components
import CategoryForm from "@/features/manager/components/CategoryForm";

// assets
import { lusitana } from "@/assets/fonts";

// types
interface PageProps {
  params: { categoryId: string };
}

export const metadata = {
  title: "NoLine-Deli ► Manager ► Edit Category",
};

export default async function Page({ params: { categoryId } }: PageProps) {
  // Get all the information you need about this particular category
  const category = await getCategory(categoryId);

  // Ensure the category exists
  if (!category) {
    // Missing resource: redirect users to the 404 page
    notFound();
  }

  return (
    <article className={styles["page"]}>
      <h1 className={clsx(lusitana.className, "mb-8 text-xl lg:text-3xl")}>Manager ► Edit Category</h1>
      <CategoryForm category={category} />
    </article>
  );
}
