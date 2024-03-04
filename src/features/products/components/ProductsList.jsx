"use client";

// component css styles
import styles from "./ProductsList.module.css";

// next
import { usePathname, useSearchParams, useRouter } from "next/navigation";

// other libraries
import clsx from "clsx";
import { QueueListIcon, TableCellsIcon, ArrowsUpDownIcon } from "@heroicons/react/24/solid";

// components
import ProductCard from "./ProductCard";

export default function ProductsList({ totalProducts, products }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const isListMode = searchParams.get("view_mode") === "list";
  const defSortBy =
    searchParams.has("sort_by_field") && searchParams.has("sort_by_order")
      ? `${searchParams.get("sort_by_field")}|${searchParams.get("sort_by_order")}`
      : "id|desc";

  function handleSortByChanged([sortByField, sortByOrder]) {
    const params = new URLSearchParams(searchParams);
    params.set("sort_by_field", sortByField);
    params.set("sort_by_order", sortByOrder);
    replace(`${pathname}?${params.toString()}`);
  }

  function handleViewModeChanged(isListMode) {
    const params = new URLSearchParams(searchParams);
    params.set("view_mode", isListMode ? "list" : "grid");
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <section className={styles["products-list"]}>
      <header className="flex w-full place-items-center gap-4">
        <label className="flex flex-none cursor-pointer place-items-center gap-2">
          <TableCellsIcon width={24} height={24} />
          <input type="checkbox" name="viewMode" className="toggle" defaultChecked={isListMode} onChange={(ev) => handleViewModeChanged(ev.target.checked)} />
          <QueueListIcon width={24} height={24} />
        </label>
        <span className="divider divider-start flex-1">{totalProducts} Product(s) Found</span>
        <span className="flex flex-none place-items-center">
          <ArrowsUpDownIcon width={24} height={24} />
          <select name="sortBy" className="select" defaultValue={defSortBy} onChange={(ev) => handleSortByChanged(ev.target.value.split("|"))}>
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
