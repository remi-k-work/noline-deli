// component css styles
import styles from "./View.module.css";

// next
import { notFound } from "next/navigation";

// prisma and db access
import { getOrderedCart } from "@/features/cart/cartDb";

// other libraries
import Stripe from "stripe";

// components
import Status from "./Status";
import Header from "./Header";
import * as OrderDetails from "@/features/cart/components/order-details";

// types
interface ViewProps {
  paymentIntent: Stripe.PaymentIntent;
}

export default async function View({
  paymentIntent,
  paymentIntent: {
    metadata: { orderedCartId },
  },
}: ViewProps) {
  // Get the ordered cart that the customer has already successfully checked out
  const orderedCart = await getOrderedCart(orderedCartId);
  if (!orderedCart) notFound();

  return (
    <article className={styles["view"]}>
      <Status paymentIntent={paymentIntent} className={styles["view__status"]} />
      <Header paymentIntent={paymentIntent} className={styles["view__header"]} />
      <OrderDetails.Details orderedCart={orderedCart} paymentIntent={paymentIntent} className={styles["view__details"]} />
    </article>
  );
}
