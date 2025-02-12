"use client";

// component css styles
import styles from "./ProductsList.module.css";

// prisma and db access
import { Product } from "@prisma/client";

// other libraries
import { cn } from "@/lib/utils";
import useSearchParamsState from "@/hooks/useSearchParamsState";

// components
import ProductCard, { ProductCardSkeleton } from "./ProductCard";

// assets
import { QueueListIcon, TableCellsIcon, ArrowsUpDownIcon } from "@heroicons/react/24/solid";

// types
interface ProductsListProps {
  totalProducts: number;
  products: Product[];
}

interface ProductsListSkeletonProps {
  isListMode: boolean;
  sortBy: string;
}

export default function ProductsList({ totalProducts, products }: ProductsListProps) {
  const { isListMode, sortBy, productsListChanged } = useSearchParamsState();

  return (
    <section className={styles["products-list"]}>
      <header className="mb-4 flex w-full flex-wrap items-center justify-end gap-4">
        <label className="flex flex-none cursor-pointer items-center gap-2">
          <TableCellsIcon width={24} height={24} />
          <input
            type="checkbox"
            name="viewMode"
            className="toggle"
            defaultChecked={isListMode}
            onChange={(ev) => productsListChanged(undefined, undefined, ev.target.checked)}
          />
          <QueueListIcon width={24} height={24} />
        </label>
        <span className="flex-1 text-end lg:divider lg:divider-start">{totalProducts} Product(s) Found</span>
        <span className="flex flex-none items-center">
          <ArrowsUpDownIcon width={24} height={24} />
          <select
            name="sortBy"
            className="select"
            defaultValue={sortBy}
            onChange={(ev) => productsListChanged(ev.target.value.split("|")[0] as "id" | "price" | "name", ev.target.value.split("|")[1] as "asc" | "desc")}
          >
            <option value={"id|desc"}>Date (Newest)</option>
            <option value={"id|asc"}>Date (Oldest)</option>
            <option value={"price|asc"}>Price (Lowest)</option>
            <option value={"price|desc"}>Price (Highest)</option>
            <option value={"name|asc"}>Name (A to Z)</option>
            <option value={"name|desc"}>Name (Z to A)</option>
          </select>
        </span>
      </header>
      <section className={cn(styles["products-list__items"], isListMode && styles["products-list__items--list-mode"])}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} listMode={isListMode} />
        ))}
      </section>
    </section>
  );
}

export function ProductsListSkeleton({ isListMode, sortBy }: ProductsListSkeletonProps) {
  return (
    <section className={styles["products-list-skeleton"]}>
      <header className="mb-4 flex w-full flex-wrap items-center justify-end gap-4">
        <label className="flex flex-none cursor-pointer items-center gap-2">
          <TableCellsIcon width={24} height={24} />
          <input type="checkbox" name="viewMode" className="toggle" defaultChecked={isListMode} disabled={true} />
          <QueueListIcon width={24} height={24} />
        </label>
        <span className="flex-1 text-end lg:divider lg:divider-start">... Product(s) Found</span>
        <span className="flex flex-none items-center">
          <ArrowsUpDownIcon width={24} height={24} />
          <select name="sortBy" className="select" defaultValue={sortBy} disabled={true}>
            <option value={"id|desc"}>Date (Newest)</option>
            <option value={"id|asc"}>Date (Oldest)</option>
            <option value={"price|asc"}>Price (Lowest)</option>
            <option value={"price|desc"}>Price (Highest)</option>
            <option value={"name|asc"}>Name (A to Z)</option>
            <option value={"name|desc"}>Name (Z to A)</option>
          </select>
        </span>
      </header>
      <section className={cn(styles["products-list-skeleton__items"], isListMode && styles["products-list-skeleton__items--list-mode"])}>
        <ProductCardSkeleton listMode={isListMode} />
        <ProductCardSkeleton listMode={isListMode} />
        <ProductCardSkeleton listMode={isListMode} />
        <ProductCardSkeleton listMode={isListMode} />
        <ProductCardSkeleton listMode={isListMode} />
        <ProductCardSkeleton listMode={isListMode} />
      </section>
    </section>
  );
}
