"use server";

// next
import { revalidatePath } from "next/cache";

// prisma and db access
import { cancelOrderForCustomer } from "@/features/storefront/db/customers";
import { OrderStatus } from "@prisma/client";

// other libraries
import { z } from "zod";
import { actionClient } from "@/lib/safeAction";
import PathFinder from "@/lib/PathFinder";
import { type FormActionResult, objectIdSchema } from "@/features/manager/formActionTypes";

// types
export type OrderActionResult = FormActionResult;

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
