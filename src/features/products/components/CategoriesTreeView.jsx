"use client";

// component css styles
import styles from "./CategoriesTreeView.module.css";

// next
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// other libraries
import clsx from "clsx";
import { getCategoriesTreeViewData } from "@/features/products/helpers";

// assets
import { lusitana } from "@/assets/fonts";

export default function CategoriesTreeView({ categories = [] }) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <article className={clsx(styles["categories-tree-view"], "menu p-0")}>
      <h4 className={clsx(lusitana.className, "text-xl")}>Browse by Category</h4>
      <CategoriesList categoriesList={getCategoriesTreeViewData(categories)} />
    </article>
  );
}

function CategoriesList({ categoriesList = [] }) {
  if (categoriesList.length === 0) {
    return null;
  }

  return (
    <ul className={styles["categories-list"]}>
      {categoriesList.map((categoriesItem, index) => (
        <CategoriesItem key={index} categoriesItem={categoriesItem} />
      ))}
    </ul>
  );
}

function CategoriesItem({ categoriesItem }) {
  // Make sure to carry over currently used search params (product filter, viewing settings)
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  // When navigating to a new place, reset the pagination position
  params.delete("page");

  // Also, do not carry over any state from the search mode
  params.delete("keyword");

  // Ensure the categories item exists
  if (!categoriesItem) {
    // To prevent receiving the "cannot destructure property of undefined" exception, do not attempt to render anything
    return null;
  }

  const { label, href, subCategories = [] } = categoriesItem;

  return (
    <li className={styles["categories-item"]}>
      {subCategories.length > 0 ? (
        <details open>
          <summary>
            <Link href={`${href}?${params.toString()}`}>{label}</Link>
          </summary>
          <CategoriesList categoriesList={subCategories} />
        </details>
      ) : (
        <Link href={`${href}?${params.toString()}`}>{label}</Link>
      )}
    </li>
  );
}
