// prisma and db access
import type { Brand, Prisma } from "@prisma/client";

// other libraries
import { INCLUDE_ORDER_WITH_ITEMS, INCLUDE_PRODUCT_WITH_ALL } from "./consts";
import type { getCustomerData } from "./customers";

// types
export type ProductWithAll = Prisma.ProductGetPayload<{ include: typeof INCLUDE_PRODUCT_WITH_ALL }>;
export type OrderWithItems = Prisma.OrderGetPayload<{ include: typeof INCLUDE_ORDER_WITH_ITEMS }>;
export type CustomerData = Awaited<ReturnType<typeof getCustomerData>>;

interface CategoriesTreeView {
  label: string;
  href: string;
  subCategories?: CategoriesTreeView[];
}

export interface CategoriesTreeViewData {
  categoriesTreeView: CategoriesTreeView[];
}

export interface DashboardData {
  featuredProducts: ProductWithAll[];
  featuredBrands: Brand[];
  totalProducts: number;
  totalBrands: number;
}

export interface ProductFilterData {
  byBrandList: Brand[];
  byPriceBelowMin: number;
  byPriceBelowMax: number;
}

interface OrdersByDate {
  rangeLabel: string;
  startDate: Date;
  endDate: Date;
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
  ordersByShipping: OrdersByShipping[];
  ordersByStatus: OrdersByStatus[];
  ordersByBrand: OrdersByBrand[];
}
