// component css styles
import styles from "./Header.module.css";

// next
import Link from "next/link";

// other libraries
import { cn } from "@/lib/utils";
import Stripe from "stripe";
import { format } from "date-fns";
import { formatPrice } from "@/lib/helpers";

// components
import ShipTo from "./ShipTo";

// assets
import { lusitana } from "@/assets/fonts";

// types
interface HeaderProps {
  paymentIntent: Stripe.PaymentIntent;
  className?: string;
}

export default function Header({
  paymentIntent,
  paymentIntent: {
    status,
    amount,
    created,
    metadata: { orderNumber, customerEmail },
    latest_charge,
    payment_method,
  },
  className,
}: HeaderProps) {
  // Do not render anything in the event of an unsuccessful payment intent
  if (status !== "succeeded" && status !== "processing") return;

  const paymentMethod = (payment_method as Stripe.PaymentMethod).type;
  const receiptUrl = (latest_charge as Stripe.Charge).receipt_url;

  return (
    <article className={cn(styles["header"], className)}>
      <section className={styles["header__order-number"]}>
        <h3 className={lusitana.className}>Order Number</h3>
        <p>{orderNumber}</p>
      </section>
      <section className={styles["header__date"]}>
        <h3 className={lusitana.className}>Date</h3>
        <p>{format(created * 1000, "EEEE, MMMM d, yyyy")}</p>
      </section>
      <section className={styles["header__email"]}>
        <h3 className={lusitana.className}>Email</h3>
        <p>{customerEmail}</p>
      </section>
      <section className={styles["header__total"]}>
        <h3 className={lusitana.className}>Total</h3>
        <p>{formatPrice(amount)}</p>
      </section>
      <section className={styles["header__payment-method"]}>
        <h3 className={lusitana.className}>Payment Method</h3>
        <p>{paymentMethod}</p>
      </section>
      <section className={styles["header__receipt"]}>
        <h3 className={lusitana.className}>Receipt</h3>
        {receiptUrl ? (
          <Link href={receiptUrl} target="_blank" className="link-hover link">
            View Receipt
          </Link>
        ) : (
          <p>Unavailable</p>
        )}
      </section>
      <section className={styles["header__ship-to"]}>
        <h3 className={lusitana.className}>Ship To</h3>
        <ShipTo paymentIntent={paymentIntent} />
      </section>
    </article>
  );
}
