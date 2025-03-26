// prisma and db access
import { OrderStatus } from "@prisma/client";
import prisma from "@/services/prisma";
import { SHIPPING_OPTIONS } from "@/features/cart/db/consts";

// other libraries
import { faker } from "@faker-js/faker";
import { nanoid } from "nanoid";
import { generateOrderedItemsFromProductIds, generateRandomCreatedAt, pickRandomGuestTestCustomer } from "./helpers";

export default async function seedOrder(numberOfOrders: number) {
  for (let i = 0; i < numberOfOrders; i++) {
    // Pick a random guest test customer
    const customerId = await pickRandomGuestTestCustomer();

    // Generate an array of ordered items from a bunch of random product ids as if they were thrown into the shopping cart
    const { orderedItems, totalQty, subTotal } = await generateOrderedItemsFromProductIds();

    // Pick a random shipping option for this order
    const shippingOption = faker.helpers.arrayElement(SHIPPING_OPTIONS);
    const shippingCost = shippingOption.shipping_rate_data.fixed_amount.amount;
    const shippingMethod = shippingOption.shipping_rate_data.display_name;

    const taxAmount = 0;
    const totalPaid = subTotal + taxAmount + shippingCost;

    // Place a new order for this customer
    await prisma.order.create({
      data: {
        customerId,
        checkoutSessionId: nanoid(),
        orderNumber: nanoid(),
        created: generateRandomCreatedAt(360),
        totalQty,
        subTotal,
        taxAmount,
        shippingCost,
        shippingMethod,
        totalPaid,

        // This is a test order that is not connected to a stripe checkout session
        isConnected: false,

        // Pick a random order status
        status: faker.helpers.arrayElement(Object.values(OrderStatus)),

        // Create ordered items from the cart items by including only the most significant information
        orderedItems: { createMany: { data: orderedItems } },
      },
    });
  }
}
