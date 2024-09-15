"use server";

// next
import { revalidatePath } from "next/cache";

// prisma and db access
import { changeOrderedItemStatus, changeOrderStatus } from "./db";
import { OrderedItemStatus, OrderStatus } from "@prisma/client";

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

export const chgOrderedItemStatus = actionClient
  .schema(z.object({ orderedItemId: objectIdSchema, newStatus: z.nativeEnum(OrderedItemStatus) }))
  .action(async ({ parsedInput: { orderedItemId, newStatus } }) => {
    try {
      // Change the status of this ordered item
      await changeOrderedItemStatus(orderedItemId, newStatus);
    } catch (error) {
      // If a database error occurs, rethrow, which means action simply "failed"
      throw error;
    }

    // Revalidate, so the fresh data will be fetched from the server next time this path is visited
    revalidatePath("/");
    revalidatePath(PathFinder.toOrderViewReval(), "page");
  });
