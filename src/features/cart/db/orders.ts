// react
import { cache } from "react";

// prisma and db access
import { Prisma } from "@prisma/client";
import prisma from "@/services/prisma";
import { getOrderedCart } from "./cart";

// other libraries
import Stripe from "stripe";

// Retrieve all guest customers but only their stripe customer id and email
export const allStripeGuestCustomers = cache(
  async () => await prisma.customer.findMany({ where: { isGuest: true }, select: { stripeCustomerId: true, email: true } }),
);

// Place a new order for either an existing or new customer
export function newOrder(paymentIntent: Stripe.PaymentIntent, latestCharge: Stripe.Charge) {
  // There are numerous updates that are interdependent; therefore, run them as a single transaction that will succeed or fail
  return prisma.$transaction(async (tx) => {
    const {
      id: paymentIntentId,
      amount,
      created,
      metadata: { orderNumber, customerEmail, orderedCartId, subTotal, taxAmount, shippingCost, shippingMethod },
    } = paymentIntent;

    // Get the ordered cart that the customer has already successfully checked out
    const orderedCart = await getOrderedCart(orderedCartId);
    if (!orderedCart) throw new Error("The ordered cart is missing!");
    const { cartItems, totalQty } = orderedCart;

    const customerFields = {
      email: customerEmail,
      // Use the customer's billing name if available; otherwise, use the shipping name
      name: latestCharge.billing_details.name ?? latestCharge.shipping?.name!,
      orders: {
        create: {
          paymentIntentId,
          orderNumber,
          created: new Date(created * 1000),
          totalQty,
          subTotal: Number(subTotal),
          taxAmount: Number(taxAmount),
          shippingCost: Number(shippingCost),
          shippingMethod,
          totalPaid: amount,
        },
      },
    };

    // First, place a new order for an existing customer (or a new customer)
    const {
      orders: [order],
    } = await tx.customer.upsert({
      where: { email: customerEmail },
      create: customerFields,
      update: customerFields,
      select: { orders: { where: { created: new Date(created * 1000) }, orderBy: { created: "desc" }, take: 1 } },
    });

    // Next, include the most significant information regarding ordered items
    const orderedItems: Prisma.OrderedItemCreateManyInput[] = [];
    for (const {
      productId,
      quantity,
      product: { name, description, imageUrl, price, brand, category, subCategory },
    } of cartItems) {
      orderedItems.push({
        orderId: order.id,
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

    // Finally, connect all of the ordered items to the newly placed order
    return await tx.orderedItem.createMany({ data: orderedItems });
  });
}
