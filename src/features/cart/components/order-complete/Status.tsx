// component css styles
import styles from "./Status.module.css";

// other libraries
import { cn } from "@/lib/utils";
import Stripe from "stripe";

// types
interface StatusProps {
  checkoutSession: Stripe.Checkout.Session;
  className?: string;
}

export default function Status({ checkoutSession: { status }, className }: StatusProps) {
  return (
    <section className={cn(styles["status"], className)}>
      {status === "complete" ? (
        <>
          <h2>Payment succeeded!</h2>
          <p>Thank you for your order! You will get an order confirmation shortly. We will also tell you when your order ships.</p>
        </>
      ) : (
        <h2>Your payment was not successful, please try again.</h2>
      )}
    </section>
  );
}
