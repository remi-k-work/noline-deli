"use server";

// next
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// prisma and db access
import { cancelOrderForCustomer } from "@/features/storefront/db/customers";
import { OrderStatus } from "@prisma/client";

// other libraries
import { z } from "zod";
import { actionClient } from "@/lib/safeAction";
import PathFinder from "@/lib/PathFinder";
import { type FormActionResult, objectIdSchema } from "@/features/manager/formActionTypes";
import stripe from "@/services/stripe";

// types
export type OrderActionResult = FormActionResult;

// Allow the customer to manage their billing or invoicing by creating a new portal session
export async function createCustomerPortal(customerId: string, stripeCustomerId: string): Promise<void> {
  // Extract the origin of the incoming request
  const origin = (await headers()).get("origin");

  // Create a customer portal session for this customer, and redirect them to it
  const { url } = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: PathFinder.toSfCustomerAccountWithOrigin(customerId, origin),
  });

  redirect(url);
}

export const cancelOrder = actionClient
  .schema(
    z.object({
      orderId: objectIdSchema,
      customerId: objectIdSchema,
      checkoutSessionId: z.string().trim(),
      isConnected: z.boolean(),
      status: z.nativeEnum(OrderStatus),
    }),
  )
  .action(async ({ parsedInput: { orderId, customerId, checkoutSessionId, isConnected, status } }): Promise<OrderActionResult> => {
    try {
      // Only just ordered orders can be cancelled
      if (status !== "JUST_ORDERED") return { actionStatus: "failed" };

      // Cancel the order for this customer
      await cancelOrderForCustomer(orderId, customerId, checkoutSessionId, isConnected);
    } catch (error) {
      // If any error occurs, rethrow, which means action simply "failed"
      throw error;
    }

    // Revalidate, so the fresh data will be fetched from the server next time this path is visited
    revalidatePath(PathFinder.toSfCustomerAccountReval(), "page");

    // Return the new action state so that we can provide feedback to the user
    return { actionStatus: "succeeded" };
  });
