// component css styles
import styles from "./page.module.css";

// next
import { ReadonlyURLSearchParams } from "next/navigation";

// other libraries
import clsx from "clsx";
import SearchParamsState from "@/features/manager/SearchParamsState";

// components
import ProductsBrowseBar from "@/features/manager/components/ProductsBrowseBar";
import ProductsTableView from "@/features/manager/components/ProductsTableView";

// assets
import { lusitana } from "@/assets/fonts";

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
      <h1 className={clsx(lusitana.className, "mb-8 text-xl lg:text-3xl")}>Manager ► Products</h1>
      <ProductsBrowseBar />
      <ProductsTableView searchParamsState={searchParamsState} />
    </article>
  );
}
