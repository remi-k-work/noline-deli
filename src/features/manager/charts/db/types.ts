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

export interface OrdersByDay {
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

export interface CustomersByDay {
  dayDate: Date;
  dayName: string;
  customers: number;
}

export interface CustomersByDayData {
  customersByDay: CustomersByDay[];
  customers: number;
}
