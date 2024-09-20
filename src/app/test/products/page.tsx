// component css styles
import { getBrowseBarData } from "@/features/manager/products/db";
import { ordersByDay } from "@/features/manager/charts/db";
import styles from "./page.module.css";

// components
import { default as ProductsTableView } from "@/app/test/products/components/products-table-tan/View";
import { RANGE_OPTIONS } from "@/lib/rangeOptions";

export const metadata = {
  title: "NoLine-Deli ► Manager ► Products",
};

export default async function Page() {
  await ordersByDay(RANGE_OPTIONS.LAST_MONTH);
  // console.log(a, b);

  return <article className={styles["page"]}>{/* <ProductsTableView /> */}</article>;
}
