// component css styles
import styles from "./page.module.css";

// components
import MainLayout from "@/features/storefront/components/MainLayout";
import { default as CartTableView } from "@/features/cart/components/cart-table/View";

export const metadata = {
  title: "NoLine-Deli ► Your Shopping Cart",
};

export default async function Page() {
  return (
    <MainLayout>
      <article className={styles["page"]}>
        <h1 className="font-lusitana mb-8 text-xl lg:text-3xl">Your Shopping Cart</h1>
        <CartTableView />
      </article>
    </MainLayout>
  );
}
