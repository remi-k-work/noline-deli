// component css styles
import styles from "./page.module.css";

// next
import { ReadonlyURLSearchParams } from "next/navigation";

// other libraries
import SearchParamsState from "@/features/manager/SearchParamsState";

// components
import SectionHero from "@/features/manager/components/SectionHero";
import CategoriesTableView from "@/features/manager/components/CategoriesTableView";

// assets
import bannerCategories from "@/assets/manager/banner-categories.webp";

// types
interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export const metadata = {
  title: "NoLine-Deli ► Manager ► Categories",
};

export default async function Page({ searchParams }: PageProps) {
  const searchParamsState = new SearchParamsState("", new ReadonlyURLSearchParams(new URLSearchParams(searchParams as any)));

  return (
    <article className={styles["page"]}>
      <SectionHero heroBanner={bannerCategories} sectionTitle={"Categories"} />
      <CategoriesTableView searchParamsState={searchParamsState} />
    </article>
  );
}
