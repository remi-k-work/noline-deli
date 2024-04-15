// component css styles
import styles from "./page.module.css";

// other libraries
import clsx from "clsx";

// components
import ProductsTableView from "@/features/manager/components/ProductsTableView";

// assets
import { lusitana } from "@/assets/fonts";

export const metadata = {
  title: "NoLine-Deli ► Manager ► Products",
};

export default async function Page() {
  return (
    <article className={styles["page"]}>
      <h1 className={clsx(lusitana.className, "mb-8 text-xl lg:text-3xl")}>Manager ► Products</h1>
      <ProductsTableView />
    </article>
  );
}
