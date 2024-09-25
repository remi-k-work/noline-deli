// react
import { cache } from "react";

// prisma and db access
import prisma from "@/lib/db/prisma";

// other libraries
import { createTimeAxis, RangeOption } from "@/lib/rangeOptions";
import { OrdersByDay, OrdersByDayData } from "./types";
import { SELECT_ORDERS_BY_DAY } from "./consts";

const ordersByDay = cache(async (rangeOption?: RangeOption) => {
  const [totals, orders] = await Promise.all([
    // Gather both the total number of orders and the entire sales amount (totals)
    prisma.order.aggregate({ _count: true, _sum: { totalPaid: true }, _min: { created: true }, _max: { created: true } }),
    // Collect orders for a given time period or all of them (but only specific fields like order creation time and total paid amount)
    rangeOption
      ? prisma.order.findMany({ where: { created: { gte: rangeOption.startDate, lte: rangeOption.endDate } }, ...SELECT_ORDERS_BY_DAY })
      : prisma.order.findMany({ ...SELECT_ORDERS_BY_DAY }),
  ]);

  // Create a properly scaled time axis with the appropriate tick unit for a given time range
  const { timeAxis, isSame, format } = createTimeAxis(rangeOption, totals._min.created ?? undefined, totals._max.created ?? undefined);

  const ordersByDay: OrdersByDay[] = [];
  if (timeAxis) for (const timeTick of timeAxis) ordersByDay.push({ dayDate: timeTick, dayName: format(timeTick), orders: 0, sales: 0 });

  // Group retrieved orders by the day they were placed, then aggregate the number of orders and sales amount for that day
  const data: OrdersByDayData = { ordersByDay, orders: totals._count, sales: totals._sum.totalPaid ?? 0 };
  if (!timeAxis) return data;

  data.ordersByDay = orders.reduce((acc, order) => {
    // Does the orders-by-day entry already exist for this day? We compare only the dates, ignoring the time
    const existingEntry = acc.find((ordersByDay) => isSame(ordersByDay.dayDate, order.created));

    if (existingEntry) {
      // Yes, boost both the number of orders and the total sales for this day
      existingEntry.orders++;
      existingEntry.sales += order.totalPaid;
    }

    return acc;
  }, ordersByDay);

  return data;
});

export default ordersByDay;
