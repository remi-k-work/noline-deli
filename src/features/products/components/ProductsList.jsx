"use client";

// component css styles
import styles from "./ProductsList.module.css";

// react
import { useState } from "react";

// next
import { usePathname, useSearchParams, useRouter } from "next/navigation";

// components
import ProductCard from "./ProductCard";

export default function ProductsList({ totalProducts, products }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  function handleSortByChanged(ev) {
    const [sortByField, sortByOrder] = ev.target.value.split("|");
    const params = new URLSearchParams(searchParams);
    params.set("sort_by_field", sortByField);
    params.set("sort_by_order", sortByOrder);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <section className={styles["products-list"]}>
      <header className="flex w-full place-items-center gap-4">
        <span className="divider divider-start flex-1">{totalProducts} Product(s) Found</span>
        <span className="flex-none">
          <span>Sort By:</span>
          <select
            name="sortBy"
            className="select"
            onChange={handleSortByChanged}
            defaultValue={`${searchParams.get("sort_by_field")}|${searchParams.get("sort_by_order")}`}
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
      <section className={styles["products-list__items"]}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </section>
  );
}
