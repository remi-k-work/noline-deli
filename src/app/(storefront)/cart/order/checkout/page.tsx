// component css styles
import styles from "./page.module.css";

// prisma and db access
import { getCart } from "@/features/cart/db/cart";

// other libraries
import { cn } from "@/lib/utils";

// components
import MainLayout from "@/features/storefront/components/MainLayout";
import Checkout from "@/features/cart/components/checkout";

// assets
import { lusitana } from "@/assets/fonts";

export const metadata = {
  title: "NoLine-Deli ► Checkout Page",
};

export default async function Page() {
  // Get an existing or brand-new empty cart from our database
  const cart = await getCart();

  return (
    <MainLayout>
      <article className={styles["page"]}>
        <h1 className={cn(lusitana.className, "mb-8 text-xl lg:text-3xl")}>Checkout Page</h1>
        <Checkout cart={cart} />
      </article>
    </MainLayout>
  );
}
