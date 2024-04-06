"use client";

// component css styles
import styles from "./ProductsList.module.css";

// next
import { useRouter } from "next/navigation";

// prisma and db access
import { Product } from "@prisma/client";

// other libraries
import clsx from "clsx";
import { QueueListIcon, TableCellsIcon, ArrowsUpDownIcon } from "@heroicons/react/24/solid";
import useSearchParamsState from "@/lib/useSearchParamsState";

// components
import ProductCard from "./ProductCard";

// types
interface ProductsListProps {
  totalProducts: number;
  products: Product[];
}

export default function ProductsList({ totalProducts, products }: ProductsListProps) {
  const searchParamsState = useSearchParamsState();
  const { isListMode, sortBy } = searchParamsState;
  const { replace } = useRouter();

  // Set the viewing settings and save their state in search params
  function handleSortByChanged([sortByField, sortByOrder]: ["id" | "price" | "name", "asc" | "desc"]) {
    replace(searchParamsState.productsListChanged(sortByField, sortByOrder));
  }

  function handleViewModeChanged(isListMode: boolean) {
    replace(searchParamsState.productsListChanged(undefined, undefined, isListMode));
  }

  return (
    <section className={styles["products-list"]}>
      <header className="mb-4 flex w-full flex-wrap place-items-center justify-end gap-4">
        <label className="flex flex-none cursor-pointer place-items-center gap-2">
          <TableCellsIcon width={24} height={24} />
          <input type="checkbox" name="viewMode" className="toggle" defaultChecked={isListMode} onChange={(ev) => handleViewModeChanged(ev.target.checked)} />
          <QueueListIcon width={24} height={24} />
        </label>
        <span className="flex-1 text-end lg:divider lg:divider-start">{totalProducts} Product(s) Found</span>
        <span className="flex flex-none place-items-center">
          <ArrowsUpDownIcon width={24} height={24} />
          <select
            name="sortBy"
            className="select"
            defaultValue={sortBy}
            onChange={(ev) => handleSortByChanged([ev.target.value.split("|")[0] as "id" | "price" | "name", ev.target.value.split("|")[1] as "asc" | "desc"])}
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
      <section className={clsx(styles["products-list__items"], isListMode && styles["products-list__items--list-mode"])}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} listMode={isListMode} />
        ))}
      </section>
    </section>
  );
}
