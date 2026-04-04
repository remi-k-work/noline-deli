// prisma and db access
import type { OrderWithItemsSimple } from "@/features/storefront/db/types";
import { processCheckoutSession, processPaymentIntent } from "@/features/cart/db/helpers";

// other libraries
import { Resend } from "resend";
import Stripe from "stripe";

// components
import OrderConfirmation from "./OrderConfirmation";

// types
import type { ReactNode } from "react";

// Create the transporter
const resend = new Resend(process.env.RESEND_API_KEY);

// Send an email using the transporter
const sendEmail = (to: string, subject: string, react: ReactNode) => resend.emails.send({ from: "noline-deli@remiforge.dev", to, subject, react });

// Send the order confirmation email
export const sendOrderConfirmation = async (checkoutSession: Stripe.Checkout.Session, order: OrderWithItemsSimple) => {
  // Process the stripe checkout session by extracting and converting the relevant information
  const {
    paymentIntent,
    paymentIntent: { shipping },
    customerEmail,
  } = processCheckoutSession(checkoutSession);

  // Process the stripe payment intent by extracting and converting the relevant information
  const { paymentMethodType, receiptUrl } = processPaymentIntent(paymentIntent);

  // If there is no shipping address, do not send an email
  if (!shipping || !shipping.address) return;
  const { name, address } = shipping;

  // Finally, send an email using the nodemailer transporter
  await sendEmail(
    customerEmail,
    "NoLine-Deli ► Order Confirmation",
    <OrderConfirmation
      order={order}
      customerEmail={customerEmail}
      paymentMethodType={paymentMethodType}
      receiptUrl={receiptUrl}
      shipTo={{ name, ...address }}
    />,
  );
};
