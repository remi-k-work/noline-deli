// component css styles
import styles from "./page.module.css";

// other libraries
import { cn } from "@/lib/utils";

// components
import MainLayout from "@/components/MainLayout";
import CartTableView from "@/features/cart/components/CartTableView";

// assets
import { lusitana } from "@/assets/fonts";

export const metadata = {
  title: "NoLine-Deli ► Your Shopping Cart",
};

export default async function Page() {
  return (
    <MainLayout>
      <article className={styles["page"]}>
        <h1 className={cn(lusitana.className, "mb-8 text-xl lg:text-3xl")}>Your Shopping Cart</h1>
        <CartTableView />
      </article>
    </MainLayout>
  );
}
