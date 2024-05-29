// component css styles
import styles from "./page.module.css";

// prisma and db access
import { allCategories } from "@/features/manager/dbCategories";

// other libraries
import PathFinder from "@/features/manager/PathFinder";

// components
import SectionHero from "@/features/manager/components/SectionHero";
import SubCategoryForm from "@/features/manager/components/SubCategoryForm";

// assets
import bannerSubCategories from "@/assets/manager/banner-subcategories.webp";

export const metadata = {
  title: "NoLine-Deli ► Manager ► New SubCategory",
};

export default async function Page() {
  // Retrieve all of the categories from an external source (database)
  const categories = await allCategories();

  return (
    <article className={styles["page"]}>
      <SectionHero heroBanner={bannerSubCategories} sectionTitle={"SubCategories"} sectionLink={PathFinder.toAllSubCategories()} />
      <section className="bg-base-content pb-4 pt-4">
        <SubCategoryForm categories={categories} />
      </section>
    </article>
  );
}
