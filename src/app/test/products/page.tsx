// component css styles
import { getBrowseBarData } from "@/features/manager/products/db";
import styles from "./page.module.css";

// components
import { default as ProductsTableView } from "@/app/test/products/components/products-table-tan/View";
import { RANGE_OPTIONS } from "@/lib/rangeOptions";
import customersByDay from "@/features/manager/charts/db/customersByDay";
import ordersByDay from "@/features/manager/charts/db/ordersByDay";

export const metadata = {
  title: "NoLine-Deli ► Manager ► Products",
};

export default async function Page() {
  // console.log(await ordersByDay(RANGE_OPTIONS.LAST_YEAR));
  // console.log(a, b);

  return <article className={styles["page"]}>{/* <ProductsTableView /> */}</article>;
}
