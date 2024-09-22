// react
import { cache } from "react";

// prisma and db access
import { Prisma } from "@prisma/client";
import prisma from "@/lib/db/prisma";
import { countAdminApprovedProducts, getCreatedByUser, whereAdminApproved, whereCreatedByYou } from "@/features/manager/auth/db";

// other libraries
import { RangeOption } from "@/lib/rangeOptions";
import { isSameDay, startOfDay } from "date-fns";

// types
interface TotalNumbers {
  totCategory: string;
  itemsAdmin: number;
  itemsUser: number;
}

export interface TotalNumbersData {
  totalNumbers: TotalNumbers[];
}

interface ProductsPerBrand {
  brand: string;
  products: number;
}

export interface ProductsPerBrandData {
  productsPerBrand: ProductsPerBrand[];
}

interface Category {
  id: string;
  name: string;
}

interface ProductsPerCategory {
  category: string;
  mCatProd?: number;
  sCatProd?: number;
}

export interface ProductsPerCategoryData {
  categories: Category[];
  productsPerCategory: ProductsPerCategory[];
}

interface OrdersByDay {
  dayDate: Date;
  dayName: string;
  orders: number;
  sales: number;
}

export interface OrdersByDayData {
  ordersByDay: OrdersByDay[];
  orders: number;
  sales: number;
}

interface RevenueByItem {
  itemName: string;
  quantity: number;
  total: number;
}

export interface RevenueByItemData {
  revenueByItem: RevenueByItem[];
  quantity: number;
  total: number;
}

const SELECT_ORDERS_BY_DAY = { select: { created: true, totalPaid: true }, orderBy: { created: "asc" } } satisfies Prisma.OrderFindManyArgs;

export const revenueByItem = cache(async (rangeOption?: RangeOption) => {
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

export const ordersByDay = cache(async (rangeOption?: RangeOption) => {
  const [totals, orders] = await Promise.all([
    // Gather both the total number of orders and the entire sales amount (totals)
    prisma.order.aggregate({ _count: true, _sum: { totalPaid: true } }),
    // Collect orders for a given time period or all of them (but only specific fields like order creation time and total paid amount)
    rangeOption
      ? prisma.order.findMany({ where: { created: { gte: rangeOption.startDate, lte: rangeOption.endDate } }, ...SELECT_ORDERS_BY_DAY })
      : prisma.order.findMany({ ...SELECT_ORDERS_BY_DAY }),
  ]);

  // Group retrieved orders by the day they were placed, then aggregate the number of orders and sales amount for that day
  const data: OrdersByDayData = { ordersByDay: [], orders: totals._count, sales: totals._sum.totalPaid ?? 0 };
  data.ordersByDay = orders.reduce((acc, order) => {
    // Does the orders-by-day entry already exist for this day? We compare only the dates, ignoring the time
    const existingEntry = acc.find((ordersByDay) => isSameDay(ordersByDay.dayDate, order.created));

    if (existingEntry) {
      // Yes, boost both the number of orders and the total sales for this day
      existingEntry.orders++;
      existingEntry.sales += order.totalPaid;
    } else {
      // No, create a new orders-by-day entry
      acc.push({
        // We just care about the day the order was placed
        dayDate: startOfDay(order.created),
        dayName: startOfDay(order.created).toDateString(),
        orders: 1,
        sales: order.totalPaid,
      });
    }

    return acc;
  }, [] as OrdersByDay[]);

  return data;
});

// Collect all relevant totals (such as the total number of products and brands)
export const totalNumbers = cache(async () => {
  // We will also collect just the content created by you, the user
  const createdByUser = getCreatedByUser();

  const [totPrAdmin, totPrYou, totBrAdmin, totBrYou, totCaAdmin, totCaYou, totSuAdmin, totSuYou, totImAdmin, totImYou] = await Promise.all([
    prisma.product.count({ where: { ...whereAdminApproved<Prisma.ProductWhereInput>() } }),
    createdByUser ? prisma.product.count({ where: { ...whereCreatedByYou<Prisma.ProductWhereInput>() } }) : 0,
    prisma.brand.count({ where: { ...whereAdminApproved<Prisma.BrandWhereInput>() } }),
    createdByUser ? prisma.brand.count({ where: { ...whereCreatedByYou<Prisma.BrandWhereInput>() } }) : 0,
    prisma.category.count({ where: { ...whereAdminApproved<Prisma.CategoryWhereInput>() } }),
    createdByUser ? prisma.category.count({ where: { ...whereCreatedByYou<Prisma.CategoryWhereInput>() } }) : 0,
    prisma.subCategory.count({ where: { ...whereAdminApproved<Prisma.SubCategoryWhereInput>() } }),
    createdByUser ? prisma.subCategory.count({ where: { ...whereCreatedByYou<Prisma.SubCategoryWhereInput>() } }) : 0,
    prisma.productImage.count({ where: { ...whereAdminApproved<Prisma.ProductImageWhereInput>() } }),
    createdByUser ? prisma.productImage.count({ where: { ...whereCreatedByYou<Prisma.ProductImageWhereInput>() } }) : 0,
  ]);

  const data: TotalNumbersData = {
    totalNumbers: [
      { totCategory: "Pr", itemsAdmin: totPrAdmin, itemsUser: totPrYou },
      { totCategory: "Br", itemsAdmin: totBrAdmin, itemsUser: totBrYou },
      { totCategory: "Ca", itemsAdmin: totCaAdmin, itemsUser: totCaYou },
      { totCategory: "Su", itemsAdmin: totSuAdmin, itemsUser: totSuYou },
      { totCategory: "Im", itemsAdmin: totImAdmin + totPrAdmin, itemsUser: totImYou + totPrYou },
    ],
  };

  return data;
});

export const productsPerBrand = cache(async () => {
  const brands = await prisma.brand.findMany({
    where: { ...whereAdminApproved<Prisma.BrandWhereInput>() },
    select: { name: true, ...countAdminApprovedProducts<Prisma.BrandSelect>("OtM") },
  });

  const data: ProductsPerBrandData = { productsPerBrand: brands.map(({ name, _count: { products } }) => ({ brand: name, products: products })) };

  return data;
});

const allCategories = cache(() => {
  return prisma.category.findMany({
    where: { ...whereAdminApproved<Prisma.CategoryWhereInput>() },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });
});

const getCategory = cache((categoryId: string) => {
  return prisma.category.findUnique({
    where: { ...whereAdminApproved<Prisma.CategoryWhereUniqueInput>(), id: categoryId },
    select: {
      name: true,
      ...countAdminApprovedProducts<Prisma.CategorySelect>("MtM"),
      subCategories: {
        where: { ...whereAdminApproved<Prisma.SubCategoryWhereInput>() },
        select: { name: true, ...countAdminApprovedProducts<Prisma.SubCategorySelect>("MtM") },
        orderBy: { name: "asc" },
      },
    },
  });
});

export const productsPerCategory = cache(async (categoryId?: string) => {
  let categories: Awaited<ReturnType<typeof allCategories>>, category: Awaited<ReturnType<typeof getCategory>> | undefined;

  if (categoryId) {
    [categories, category] = await Promise.all([allCategories(), getCategory(categoryId)]);
  } else {
    // No category id was supplied; default to the first category id, but only if any categories are available
    categories = await allCategories();
    if (categories.length > 0) category = await getCategory(categories[0].id);
  }

  const data: ProductsPerCategoryData = { categories, productsPerCategory: [] };
  if (!category) return data;

  const {
    name,
    _count: { products },
    subCategories,
  } = category;
  data.productsPerCategory.push({ category: name, mCatProd: products });

  let subCategoryIndex = 0;
  for (const {
    name,
    _count: { products },
  } of subCategories) {
    data.productsPerCategory.push({ category: name, sCatProd: products });
    subCategoryIndex++;
  }

  return data;
});
