"use client";

// component css styles
import styles from "./CategoriesTreeView.module.css";

// next
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// other libraries
import clsx from "clsx";
import { getCategoriesTreeViewData } from "@/features/products/helpers";

export default function CategoriesTreeView({ categories = [] }) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <article className={clsx(styles["categories-tree-view"], "menu rounded-box bg-base-200")}>
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
  const searchParams = useSearchParams();

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
            <Link href={`${href}?${searchParams}`}>{label}</Link>
          </summary>
          <CategoriesList categoriesList={subCategories} />
        </details>
      ) : (
        <Link href={`${href}?${searchParams}`}>{label}</Link>
      )}
    </li>
  );
}
