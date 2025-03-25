// component css styles
import styles from "./page.module.css";

// prisma and db access
import { getCart } from "@/features/cart/db/cart";

// components
import MainLayout from "@/features/storefront/components/MainLayout";
import Checkout from "@/features/cart/components/checkout";

// types
interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined; guest_test_customer_id: string | undefined }>;
}

export const metadata = {
  title: "NoLine-Deli ► Checkout Page",
};

export default async function Page({ searchParams: searchParamsPromise }: PageProps) {
  const { guest_test_customer_id } = await searchParamsPromise;

  // Get an existing or brand-new empty cart from our database
  const cart = await getCart();

  return (
    <MainLayout>
      <article className={styles["page"]}>
        <h1 className="font-lusitana mb-8 text-xl lg:text-3xl">Checkout Page</h1>
        <Checkout cart={cart} hasPickedCustomerId={!!guest_test_customer_id} />
      </article>
    </MainLayout>
  );
}
