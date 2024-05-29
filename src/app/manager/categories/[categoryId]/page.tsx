// component css styles
import styles from "./page.module.css";

// next
import { notFound } from "next/navigation";

// prisma and db access
import { getCategory } from "@/features/manager/dbCategories";

// other libraries
import PathFinder from "@/features/manager/PathFinder";

// components
import SectionHero from "@/features/manager/components/SectionHero";
import CategoryForm from "@/features/manager/components/CategoryForm";

// assets
import bannerCategories from "@/assets/manager/banner-categories.webp";

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
      <SectionHero heroBanner={bannerCategories} sectionTitle={"Categories"} sectionLink={PathFinder.toAllCategories()} />
      <section className="bg-base-content pb-4 pt-4">
        <CategoryForm category={category} />
      </section>
    </article>
  );
}
