// component css styles
import { getBrowseBarData } from "@/features/manager/products/db";
import styles from "./page.module.css";

// components
import { default as ProductsTableView } from "@/app/test/products/components/products-table-tan/View";

export const metadata = {
  title: "NoLine-Deli ► Manager ► Products",
};

export default async function Page() {
  await getBrowseBarData();
  // console.log(a, b);

  return <article className={styles["page"]}>{/* <ProductsTableView /> */}</article>;
}
