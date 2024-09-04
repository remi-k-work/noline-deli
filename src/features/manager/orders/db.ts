// prisma and db access
import { Prisma } from "@prisma/client";
import prisma from "@/lib/db/prisma";

// types
export type OrderWithInfo = Prisma.OrderGetPayload<{ include: typeof INCLUDE_ORDER_WITH_INFO }>;

const INCLUDE_ORDER_WITH_INFO = {
  orderedItems: true,
  customer: true,
  _count: { select: { orderedItems: true } },
} satisfies Prisma.OrderInclude;

// Retrieve all orders for the local in-memory representation used by the tanstack table
export function allOrdersForTableView() {
  return prisma.order.findMany({ include: INCLUDE_ORDER_WITH_INFO });
}
