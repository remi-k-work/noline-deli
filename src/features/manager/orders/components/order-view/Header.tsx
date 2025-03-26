// component css styles
import styles from "./Header.module.css";

// next
import Link from "next/link";

// prisma and db access
import type { OrderWithItems } from "@/features/manager/orders/db";
import { processCheckoutSession, processDisconnectedOrder, processPaymentIntent } from "@/features/cart/db/helpers";

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
  order: OrderWithItems;
  checkoutSession?: Stripe.Checkout.Session;
  className?: string;
}

export default async function Header({ order, order: { isConnected }, checkoutSession, className }: HeaderProps) {
  let paymentIntent: Stripe.PaymentIntent | undefined = undefined,
    totalPaid: number,
    shippingMethod: string,
    created: Date,
    orderNumber: string,
    customerEmail: string | undefined,
    paymentMethodType: string = "Unknown",
    receiptUrl: string | null = null;

  // Process the stripe checkout session by extracting and converting the relevant information, but only for connected orders
  if (isConnected && checkoutSession) {
    ({ paymentIntent, totalPaid, shippingMethod, created, orderNumber, customerEmail } = processCheckoutSession(checkoutSession));

    // Process the stripe payment intent by extracting and converting the relevant information
    ({ paymentMethodType, receiptUrl } = processPaymentIntent(paymentIntent));
  } else {
    // Process the disconnected (from stripe) order and use it as a fallback to extract the relevant information
    ({ totalPaid, shippingMethod, created, orderNumber, customerEmail } = await processDisconnectedOrder(order));
  }

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
          <UserDateTime date={created} />
        </div>
        <div>
          <h3 className="font-lusitana">Email</h3>
          <p>{customerEmail}</p>
        </div>
        <div>
          <h3 className="font-lusitana">Total</h3>
          <p>{formatCurrency(totalPaid)}</p>
        </div>
        <div>
          <h3 className="font-lusitana">Payment Method</h3>
          <p>{paymentMethodType}</p>
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
