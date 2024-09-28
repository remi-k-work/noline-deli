// component css styles
import styles from "./Header.module.css";

// next
import Link from "next/link";

// other libraries
import { cn } from "@/lib/utils";
import Stripe from "stripe";
import { formatCurrency, formatDateTime } from "@/lib/formatters";

// components
import ShipTo from "./ShipTo";

// assets
import { lusitana } from "@/assets/fonts";
import { CalculatorIcon } from "@heroicons/react/24/solid";

// types
interface HeaderProps {
  paymentIntent: Stripe.PaymentIntent;
  className?: string;
}

export default function Header({
  paymentIntent,
  paymentIntent: {
    amount,
    created,
    metadata: { orderNumber, customerEmail, shippingMethod },
    latest_charge,
    payment_method,
  },
  className,
}: HeaderProps) {
  const paymentMethod = (payment_method as Stripe.PaymentMethod).type;
  const receiptUrl = (latest_charge as Stripe.Charge).receipt_url;

  return (
    <article className={cn(styles["header"], className)}>
      <h2 className={lusitana.className}>
        <CalculatorIcon width={64} height={64} />
        Order Summary
      </h2>
      <section className={styles["header__summary"]}>
        <div>
          <h3 className={lusitana.className}>Order Number</h3>
          <p>{orderNumber}</p>
        </div>
        <div>
          <h3 className={lusitana.className}>Date</h3>
          <p>{formatDateTime(new Date(created * 1000))}</p>
        </div>
        <div>
          <h3 className={lusitana.className}>Email</h3>
          <p>{customerEmail}</p>
        </div>
        <div>
          <h3 className={lusitana.className}>Total</h3>
          <p>{formatCurrency(amount)}</p>
        </div>
        <div>
          <h3 className={lusitana.className}>Payment Method</h3>
          <p>{paymentMethod}</p>
        </div>
        <div>
          <h3 className={lusitana.className}>Receipt</h3>
          {receiptUrl ? (
            <Link href={receiptUrl} target="_blank" className="link-hover link">
              View Receipt
            </Link>
          ) : (
            <p>Unavailable</p>
          )}
        </div>
        <div>
          <h3 className={lusitana.className}>Ship To</h3>
          <ShipTo paymentIntent={paymentIntent} />
        </div>
        <div>
          <h3 className={lusitana.className}>Shipping Method</h3>
          <p>{shippingMethod}</p>
        </div>
      </section>
    </article>
  );
}
