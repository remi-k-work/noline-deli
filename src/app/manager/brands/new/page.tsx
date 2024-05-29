// component css styles
import styles from "./page.module.css";

// other libraries
import PathFinder from "@/features/manager/PathFinder";

// components
import SectionHero from "@/features/manager/components/SectionHero";
import BrandForm from "@/features/manager/components/BrandForm";

// assets
import bannerBrands from "@/assets/manager/banner-brands.webp";

export const metadata = {
  title: "NoLine-Deli ► Manager ► New Brand",
};

export default async function Page() {
  return (
    <article className={styles["page"]}>
      <SectionHero heroBanner={bannerBrands} sectionTitle={"Brands"} sectionLink={PathFinder.toAllBrands()} />
      <section className="bg-base-content pb-4 pt-4">
        <BrandForm />
      </section>
    </article>
  );
}
