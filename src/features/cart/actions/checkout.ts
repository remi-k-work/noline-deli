"use server";

// next
import { headers } from "next/headers";

// prisma and db access
import { Prisma } from "@prisma/client";
import prisma from "@/services/prisma";
import { getOrderedCart } from "@/features/cart/db/cart";
import { allStripeGuestCustomers } from "@/features/cart/db/orders";

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

export const getClientSessionSecret = actionClient
  .schema(z.object({ orderedCartId: objectIdSchema }))
  .action(async ({ parsedInput: { orderedCartId } }): Promise<void> => {
    try {
      // Extract the origin of the incoming request
      const origin = (await headers()).get("origin");

      // Get the ordered cart that the customer has already successfully checked out
      const orderedCart = await getOrderedCart(orderedCartId);
      if (!orderedCart) throw new Error("The ordered cart is missing!");

      // Retrieve all guest customers but only their stripe customer id and email, then pick a random one
      const { stripeCustomerId, email } = faker.helpers.arrayElement(await allStripeGuestCustomers());

      // Create a new checkout session for this customer
      const checkoutSession = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        ui_mode: "embedded",
        mode: "payment",
        return_url: `${origin}/cart/order/complete?session_id={CHECKOUT_SESSION_ID}`,
        customer_email: email,
        payment_intent_data: {
          metadata: {
            customerEmail: email,
            orderedCartId,
            subTotal: orderedCart.subTotal,
            taxAmount: orderedCart.taxAmount,
          },
        },
        metadata: { customerEmail: email, orderedCartId, subTotal: orderedCart.subTotal, taxAmount: orderedCart.taxAmount },
        line_items: [],
      });
      return;
    } catch (error) {
      // If any error occurs, rethrow, which means action simply "failed"
      throw error;
    }
  });
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
