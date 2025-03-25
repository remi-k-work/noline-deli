// prisma and db access
import { Prisma } from "@prisma/client";
import { allGuestTestCustomersWithName } from "./orders";

// other libraries
import Stripe from "stripe";
import stripe from "@/services/stripe";
import PathFinder from "@/lib/PathFinder";

// consts and types
import type { AllGuestTestCustomersData, DerivedCartWithItems } from "./types";

// Get all the necessary data about all guest test customers
export async function allGuestTestCustomersData() {
  // Retrieve all guest test customers, including their names
  const customers = await allGuestTestCustomersWithName();

  const data: AllGuestTestCustomersData[] = [];
  for (const { id, stripeCustomerId, email, name } of customers) {
    const { phone, address } = (await stripe.customers.retrieve(stripeCustomerId)) as Stripe.Customer;
    const { country, city, line1, line2, postal_code, state } = address!;
    data.push({
      id,
      stripeCustomerId,
      email,
      name,
      phone: phone!,
      country: country!,
      city: city!,
      line1: line1!,
      line2: line2!,
      postal_code: postal_code!,
      state: state!,
    });
  }

  return data;
}

// Process the stripe payment intent by extracting and converting the relevant information
export function processPaymentIntent(paymentIntent: Stripe.PaymentIntent) {
  const { payment_method, latest_charge } = paymentIntent;

  if (!payment_method || typeof payment_method === "string") {
    throw new Error("The payment intent payment method is missing!");
  }

  if (!latest_charge || typeof latest_charge === "string") {
    throw new Error("The payment intent latest charge is missing!");
  }

  return { paymentMethod: payment_method, latestCharge: latest_charge, paymentMethodType: payment_method.type, receiptUrl: latest_charge.receipt_url };
}

// Process the stripe checkout session by extracting and converting the relevant information
export function processCheckoutSession(checkoutSession: Stripe.Checkout.Session) {
  const { id: checkoutSessionId, payment_intent, amount_subtotal, amount_total, total_details, shipping_cost, created, metadata } = checkoutSession;

  if (!payment_intent || typeof payment_intent === "string") {
    throw new Error("The checkout session payment intent is missing!");
  }

  // Explicitly check for null/undefined, treating '0' as a valid amount
  const { amount_shipping: shippingAmount, amount_tax: taxAmount } = total_details ?? {};
  if ((amount_subtotal ?? null) === null || (amount_total ?? null) === null || (shippingAmount ?? null) === null || (taxAmount ?? null) === null) {
    throw new Error("The checkout session total details are missing!");
  }

  const { shipping_rate: shippingRate } = shipping_cost ?? {};
  if (!shippingRate || typeof shippingRate === "string") {
    throw new Error("The checkout session shipping rate is missing!");
  }

  const { orderNumber, customerId, customerEmail, orderedCartId } = metadata ?? {};
  if (!orderNumber || !customerId || !customerEmail || !orderedCartId) {
    throw new Error("The checkout session metadata is missing!");
  }

  return {
    checkoutSessionId,
    paymentIntent: payment_intent,
    subTotal: amount_subtotal!,
    totalPaid: amount_total!,
    shippingCost: shippingAmount!,
    taxAmount: taxAmount!,
    shippingMethod: shippingRate.display_name!,
    created: new Date(created * 1000),
    orderNumber,
    customerId,
    customerEmail,
    orderedCartId,
  };
}

// Create ordered items from the cart items by including only the most significant information
export function createOrderedItemsFromCart(cartItems: DerivedCartWithItems["cartItems"]) {
  const orderedItems: Prisma.OrderedItemCreateManyOrderInput[] = [];

  for (const {
    productId,
    quantity,
    product: { name, description, imageUrl, price, brand, category, subCategory },
  } of cartItems) {
    orderedItems.push({
      productId,
      quantity,
      name,
      description,
      imageUrl,
      price,
      total: quantity * price,
      brandName: brand.name,
      brandLogo: brand.logoUrl,
      categoryName: category.name,
      subCategoryName: subCategory?.name,
    });
  }

  return orderedItems;
}

// Create line items from the cart items for the stripe checkout session
export function createLineItemsFromCart(cartItems: DerivedCartWithItems["cartItems"], origin: string | null) {
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  for (const {
    quantity,
    product: { name, description, imageUrl, price, moreImages },
  } of cartItems) {
    lineItems.push({
      quantity,
      price_data: {
        currency: "usd",
        product_data: {
          name,
          description,
          images: [
            PathFinder.toResolvedProductImageWithOrigin(imageUrl, origin),
            ...moreImages.map(({ imageUrl }) => PathFinder.toResolvedProductImageWithOrigin(imageUrl, origin)),
          ],
        },
        unit_amount: price,
      },
    });
  }

  return lineItems;
}
