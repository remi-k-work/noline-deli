// component css styles
import styles from "./page.module.css";

// prisma and db access
import { getCart } from "@/features/cart/cartDb";

// components
import Checkout from "@/features/cart/components/checkout";

export default async function Page() {
  // const endpointUrl = new URL("/webhooks/stripe", process.env.NEXT_PUBLIC_SERVER_URL_PRO);

  // try {
  //   const webhookEndpoint = await stripe.webhookEndpoints.create({
  //     enabled_events: ["charge.succeeded", "charge.failed"],
  //     url: endpointUrl.href,
  //   });
  //   console.log(webhookEndpoint);
  // } catch (error) {
  //   if (error instanceof Stripe.errors.StripeError) {
  //     console.log(error.type);
  //   }
  // }

  // Get an existing or brand-new empty cart from our database
  const cart = await getCart();

  return (
    <article className={styles["page"]}>
      <Checkout cart={cart} />
    </article>
  );
}
