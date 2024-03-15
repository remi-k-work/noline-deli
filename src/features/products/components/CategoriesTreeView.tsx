"use client";

// component css styles
import styles from "./CategoriesTreeView.module.css";

// next
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

// other libraries
import clsx from "clsx";
import { routeCarrySearchParams } from "@/lib/helpers";
import { getCategoriesTreeViewData } from "@/features/products/helpers";

// assets
import { lusitana } from "@/assets/fonts";

// types
import { CategoriesItemProps, CategoriesListProps } from "../../../../types";

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

function CategoriesList({ categoriesList = [] }: CategoriesListProps) {
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

function CategoriesItem({ categoriesItem }: CategoriesItemProps) {
  // Make sure to carry over currently used search params (product filter, viewing settings)
  const pathname = usePathname();
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
            {/* When moving to a new location, reset the pagination position and do not carry any state from the search mode */}
            {/* Also auto-hide the drawer after the user makes the selection */}
            <Link
              href={routeCarrySearchParams(href, searchParams, ["page", "keyword"])}
              onClick={() => ((document.getElementById("navBar") as HTMLInputElement).checked = false)}
              className={clsx({ "font-bold text-accent": pathname === href })}
            >
              {label}
            </Link>
          </summary>
          <CategoriesList categoriesList={subCategories} />
        </details>
      ) : (
        <>
          {/* When moving to a new location, reset the pagination position and do not carry any state from the search mode */}
          {/* Also auto-hide the drawer after the user makes the selection */}
          <Link
            href={routeCarrySearchParams(href, searchParams, ["page", "keyword"])}
            onClick={() => ((document.getElementById("navBar") as HTMLInputElement).checked = false)}
            className={clsx({ "font-bold text-accent": pathname === href })}
          >
            {label}
          </Link>
        </>
      )}
    </li>
  );
}
