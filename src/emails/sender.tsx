/* eslint-disable testing-library/render-result-naming-convention */

// prisma and db access
import type { OrderWithItemsSimple } from "@/features/storefront/db/types";
import { processCheckoutSession, processPaymentIntent } from "@/features/cart/db/helpers";

// other libraries
import nodemailer from "nodemailer";
import Stripe from "stripe";

// components
import { render } from "@react-email/components";
import OrderConfirmation from "./OrderConfirmation";
import type { ShipToProps } from "./components/order-confirmation/header/ShipTo";

// Create a nodemailer transporter
const TRANSPORTER = nodemailer.createTransport({
  host: process.env.TRANSPORTER_HOST,
  port: 587,
  auth: { user: process.env.TRANSPORTER_USER, pass: process.env.TRANSPORTER_PASS },
});

// Send an email using the nodemailer transporter
const sendEmail = (to: string, subject: string, emailHtml: string) =>
  TRANSPORTER.sendMail({ from: process.env.TRANSPORTER_USER, to, subject, html: emailHtml });

// Send an email with a order confirmation
export const sendOrderConfirmation = async (
  checkoutSession: Stripe.Checkout.Session,
  order: OrderWithItemsSimple,
  customerEmail: string,
  shipTo: ShipToProps,
): Promise<void> => {
  // Process the stripe checkout session by extracting and converting the relevant information
  const { paymentIntent } = processCheckoutSession(checkoutSession);

  // Process the stripe payment intent by extracting and converting the relevant information
  const { paymentMethodType, receiptUrl } = processPaymentIntent(paymentIntent);

  // Import the email template component and convert it into an html string
  const emailHtml = await render(
    <OrderConfirmation order={order} customerEmail={customerEmail} paymentMethodType={paymentMethodType} receiptUrl={receiptUrl} shipTo={shipTo} />,
  );

  // Finally, send an email using the nodemailer transporter
  await sendEmail(customerEmail, "NoLine-Deli ► Order Confirmation", emailHtml);
};
