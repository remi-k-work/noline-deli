"use server";

// other libraries
import { z } from "zod";
import { actionClient } from "@/lib/safeAction";
import stripe from "@/services/stripe";
import { nanoid } from "nanoid";
import { emailSchema, objectIdSchema, priceSchema } from "@/features/manager/formActionTypes";

// types
interface PaymentIntentActionResult {
  clientSecret: string | null;
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
