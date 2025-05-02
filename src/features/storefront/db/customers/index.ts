// react
import { cache } from "react";

// prisma and db access
import prisma from "@/services/prisma";
import { processCheckoutSession } from "@/features/cart/db/helpers";

// other libraries
import Stripe from "stripe";
import stripe from "@/services/stripe";
import { faker } from "@faker-js/faker";

// consts and types
import { RANGE_OPTIONS } from "@/lib/rangeOptions";
import { INCLUDE_ORDER_WITH_ITEMS } from "@/features/storefront/db/consts";
import type { BrowseBarData, OrderWithItems } from "@/features/storefront/db/types";

// Cancel the order for this customer
export function cancelOrderForCustomer(orderId: string, customerId: string, checkoutSessionId: string, isConnected: boolean) {
  return prisma.$transaction(async (tx) => {
    // First, change the status of the order to cancelled (this will also change the status of the ordered items to cancelled)
    await tx.order.update({
      where: { id: orderId, customerId },
      data: { status: "CANCELLED", orderedItems: { updateMany: { where: { orderId }, data: { status: "CANCELLED" } } } },
    });

    // Is this a test order that is not connected to a stripe checkout session? If so, just consider it cancelled and return
    if (!isConnected) return;

    // Retrieve the checkout session in our preferred method to ensure that all relevant info is expanded upon
    const checkoutSession = await stripe.checkout.sessions.retrieve(checkoutSessionId, {
      expand: ["payment_intent.payment_method", "payment_intent.latest_charge", "shipping_cost.shipping_rate"],
    });

    // Process the stripe checkout session by extracting and converting the relevant information
    const { paymentIntent } = processCheckoutSession(checkoutSession);

    // Since this is a real order, then we need to issue a refund to the customer
    await stripe.refunds.create({ payment_intent: paymentIntent.id, reason: "requested_by_customer" });
  });
}

// Get all the information you need about this particular customer (either a real or test customer)
export const getCustomer = cache((customerIdFromParams: string, customerIdFromSession?: string) => {
  // If the customer id from the session is available, use it instead of the one from the params, which by definition is a real customer
  if (customerIdFromSession) return prisma.customer.findUnique({ where: { id: customerIdFromSession, isTest: false } });

  // Otherwise, use the one from the params, which by definition is a test customer
  return prisma.customer.findUnique({ where: { id: customerIdFromParams, isTest: true } });
});

// Get all the necessary data about this particular customer (either a real or test customer)
export const getCustomerData = cache(async (customerIdFromParams: string, customerIdFromSession?: string) => {
  // If the customer id from the session is available, use it instead of the one from the params, which by definition is a real customer
  const customer = await getCustomer(customerIdFromParams, customerIdFromSession);
  if (!customer) return;

  const { id, stripeCustomerId, email, name } = customer;
  const { phone, address } = ((await stripe.customers.retrieve(stripeCustomerId)) as Stripe.Customer) ?? {};
  const { country, city, line1, line2, postal_code, state } = address ?? {};

  return {
    id,
    stripeCustomerId,
    email,
    name,

    // If the customer's address cannot be acquired from stripe, we will generate a random one (this will only happen for test customers)
    phone: phone ?? (customerIdFromSession ? "" : faker.phone.number({ style: "national" })),
    country: country ?? (customerIdFromSession ? "" : faker.location.countryCode()),
    city: city ?? (customerIdFromSession ? "" : faker.location.city()),
    line1: line1 ?? (customerIdFromSession ? "" : faker.location.streetAddress()),
    line2: line2 ?? (customerIdFromSession ? "" : faker.location.secondaryAddress()),
    postal_code: postal_code ?? (customerIdFromSession ? "" : faker.location.zipCode()),
    state: state ?? (customerIdFromSession ? "" : faker.location.state()),
  };
});

// Gather all the necessary data for the browse bar to use
export const getBrowseBarData = cache(async (customerId: string) => {
  const data: BrowseBarData = { ordersByDate: [], ordersByShipping: [], ordersByStatus: [], ordersByBrand: [] };

  // Create data that will be used to display options for browsing orders by date
  for (const { label, startDate, endDate } of Object.values(RANGE_OPTIONS)) {
    data.ordersByDate.push({
      rangeLabel: label,
      startDate,
      endDate,
      orders: await prisma.order.count({ where: { created: { gte: startDate, lte: endDate }, customerId } }),
    });
  }

  // Create data that will be used to display options for browsing orders by shipping
  for (const { shippingMethod, _count } of await prisma.order.groupBy({
    by: "shippingMethod",
    _count: true,
    orderBy: { shippingMethod: "asc" },
    where: { customerId },
  })) {
    data.ordersByShipping.push({ shipping: shippingMethod, orders: _count });
  }

  // Create data that will be used to display options for browsing orders by status
  for (const { status, _count } of await prisma.order.groupBy({ by: "status", _count: true, orderBy: { status: "asc" }, where: { customerId } })) {
    data.ordersByStatus.push({ status, orders: _count });
  }

  // Create data that will be used to display options for browsing orders by brand
  for (const { brandName } of await prisma.orderedItem.findMany({
    distinct: "brandName",
    select: { brandName: true },
    orderBy: { brandName: "asc" },
    where: { order: { customerId } },
  })) {
    data.ordersByBrand.push({
      brandName,
      orders: (await prisma.orderedItem.findMany({ distinct: "orderId", where: { brandName, order: { customerId } }, select: { orderId: true } })).length,
    });
  }

  return data;
});

// Retrieve all orders that belong to this customer for the local in-memory representation used by the tanstack table
export const allOrdersForTableView = cache((customerId: string): Promise<OrderWithItems[]> => {
  return prisma.order.findMany({ where: { customer: { id: customerId } }, include: INCLUDE_ORDER_WITH_ITEMS, orderBy: { created: "desc" } });
});
