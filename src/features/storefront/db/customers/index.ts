// react
import { cache } from "react";

// prisma and db access
import prisma from "@/services/prisma";

// consts and types
import { RANGE_OPTIONS } from "@/lib/rangeOptions";
import { INCLUDE_ORDER_WITH_ITEMS } from "@/features/storefront/db/consts";
import type { BrowseBarData, OrderWithItems } from "@/features/storefront/db/types";

// Get all the information you need about this particular customer
export const getCustomer = cache((customerId: string) => {
  return prisma.customer.findUnique({ where: { id: customerId } });
});

// Gather all the necessary data for the browse bar to use
export const getBrowseBarData = cache(async (customerId: string) => {
  const data: BrowseBarData = { ordersByDate: [], ordersByShipping: [], ordersByStatus: [], ordersByBrand: [] };

  // Create data that will be used to display options for browsing orders by date
  for (const { label, startDate, endDate } of Object.values(RANGE_OPTIONS)) {
    data.ordersByDate.push({
      rangeLabel: label,
      startDate,
      endDate,
      orders: await prisma.order.count({ where: { created: { gte: startDate, lte: endDate }, customerId } }),
    });
  }

  // Create data that will be used to display options for browsing orders by shipping
  for (const { shippingMethod, _count } of await prisma.order.groupBy({
    by: "shippingMethod",
    _count: true,
    orderBy: { shippingMethod: "asc" },
    where: { customerId },
  })) {
    data.ordersByShipping.push({ shipping: shippingMethod, orders: _count });
  }

  // Create data that will be used to display options for browsing orders by status
  for (const { status, _count } of await prisma.order.groupBy({ by: "status", _count: true, orderBy: { status: "asc" }, where: { customerId } })) {
    data.ordersByStatus.push({ status, orders: _count });
  }

  // Create data that will be used to display options for browsing orders by brand
  for (const { brandName } of await prisma.orderedItem.findMany({
    distinct: "brandName",
    select: { brandName: true },
    orderBy: { brandName: "asc" },
    where: { order: { customerId } },
  })) {
    data.ordersByBrand.push({
      brandName,
      orders: (await prisma.orderedItem.findMany({ distinct: "orderId", where: { brandName, order: { customerId } }, select: { orderId: true } })).length,
    });
  }

  return data;
});

// Retrieve all orders that belong to this customer for the local in-memory representation used by the tanstack table
export const allOrdersForTableView = cache((customerId: string): Promise<OrderWithItems[]> => {
  return prisma.order.findMany({ where: { customer: { id: customerId } }, include: INCLUDE_ORDER_WITH_ITEMS });
});
