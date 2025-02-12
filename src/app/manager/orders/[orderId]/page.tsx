// component css styles
import styles from "./page.module.css";

// next
import { notFound } from "next/navigation";

// prisma and db access
import { getOrder } from "@/features/manager/orders/db";

// other libraries
import PathFinder from "@/lib/PathFinder";

// components
import SectionHero from "@/features/manager/components/SectionHero";
import OrderView from "@/features/manager/orders/components/order-view";

// assets
import bannerOrders from "@/assets/manager/banner-orders.webp";

// types
interface PageProps {
  params: { orderId: string };
}

export const metadata = {
  title: "NoLine-Deli ► Manager ► View Order",
};

export default async function Page({ params: { orderId } }: PageProps) {
  // Get all the information you need about this particular order
  const order = await getOrder(orderId);

  // Ensure the order exists
  if (!order) notFound();

  return (
    <article className={styles["page"]}>
      <SectionHero heroBanner={bannerOrders} sectionTitle={"Orders"} sectionLink={PathFinder.toAllOrders()} />
      <section className="bg-base-300 pb-4 pt-4">
        <OrderView order={order} />
      </section>
    </article>
  );
}
