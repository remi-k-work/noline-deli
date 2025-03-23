// component css styles
import styles from "./index.module.css";

// next
import { notFound, redirect } from "next/navigation";

// prisma and db access
import { getOrderedCart } from "@/features/cart/db/cart";
import { processCheckoutSession } from "@/features/cart/db/helpers";

// other libraries
import PathFinder from "@/lib/PathFinder";
import Stripe from "stripe";

// components
import Status from "./Status";
import Header from "./Header";
import OrderDetails from "@/features/cart/components/order-details";

// types
interface OrderCompleteProps {
  checkoutSession: Stripe.Checkout.Session;
}

export default async function OrderComplete({ checkoutSession, checkoutSession: { status } }: OrderCompleteProps) {
  // The payment failed or was canceled; remount checkout so that the customer can try again
  if (status === "open") redirect(PathFinder.toSfCheckoutPage());

  // The payment succeeded; use the information from the checkout session to render a success page
  if (status === "complete") {
    // Process the stripe checkout session by extracting and converting the relevant information
    const { orderedCartId } = processCheckoutSession(checkoutSession);

    // Get the ordered cart that the customer has already successfully checked out
    const orderedCart = await getOrderedCart(orderedCartId);
    if (!orderedCart) notFound();

    return (
      <>
        <Status isSuccess />
        <br />
        <article className={styles["order-complete"]}>
          <Header checkoutSession={checkoutSession} />
          <OrderDetails checkoutSession={checkoutSession} orderedCart={orderedCart} />
        </article>
      </>
    );
  }

  // The payment failed; render a failure page
  return <Status />;
}
