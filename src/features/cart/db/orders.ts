// react
import { cache } from "react";

// prisma and db access
import prisma from "@/services/prisma";
import { createOrderedItemsFromCart, processCheckoutSession } from "./helpers";
import { getOrderedCart } from "./cart";

// other libraries
import Stripe from "stripe";

// Retrieve all guest test customers but only their stripe customer id and email
export const allGuestTestCustomers = cache(
  async () => await prisma.customer.findMany({ where: { isGuest: true, isTest: true }, select: { id: true, stripeCustomerId: true, email: true } }),
);

// Retrieve all guest test customers, including their names
export const allGuestTestCustomersWithName = cache(
  async () => await prisma.customer.findMany({ where: { isGuest: true, isTest: true }, select: { id: true, stripeCustomerId: true, email: true, name: true } }),
);

// Place a new order for either an existing or new customer
export async function newOrder(checkoutSession: Stripe.Checkout.Session) {
  // Process the stripe checkout session by extracting and converting the relevant information
  const { checkoutSessionId, subTotal, totalPaid, shippingCost, taxAmount, shippingMethod, created, orderNumber, customerId, orderedCartId } =
    processCheckoutSession(checkoutSession);

  // Get the ordered cart that the customer has already successfully checked out
  const orderedCart = await getOrderedCart(orderedCartId);
  if (!orderedCart) throw new Error("The ordered cart is missing!");
  const { cartItems, totalQty } = orderedCart;

  // Place a new order for this customer
  await prisma.order.create({
    data: {
      customerId,
      checkoutSessionId,
      orderNumber,
      created,
      totalQty,
      subTotal,
      taxAmount,
      shippingCost,
      shippingMethod,
      totalPaid,

      // Create ordered items from the cart items by including only the most significant information
      orderedItems: { createMany: { data: createOrderedItemsFromCart(cartItems) } },
    },
  });
}
