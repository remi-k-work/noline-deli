// component css styles
import styles from "./page.module.css";

// next
import { ReadonlyURLSearchParams } from "next/navigation";

// other libraries
import SearchParamsState from "@/features/manager/SearchParamsState";

// components
import SectionHero from "@/features/manager/components/SectionHero";
import { default as SubCategoriesTableView } from "@/features/manager/subcategories/components/subcategories-table/View";

// assets
import bannerSubCategories from "@/assets/manager/banner-subcategories.webp";

// types
interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export const metadata = {
  title: "NoLine-Deli ► Manager ► SubCategories",
};

export default async function Page({ searchParams }: PageProps) {
  const searchParamsState = new SearchParamsState(new ReadonlyURLSearchParams(searchParams as any));

  return (
    <article className={styles["page"]}>
      <SectionHero heroBanner={bannerSubCategories} sectionTitle={"SubCategories"} />
      <SubCategoriesTableView searchParamsState={searchParamsState} />
    </article>
  );
}
