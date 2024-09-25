// prisma and db access
import { Prisma } from "@prisma/client";

export const SELECT_ORDERS_BY_DAY = { select: { created: true, totalPaid: true }, orderBy: { created: "asc" } } satisfies Prisma.OrderFindManyArgs;
export const SELECT_CUSTOMERS_BY_DAY = { select: { createdAt: true }, orderBy: { createdAt: "asc" } } satisfies Prisma.CustomerFindManyArgs;
