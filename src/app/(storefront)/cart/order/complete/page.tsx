// component css styles
import styles from "./page.module.css";

// next
import { notFound } from "next/navigation";

// other libraries
import { cn } from "@/lib/utils";
import stripe from "@/services/stripe";

// components
import MainLayout from "@/features/storefront/components/MainLayout";
import OrderComplete from "@/features/cart/components/order-complete";

// assets
import { lusitana } from "@/assets/fonts";

// types
interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined; payment_intent: string | undefined }>;
}

export const metadata = {
  title: "NoLine-Deli ► Order Complete",
};

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;

  const {
    payment_intent
  } = searchParams;

  // When stripe redirects the customer to the return_url, the payment_intent query parameter is appended by stripe.js
  if (!payment_intent) notFound();

  // Use this to retrieve the paymentintent status update and determine what to show to your customer
  const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent, { expand: ["latest_charge", "payment_method"] });

  return (
    <MainLayout>
      <article className={styles["page"]}>
        <h1 className={cn(lusitana.className, "mb-8 text-xl lg:text-3xl")}>Order Complete</h1>
        <OrderComplete paymentIntent={paymentIntent} />
      </article>
    </MainLayout>
  );
}
