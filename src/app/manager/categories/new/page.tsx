// component css styles
import styles from "./page.module.css";

// other libraries
import PathFinder from "@/features/manager/PathFinder";

// components
import SectionHero from "@/features/manager/components/SectionHero";
import CategoryForm from "@/features/manager/components/CategoryForm";

// assets
import bannerCategories from "@/assets/manager/banner-categories.webp";

export const metadata = {
  title: "NoLine-Deli ► Manager ► New Category",
};

export default async function Page() {
  return (
    <article className={styles["page"]}>
      <SectionHero heroBanner={bannerCategories} sectionTitle={"Categories"} sectionLink={PathFinder.toAllCategories()} />
      <section className="bg-base-300 pb-4 pt-4">
        <CategoryForm />
      </section>
    </article>
  );
}
