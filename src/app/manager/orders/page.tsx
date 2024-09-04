// component css styles
import styles from "./page.module.css";

// components
import SectionHero from "@/features/manager/components/SectionHero";
// import { default as OrdersTableView } from "@/features/manager/products/components/orders-table/View";

// assets
import bannerOrders from "@/assets/manager/banner-orders.webp";

export const metadata = {
  title: "NoLine-Deli ► Manager ► Orders",
};

export default async function Page() {
  return (
    <article className={styles["page"]}>
      <SectionHero heroBanner={bannerOrders} sectionTitle={"Orders"} />
      {/* <OrdersTableView /> */}
    </article>
  );
}
