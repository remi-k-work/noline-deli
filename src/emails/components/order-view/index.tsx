// component css styles
import styles from "./index.module.css";

// next
import { notFound } from "next/navigation";

// prisma and db access
import type { OrderWithItems } from "@/features/manager/orders/db";

// other libraries
import stripe from "@/services/stripe";
import Stripe from "stripe";

// components
import Header from "./Header";
import OrderDetails from "@/features/manager/orders/components/order-details";

// types
interface OrderViewProps {
  order: OrderWithItems;
}

export default async function OrderView({ order, order: { checkoutSessionId, isConnected } }: OrderViewProps) {
  let checkoutSession: Stripe.Checkout.Session | undefined = undefined;

  // Retrieve the checkout session object associated with this order, but only if it is connected to stripe
  if (isConnected) {
    checkoutSession = await stripe.checkout.sessions.retrieve(checkoutSessionId, {
      expand: ["payment_intent.payment_method", "payment_intent.latest_charge", "shipping_cost.shipping_rate"],
    });

    // Ensure the checkout session exists
    if (!checkoutSession) notFound();
  }

  return (
    <article className={styles["order-view"]}>
      <Header order={order} checkoutSession={checkoutSession} />
      <OrderDetails order={order} />
    </article>
  );
}
