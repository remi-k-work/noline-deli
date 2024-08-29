// component css styles
import styles from "./page.module.css";

// components
import { default as ProductsTableView } from "@/app/test/products/components/products-table-tan/View";

export const metadata = {
  title: "NoLine-Deli ► Manager ► Products",
};

export default async function Page() {
  return (
    <article className={styles["page"]}>
      <ProductsTableView />
    </article>
  );
}
