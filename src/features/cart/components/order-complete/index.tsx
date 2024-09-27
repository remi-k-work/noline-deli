// component css styles
import styles from "./index.module.css";

// next
import { notFound } from "next/navigation";

// prisma and db access
import { getOrderedCart } from "@/features/cart/db/cart";

// other libraries
import Stripe from "stripe";

// components
import Status from "./Status";
import Header from "./Header";
import OrderDetails from "@/features/cart/components/order-details";

// types
interface OrderCompleteProps {
  paymentIntent: Stripe.PaymentIntent;
}

export default async function OrderComplete({
  paymentIntent,
  paymentIntent: {
    metadata: { orderedCartId },
  },
}: OrderCompleteProps) {
  // Get the ordered cart that the customer has already successfully checked out
  const orderedCart = await getOrderedCart(orderedCartId);
  if (!orderedCart) notFound();

  return (
    <>
      <Status paymentIntent={paymentIntent} />
      <br />
      <article className={styles["order-complete"]}>
        <Header paymentIntent={paymentIntent} />
        <OrderDetails orderedCart={orderedCart} paymentIntent={paymentIntent} />
      </article>
    </>
  );
}
