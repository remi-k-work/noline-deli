// component css styles
import styles from "./page.module.css";

// other libraries
import clsx from "clsx";
import PathFinder from "@/features/manager/PathFinder";

// components
import SectionHero, { SectionLink } from "@/features/manager/components/SectionHero";

// assets
import { lusitana } from "@/assets/fonts";
import bannerManager from "@/assets/manager/banner-manager.webp";
import bannerBrands from "@/assets/manager/banner-brands.webp";
import bannerCategories from "@/assets/manager/banner-categories.webp";
import bannerSubCategories from "@/assets/manager/banner-subcategories.webp";
import bannerProducts from "@/assets/manager/banner-products.webp";

export const metadata = {
  title: "NoLine-Deli ► Manager",
};

export default async function Page() {
  return (
    <article className={styles["page"]}>
      <SectionHero heroBanner={bannerManager} sectionTitle={"Home"} />
      <article className={styles["dashboard"]}>
        <h4 className={clsx(lusitana.className, "text-xl")}>Choose the section to manage</h4>
        <ul className={styles["dashboard__main-menu"]}>
          <li>
            <SectionLink linkBanner={bannerBrands} sectionTitle={"Brands"} sectionLink={PathFinder.toAllBrands()} />
          </li>
          <li>
            <SectionLink linkBanner={bannerCategories} sectionTitle={"Categories"} sectionLink={PathFinder.toAllCategories()} />
          </li>
          <li>
            <SectionLink linkBanner={bannerSubCategories} sectionTitle={"SubCategories"} sectionLink={PathFinder.toAllSubCategories()} />
          </li>
          <li>
            <SectionLink linkBanner={bannerProducts} sectionTitle={"Products"} sectionLink={PathFinder.toAllProducts()} />
          </li>
        </ul>
      </article>
    </article>
  );
}
