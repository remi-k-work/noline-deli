// prisma and db access
import type { Brand, Prisma } from "@prisma/client";

// other libraries
import { INCLUDE_PRODUCT_WITH_ALL } from "./consts";

// types
export type ProductWithAll = Prisma.ProductGetPayload<{ include: typeof INCLUDE_PRODUCT_WITH_ALL }>;

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
