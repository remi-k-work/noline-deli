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

// Create a nodemailer transporter
const TRANSPORTER = nodemailer.createTransport({
  host: process.env.TRANSPORTER_HOST,
  port: 587,
  auth: { user: process.env.TRANSPORTER_USER, pass: process.env.TRANSPORTER_PASS },
});

// Send an email using the nodemailer transporter
const sendEmail = (to: string, subject: string, emailHtml: string) =>
  TRANSPORTER.sendMail({ from: process.env.TRANSPORTER_USER, to, subject, html: emailHtml });

// Send the order confirmation email
export const sendOrderConfirmation = async (checkoutSession: Stripe.Checkout.Session, order: OrderWithItemsSimple): Promise<void> => {
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

  // Import the email template component and convert it into an html string
  const emailHtml = await render(
    <OrderConfirmation
      order={order}
      customerEmail={customerEmail}
      paymentMethodType={paymentMethodType}
      receiptUrl={receiptUrl}
      shipTo={{ name, ...address }}
    />,
  );

  // Finally, send an email using the nodemailer transporter
  await sendEmail(customerEmail, "NoLine-Deli ► Order Confirmation", emailHtml);
};
