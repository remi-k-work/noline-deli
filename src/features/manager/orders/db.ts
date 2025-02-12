// react
import { cache } from "react";

// prisma and db access
import type { OrderedItemStatus, OrderStatus, Prisma } from "@prisma/client";
import prisma from "@/services/prisma";

// other libraries
import { RANGE_OPTIONS } from "@/lib/rangeOptions";

// types
export type OrderWithItems = Prisma.OrderGetPayload<{ include: typeof INCLUDE_ORDER_WITH_ITEMS }>;

interface OrdersByDate {
  rangeLabel: string;
  startDate: Date;
  endDate: Date;
  orders: number;
}

interface OrdersByCustomer {
  email: string;
  name: string;
  orders: number;
}

interface OrdersByShipping {
  shipping: string;
  orders: number;
}

interface OrdersByStatus {
  status: string;
  orders: number;
}

interface OrdersByBrand {
  brandName: string;
  orders: number;
}

export interface BrowseBarData {
  ordersByDate: OrdersByDate[];
  ordersByCustomer: OrdersByCustomer[];
  ordersByShipping: OrdersByShipping[];
  ordersByStatus: OrdersByStatus[];
  ordersByBrand: OrdersByBrand[];
}

const INCLUDE_ORDER_WITH_ITEMS = {
  orderedItems: true,
  customer: true,
} satisfies Prisma.OrderInclude;

// Gather all the necessary data for the browse bar to use
export const getBrowseBarData = cache(async () => {
  const data: BrowseBarData = { ordersByDate: [], ordersByCustomer: [], ordersByShipping: [], ordersByStatus: [], ordersByBrand: [] };

  // Create data that will be used to display options for browsing orders by date
  for (const { label, startDate, endDate } of Object.values(RANGE_OPTIONS)) {
    data.ordersByDate.push({
      rangeLabel: label,
      startDate,
      endDate,
      orders: await prisma.order.count({ where: { created: { gte: startDate, lte: endDate } } }),
    });
  }

  // Create data that will be used to display options for browsing orders by customer
  for (const {
    email,
    name,
    _count: { orders },
  } of await prisma.customer.findMany({ select: { email: true, name: true, _count: { select: { orders: true } } } })) {
    data.ordersByCustomer.push({ email, name, orders });
  }

  // Create data that will be used to display options for browsing orders by shipping
  for (const { shippingMethod, _count } of await prisma.order.groupBy({ by: "shippingMethod", _count: true, orderBy: { shippingMethod: "asc" } })) {
    data.ordersByShipping.push({ shipping: shippingMethod, orders: _count });
  }

  // Create data that will be used to display options for browsing orders by status
  for (const { status, _count } of await prisma.order.groupBy({ by: "status", _count: true, orderBy: { status: "asc" } })) {
    data.ordersByStatus.push({ status, orders: _count });
  }

  // Create data that will be used to display options for browsing orders by brand
  for (const { brandName } of await prisma.orderedItem.findMany({ distinct: "brandName", select: { brandName: true }, orderBy: { brandName: "asc" } })) {
    data.ordersByBrand.push({
      brandName,
      orders: (await prisma.orderedItem.findMany({ distinct: "orderId", where: { brandName }, select: { orderId: true } })).length,
    });
  }

  return data;
});

// Retrieve all orders for the local in-memory representation used by the tanstack table
export function allOrdersForTableView() {
  return prisma.order.findMany({ include: INCLUDE_ORDER_WITH_ITEMS });
}

// Get all the information you need about this particular order
export const getOrder = cache((orderId: string) => {
  return prisma.order.findUnique({ where: { id: orderId }, include: INCLUDE_ORDER_WITH_ITEMS });
});

// Change the status of this order
export function changeOrderStatus(orderId: string, newStatus: OrderStatus) {
  return prisma.order.update({ where: { id: orderId }, data: { status: newStatus } });
}

// Change the status of this ordered item
export function changeOrderedItemStatus(orderedItemId: string, newStatus: OrderedItemStatus) {
  return prisma.orderedItem.update({ where: { id: orderedItemId }, data: { status: newStatus } });
}
