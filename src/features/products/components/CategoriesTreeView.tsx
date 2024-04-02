"use client";

// component css styles
import styles from "./CategoriesTreeView.module.css";

// next
import Link from "next/link";
import { usePathname } from "next/navigation";

// prisma and db access
import { Prisma } from "@prisma/client";

// other libraries
import clsx from "clsx";
import { routeToAllProducts, routeToProductsByCategory, routeToProductsByCategoryAndSubCategory } from "@/features/products/helpers";
import useSearchParamsState from "@/lib/useSearchParamsState";

// assets
import { lusitana } from "@/assets/fonts";

// types
type CategoriesTreeViewInputData = Prisma.CategoryGetPayload<{ include: { subCategories: true } }>;

interface CategoriesTreeViewCategory {
  label: string;
  href: string;
  subCategories?: CategoriesTreeViewCategory[];
}

interface CategoriesListProps {
  categoriesList: CategoriesTreeViewCategory[];
}

interface CategoriesItemProps {
  categoriesItem: CategoriesTreeViewCategory;
}

// Create a product category tree in the format that is needed by the categories tree view component
// [{ label: "", href: "", subCategories: [{ label: "", href: "", subCategories: [{ ... }] }] }]
function getCategoriesTreeViewData(categories: CategoriesTreeViewInputData[]): CategoriesTreeViewCategory[] {
  const productCategories: CategoriesTreeViewCategory[] = [];
  for (const { id: categoryId, name: categoryName, subCategories } of categories) {
    productCategories.push({ label: categoryName, href: routeToProductsByCategory(categoryName, categoryId), subCategories: [] });
    for (const { id: subCategoryId, name: subCategoryName } of subCategories) {
      productCategories.at(-1)?.subCategories?.push({
        label: subCategoryName,
        href: routeToProductsByCategoryAndSubCategory(categoryName, categoryId, subCategoryName, subCategoryId),
        subCategories: [],
      });
    }
  }
  return [{ label: "All Products", href: routeToAllProducts, subCategories: productCategories }];
}

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
  const searchParamsState = useSearchParamsState();
  const pathname = usePathname();

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
              href={searchParamsState.movedToNewLocation(href)}
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
            href={searchParamsState.movedToNewLocation(href)}
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
