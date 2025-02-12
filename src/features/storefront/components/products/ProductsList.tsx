"use client";

// component css styles
import styles from "./ProductsList.module.css";

// prisma and db access
import type { Product } from "@prisma/client";

// other libraries
import { cn } from "@/lib/utils";
import useSearchParamsState from "@/hooks/useSearchParamsState";

// components
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
        <Label className="flex flex-none items-center gap-2">
          <TableCellsIcon width={24} height={24} />
          <Switch name="viewMode" checked={isListMode} onCheckedChange={(isListMode) => productsListChanged(undefined, undefined, isListMode)} />
          <QueueListIcon width={24} height={24} />
        </Label>
        <span className="flex-1 text-end">{totalProducts} Product(s) Found</span>
        <Label className="flex flex-initial basis-48 items-center gap-1">
          <ArrowsUpDownIcon width={24} height={24} />
          <Select
            name="sortBy"
            value={sortBy}
            onValueChange={(sortBy) => productsListChanged(sortBy.split("|")[0] as "id" | "price" | "name", sortBy.split("|")[1] as "asc" | "desc")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="id|desc">Date (Newest)</SelectItem>
              <SelectItem value="id|asc">Date (Oldest)</SelectItem>
              <SelectItem value="price|asc">Price (Lowest)</SelectItem>
              <SelectItem value="price|desc">Price (Highest)</SelectItem>
              <SelectItem value="name|asc">Name (A to Z)</SelectItem>
              <SelectItem value="name|desc">Name (Z to A)</SelectItem>
            </SelectContent>
          </Select>
        </Label>
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
        <Label className="flex flex-none items-center gap-2">
          <TableCellsIcon width={24} height={24} />
          <Switch name="viewMode" defaultChecked={isListMode} disabled />
          <QueueListIcon width={24} height={24} />
        </Label>
        <span className="flex-1 text-end">... Product(s) Found</span>
        <Label className="flex flex-initial basis-48 items-center gap-1">
          <ArrowsUpDownIcon width={24} height={24} />
          <Select name="sortBy" defaultValue={sortBy} disabled>
            <SelectTrigger>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="id|desc">Date (Newest)</SelectItem>
              <SelectItem value="id|asc">Date (Oldest)</SelectItem>
              <SelectItem value="price|asc">Price (Lowest)</SelectItem>
              <SelectItem value="price|desc">Price (Highest)</SelectItem>
              <SelectItem value="name|asc">Name (A to Z)</SelectItem>
              <SelectItem value="name|desc">Name (Z to A)</SelectItem>
            </SelectContent>
          </Select>
        </Label>
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
