"use client";

// component css styles
import styles from "./BrowseByCategory.module.css";

// next
import Link from "next/link";

// prisma and db access
import { CategoryWithSubCategory } from "../managerDb";

// other libraries
import clsx from "clsx";
import PathFinder from "@/features/manager/PathFinder";
import useSearchParamsState from "../useSearchParamsState";

// types
interface BrowseByCategoryProps {
  categories: CategoryWithSubCategory[];
  className?: string;
}

export default function BrowseByCategory({ categories, className }: BrowseByCategoryProps) {
  const searchParamsState = useSearchParamsState();

  return (
    <div className={clsx(styles["browse-by-category"], "dropdown", className)}>
      <div tabIndex={0} role="button" className="menu-title">
        <div className="lg:tooltip lg:tooltip-right" data-tip="View all items by category and subcategory">
          Browse by Category
        </div>
      </div>
      <ul tabIndex={0} className={clsx(styles["browse-by-category__dropdown-content"], "menu dropdown-content bg-base-200")}>
        <li>
          <Link
            href={PathFinder.toAllProducts()}
            onClick={() => (document.activeElement as HTMLElement)?.blur()}
            className={clsx({ "font-bold text-accent": searchParamsState.isNoCategorySelected })}
          >
            All Products
          </Link>
        </li>
        {categories.map(({ id: categoryId, name, subCategories }) => (
          <li key={categoryId}>
            <details open>
              <summary>
                <Link
                  href={PathFinder.toProductsByCategory(categoryId)}
                  onClick={() => (document.activeElement as HTMLElement)?.blur()}
                  className={clsx({ "font-bold text-accent": searchParamsState.isCategorySelected(categoryId) })}
                >
                  {name}
                </Link>
              </summary>
              <ul>
                {subCategories.map(({ id: subCategoryId, name }) => (
                  <li key={subCategoryId}>
                    <Link
                      href={PathFinder.toProductsByCategoryAndSubCategory(categoryId, subCategoryId)}
                      onClick={() => (document.activeElement as HTMLElement)?.blur()}
                      className={clsx({ "font-bold text-accent": searchParamsState.isSubCategorySelected(subCategoryId) })}
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
