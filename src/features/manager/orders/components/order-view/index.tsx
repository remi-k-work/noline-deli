// component css styles
import styles from "./index.module.css";

// next
import { notFound } from "next/navigation";

// prisma and db access
import { OrderWithItems } from "../../db";

// other libraries
import stripe from "@/lib/stripe";

// components
import Header from "./Header";
import OrderDetails from "../order-details";

// types
interface OrderViewProps {
  order: OrderWithItems;
}

export default async function OrderView({ order, order: { paymentIntentId } }: OrderViewProps) {
  // Retrieve the payment intent object that is attached to this order
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, { expand: ["latest_charge", "payment_method"] });

  // Ensure the payment intent exists
  if (!paymentIntent) notFound();

  return (
    <article className={styles["order-view"]}>
      <Header paymentIntent={paymentIntent} />
      <OrderDetails order={order} />
    </article>
  );
}
