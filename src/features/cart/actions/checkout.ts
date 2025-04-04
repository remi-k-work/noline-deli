"use server";

// next
import { headers } from "next/headers";

// prisma and db access
import { getOrderedCart } from "@/features/cart/db/cart";
import { getCustomer } from "@/features/storefront/db/customers";
import { createLineItemsFromCart } from "@/features/cart/db/helpers";
import { SHIPPING_OPTIONS } from "@/features/cart/db/consts";

// other libraries
import PathFinder from "@/lib/PathFinder";
import stripe from "@/services/stripe";
import { nanoid } from "nanoid";

export async function fetchClientSecret(customerId: string): Promise<string> {
  // Extract the origin of the incoming request
  const origin = (await headers()).get("origin");

  // Get the ordered cart that the customer has already successfully checked out
  const orderedCart = await getOrderedCart();
  if (!orderedCart) throw new Error("The ordered cart is missing!");
  const { id: orderedCartId, cartItems } = orderedCart;

  // Get all the information you need about this particular customer
  const customer = await getCustomer(customerId);
  if (!customer) throw new Error("The customer is missing!");
  const { stripeCustomerId, email: customerEmail } = customer;

  // Create a new checkout session for this customer
  const checkoutSession = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    billing_address_collection: "required",
    shipping_address_collection: { allowed_countries: ["US", "CA", "PL", "DE"] },
    automatic_tax: { enabled: true },
    customer_update: { shipping: "auto" },
    saved_payment_method_options: { payment_method_save: "enabled", allow_redisplay_filters: ["always", "limited", "unspecified"] },

    ui_mode: "embedded",
    mode: "payment",
    return_url: PathFinder.toSfOrderCompleteWithOrigin(customerId, origin),
    payment_intent_data: { receipt_email: customerEmail },
    metadata: { orderNumber: nanoid(), customerId, customerEmail, orderedCartId },
    line_items: createLineItemsFromCart(cartItems, origin),
    shipping_options: SHIPPING_OPTIONS,
  });

  // Return the checkout session’s client secret in the response to finish the checkout on the client
  if (!checkoutSession.client_secret) throw new Error("The client secret is missing!");
  return checkoutSession.client_secret;
}
