"use server";

// next
import { headers } from "next/headers";

// prisma and db access
import { createLineItemsFromCart, getOrderedCart } from "@/features/cart/db/cart";
import { allStripeGuestCustomers, SHIPPING_OPTIONS } from "@/features/cart/db/orders";

// other libraries
import { z } from "zod";
import { actionClient } from "@/lib/safeAction";
import stripe from "@/services/stripe";
import { nanoid } from "nanoid";
import { emailSchema, objectIdSchema, priceSchema } from "@/features/manager/formActionTypes";
import { faker } from "@faker-js/faker";

// types
interface PaymentIntentActionResult {
  clientSecret: string | null;
}

export async function fetchClientSecret(): Promise<string> {
  // Extract the origin of the incoming request
  const origin = (await headers()).get("origin");

  // Get the ordered cart that the customer has already successfully checked out
  const orderedCart = await getOrderedCart();
  if (!orderedCart) throw new Error("The ordered cart is missing!");
  const { id: orderedCartId, subTotal, taxAmount, cartItems } = orderedCart;

  // Retrieve all guest customers but only their stripe customer id and email, then pick a random one
  const { stripeCustomerId, email: customerEmail } = faker.helpers.arrayElement(await allStripeGuestCustomers());

  // Create a new checkout session for this customer
  const checkoutSession = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    billing_address_collection: "required",
    shipping_address_collection: { allowed_countries: ["US", "CA", "PL", "DE"] },
    automatic_tax: { enabled: true },
    customer_update: { shipping: "auto" },
    saved_payment_method_options: { payment_method_save: "enabled" },

    ui_mode: "embedded",
    mode: "payment",
    return_url: `${origin}/cart/order/complete?session_id={CHECKOUT_SESSION_ID}`,
    payment_intent_data: { receipt_email: customerEmail, metadata: { customerEmail, orderedCartId, subTotal, taxAmount } },
    metadata: { customerEmail, orderedCartId, subTotal, taxAmount },
    line_items: createLineItemsFromCart(cartItems, origin),
    shipping_options: SHIPPING_OPTIONS,
  });

  // Return the checkout session’s client secret in the response to finish the checkout on the client
  if (!checkoutSession.client_secret) throw new Error("The client secret is missing!");
  return checkoutSession.client_secret;
}

export const createPaymentIntent = actionClient
  .schema(
    z.object({
      customerEmail: emailSchema,
      orderedCartId: objectIdSchema,
      subTotal: priceSchema,
      taxAmount: priceSchema,
      shippingCost: priceSchema,
      shippingMethod: z.string(),
    }),
  )
  .action(async ({ parsedInput: { customerEmail, orderedCartId, subTotal, taxAmount, shippingCost, shippingMethod } }): Promise<PaymentIntentActionResult> => {
    try {
      // Create a paymentintent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: subTotal + taxAmount + shippingCost,
        currency: "usd",
        metadata: { orderNumber: nanoid(), customerEmail, orderedCartId, subTotal, taxAmount, shippingCost, shippingMethod },
      });

      // Return the paymentintent’s client secret in the response to finish the payment on the client
      return { clientSecret: paymentIntent.client_secret };
    } catch (error) {
      // If any error occurs, rethrow, which means action simply "failed"
      throw error;
    }
  });
