// component css styles
import styles from "./page.module.css";

// next
import { notFound } from "next/navigation";

// other libraries
import stripe from "@/services/stripe";

// components
import MainLayout from "@/features/storefront/components/MainLayout";
import OrderComplete from "@/features/cart/components/order-complete";

// types
interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined; session_id: string | undefined }>;
}

export const metadata = {
  title: "NoLine-Deli ► Order Complete",
};

export default async function Page({ searchParams: searchParamsPromise }: PageProps) {
  const { session_id } = await searchParamsPromise;
  if (!session_id) notFound();

  // Use the checkout session id in the url to retrieve the status of the checkout session
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, { expand: ["payment_intent"] });

  return (
    <MainLayout>
      <article className={styles["page"]}>
        <h1 className="font-lusitana mb-8 text-xl lg:text-3xl">Order Complete</h1>
        <OrderComplete checkoutSession={checkoutSession} />
      </article>
    </MainLayout>
  );
}
