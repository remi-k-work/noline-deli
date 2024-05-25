// component css styles
import styles from "./page.module.css";

// next
import { ReadonlyURLSearchParams } from "next/navigation";

// other libraries
import clsx from "clsx";
import SearchParamsState from "@/features/manager/SearchParamsState";

// components
import BrandsTableView from "@/features/manager/components/BrandsTableView";

// assets
import { lusitana } from "@/assets/fonts";

// types
interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export const metadata = {
  title: "NoLine-Deli ► Manager ► Brands",
};

export default async function Page({ searchParams }: PageProps) {
  const searchParamsState = new SearchParamsState("", new ReadonlyURLSearchParams(new URLSearchParams(searchParams as any)));

  return (
    <article className={styles["page"]}>
      <h1 className={clsx(lusitana.className, "mb-8 text-xl lg:text-3xl")}>Manager ► Brands</h1>
      <BrandsTableView searchParamsState={searchParamsState} />
    </article>
  );
}
