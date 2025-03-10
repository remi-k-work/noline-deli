// component css styles
import styles from "./Header.module.css";

// next
import Link from "next/link";

// other libraries
import { cn } from "@/lib/utils";
import Stripe from "stripe";
import { formatCurrency } from "@/lib/formatters";

// components
import UserDateTime from "@/components/UserDateTime";
import ShipTo from "./ShipTo";

// assets
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
      <h2 className="font-lusitana">
        <CalculatorIcon width={64} height={64} />
        Order Summary
      </h2>
      <section className={styles["header__summary"]}>
        <div>
          <h3 className="font-lusitana">Order Number</h3>
          <p>{orderNumber}</p>
        </div>
        <div>
          <h3 className="font-lusitana">Date</h3>
          <UserDateTime created={created} />
        </div>
        <div>
          <h3 className="font-lusitana">Email</h3>
          <p>{customerEmail}</p>
        </div>
        <div>
          <h3 className="font-lusitana">Total</h3>
          <p>{formatCurrency(amount)}</p>
        </div>
        <div>
          <h3 className="font-lusitana">Payment Method</h3>
          <p>{paymentMethod}</p>
        </div>
        <div>
          <h3 className="font-lusitana">Receipt</h3>
          {receiptUrl ? (
            <Link href={receiptUrl} target="_blank" className="link">
              View Receipt
            </Link>
          ) : (
            <p>Unavailable</p>
          )}
        </div>
        <div>
          <h3 className="font-lusitana">Ship To</h3>
          <ShipTo paymentIntent={paymentIntent} />
        </div>
        <div>
          <h3 className="font-lusitana">Shipping Method</h3>
          <p>{shippingMethod}</p>
        </div>
      </section>
    </article>
  );
}
