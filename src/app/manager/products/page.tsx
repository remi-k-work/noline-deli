// component css styles
import styles from "./page.module.css";

// next
import { ReadonlyURLSearchParams } from "next/navigation";

// other libraries
import SearchParamsState from "@/features/manager/SearchParamsState";

// components
import SectionHero from "@/features/manager/components/SectionHero";
import ProductsTableView from "@/features/manager/products/components/ProductsTableView";

// assets
import bannerProducts from "@/assets/manager/banner-products.webp";

// types
interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export const metadata = {
  title: "NoLine-Deli ► Manager ► Products",
};

export default async function Page({ searchParams }: PageProps) {
  const searchParamsState = new SearchParamsState("", new ReadonlyURLSearchParams(new URLSearchParams(searchParams as any)));

  return (
    <article className={styles["page"]}>
      <SectionHero heroBanner={bannerProducts} sectionTitle={"Products"} />
      <ProductsTableView searchParamsState={searchParamsState} />
    </article>
  );
}
