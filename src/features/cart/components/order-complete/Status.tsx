// component css styles
import styles from "./Status.module.css";

// other libraries
import { cn } from "@/lib/utils";
import Stripe from "stripe";

// types
interface StatusProps {
  paymentIntent: Stripe.PaymentIntent;
  className?: string;
}

export default function Status({ paymentIntent: { status }, className }: StatusProps) {
  return (
    <section className={cn(styles["status"], className)}>
      {status === "succeeded" ? (
        <>
          <h2>Payment succeeded!</h2>
          <p>Thank you for your order! You will get an order confirmation shortly. We will also tell you when your order ships.</p>
        </>
      ) : status === "processing" ? (
        <>
          <h2>Your payment is processing.</h2>
          <p>
            Thank you for your order! You will receive an order confirmation shortly. We are still awaiting your payment, but once it clears, we will proceed
            with your order.
          </p>
        </>
      ) : status === "requires_payment_method" ? (
        <h2>Your payment was not successful, please try again.</h2>
      ) : (
        <h2>Something went wrong.</h2>
      )}
    </section>
  );
}
