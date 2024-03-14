"use client";

// component css styles
import styles from "./ProductsList.module.css";

// next
import { usePathname, useSearchParams, useRouter } from "next/navigation";

// other libraries
import clsx from "clsx";
import { routeCarrySearchParams } from "@/lib/helpers";
import { QueueListIcon, TableCellsIcon, ArrowsUpDownIcon } from "@heroicons/react/24/solid";

// components
import ProductCard from "./ProductCard";

export default function ProductsList({ totalProducts, products }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  // If feasible, load the default values for the viewing settings from the search params
  const isListMode = searchParams.get("view_mode") === "list";
  const defSortBy =
    searchParams.has("sort_by_field") && searchParams.has("sort_by_order")
      ? `${searchParams.get("sort_by_field")}|${searchParams.get("sort_by_order")}`
      : "id|desc";

  function handleSortByChanged([sortByField, sortByOrder]) {
    // Set the viewing settings and save their state in search params
    replace(
      routeCarrySearchParams(pathname, searchParams, undefined, [
        ["sort_by_field", sortByField],
        ["sort_by_order", sortByOrder],
      ]),
    );
  }

  function handleViewModeChanged(isListMode) {
    // Set the viewing settings and save their state in search params
    replace(routeCarrySearchParams(pathname, searchParams, undefined, [["view_mode", isListMode ? "list" : "grid"]]));
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
