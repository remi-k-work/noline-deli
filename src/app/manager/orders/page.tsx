// components
import SectionHero from "@/features/manager/components/SectionHero";
import { default as OrdersTableView } from "@/features/manager/orders/components/orders-table/View";

// assets
import bannerOrders from "@/assets/manager/banner-orders.webp";

export const metadata = {
  title: "NoLine-Deli ► Manager ► Orders",
};

export default async function Page() {
  return (
    <>
      <SectionHero heroBanner={bannerOrders} sectionTitle={"Orders"} />
      <OrdersTableView />
    </>
  );
}
