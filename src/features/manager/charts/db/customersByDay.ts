// react
import { cache } from "react";

// prisma and db access
import prisma from "@/services/prisma";

// other libraries
import { createTimeAxis, RangeOption } from "@/lib/rangeOptions";
import type { CustomersByDay, CustomersByDayData } from "./types";
import { SELECT_CUSTOMERS_BY_DAY } from "./consts";
import { convertLocalDateToUTCIgnoringTimezone } from "@/lib/formatters";

const customersByDay = cache(async (rangeOption?: RangeOption) => {
  const [totals, customers] = await Promise.all([
    // Gather the total number of customers
    prisma.customer.aggregate({ _count: true, _min: { createdAt: true }, _max: { createdAt: true } }),
    // Collect customers for a given time period or all of them (but only specific fields like customer creation time)
    rangeOption
      ? prisma.customer.findMany({ where: { createdAt: { gte: rangeOption.startDate, lte: rangeOption.endDate } }, ...SELECT_CUSTOMERS_BY_DAY })
      : prisma.customer.findMany({ ...SELECT_CUSTOMERS_BY_DAY }),
  ]);

  // Create a properly scaled time axis with the appropriate tick unit for a given time range
  const { timeAxis, isSame, format } = createTimeAxis(rangeOption, totals._min.createdAt ?? undefined, totals._max.createdAt ?? undefined);

  const customersByDay: CustomersByDay[] = [];
  if (timeAxis) for (const timeTick of timeAxis) customersByDay.push({ dayDate: timeTick, dayName: format(timeTick), customers: 0 });

  // Group retrieved customers by the day they were created, then aggregate the number of customers for that day
  const data: CustomersByDayData = {
    customersByDay,
    customers: totals._count,
    startDate: totals._min.createdAt ?? convertLocalDateToUTCIgnoringTimezone(new Date()),
    endDate: totals._max.createdAt ?? convertLocalDateToUTCIgnoringTimezone(new Date()),
  };
  if (!timeAxis) return data;

  data.customersByDay = customers.reduce((acc, customer) => {
    // Does the customers-by-day entry already exist for this day? We compare only the dates, ignoring the time
    const existingEntry = acc.find((customersByDay) => isSame(customersByDay.dayDate, customer.createdAt));

    if (existingEntry) {
      // Yes, boost the number of customers for this day
      existingEntry.customers++;
    }

    return acc;
  }, customersByDay);

  return data;
});

export default customersByDay;
