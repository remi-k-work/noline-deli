"use server";

// next
import { headers } from "next/headers";

// prisma and db access
import { getOrderedCart } from "@/features/cart/db/cart";
import { allGuestTestCustomers } from "@/features/cart/db/orders";
import { createLineItemsFromCart } from "@/features/cart/db/helpers";
import { SHIPPING_OPTIONS } from "@/features/cart/db/consts";

// other libraries
import PathFinder from "@/lib/PathFinder";
import stripe from "@/services/stripe";
import { nanoid } from "nanoid";
import { faker } from "@faker-js/faker";

export async function fetchClientSecret(): Promise<string> {
  // Extract the origin of the incoming request
  const origin = (await headers()).get("origin");

  // Get the ordered cart that the customer has already successfully checked out
  const orderedCart = await getOrderedCart();
  if (!orderedCart) throw new Error("The ordered cart is missing!");
  const { id: orderedCartId, cartItems } = orderedCart;

  // Extract the guest test customer id from the incoming request
  const referer = (await headers()).get("referer");
  const searchParams = new URL(referer ? referer : "").searchParams;
  const guestTestCustomerId = searchParams.get("guest_test_customer_id");

  // Retrieve all guest test customers but only their stripe customer id and email,
  // then pick a random one unless a guest test customer id is provided in the query params
  let customerId: string, stripeCustomerId: string, customerEmail: string;
  const customers = await allGuestTestCustomers();
  const guestTestCustomer = customers.find(({ id }) => id === guestTestCustomerId);
  if (guestTestCustomer) ({ id: customerId, stripeCustomerId, email: customerEmail } = guestTestCustomer);
  else ({ id: customerId, stripeCustomerId, email: customerEmail } = faker.helpers.arrayElement(customers));

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
