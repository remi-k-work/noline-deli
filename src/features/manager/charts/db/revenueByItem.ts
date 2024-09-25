// react
import { cache } from "react";

// prisma and db access
import prisma from "@/lib/db/prisma";

// other libraries
import { RangeOption } from "@/lib/rangeOptions";
import { RevenueByItemData } from "./types";

const revenueByItem = cache(async (rangeOption?: RangeOption) => {
  const [totals, items] = await Promise.all([
    // Gather both the total quantity of ordered items and the entire total amount (totals)
    prisma.orderedItem.aggregate({ _sum: { quantity: true, total: true } }),
    // Collect ordered items for a given time period or all of them, group them by name, and aggregate their quantities and total amounts
    rangeOption
      ? prisma.orderedItem.groupBy({
          where: { order: { created: { gte: rangeOption.startDate, lte: rangeOption.endDate } } },
          by: "name",
          _sum: { quantity: true, total: true },
          orderBy: { name: "asc" },
        })
      : prisma.orderedItem.groupBy({ by: "name", _sum: { quantity: true, total: true }, orderBy: { name: "asc" } }),
  ]);

  const data: RevenueByItemData = { revenueByItem: [], quantity: totals._sum.quantity ?? 0, total: totals._sum.total ?? 0 };
  for (const {
    name,
    _sum: { quantity, total },
  } of items) {
    data.revenueByItem.push({ itemName: name, quantity: quantity ?? 0, total: total ?? 0 });
  }

  return data;
});

export default revenueByItem;
