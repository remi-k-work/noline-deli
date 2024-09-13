"use server";

// next
import { revalidatePath } from "next/cache";

// prisma and db access
import { changeOrderStatus } from "./db";
import { OrderStatus } from "@prisma/client";

// other libraries
import { z } from "zod";
import { actionClient } from "@/lib/safeAction";
import PathFinder from "../PathFinder";
import { objectIdSchema } from "../formActionTypes";

export const chgOrderStatus = actionClient
  .schema(z.object({ orderId: objectIdSchema, newStatus: z.nativeEnum(OrderStatus) }))
  .action(async ({ parsedInput: { orderId, newStatus } }) => {
    try {
      // Change the status of this order
      await changeOrderStatus(orderId, newStatus);
    } catch (error) {
      // If a database error occurs, rethrow, which means action simply "failed"
      throw error;
    }

    // Revalidate, so the fresh data will be fetched from the server next time this path is visited
    revalidatePath("/");
    revalidatePath(PathFinder.toAllOrders());
  });
