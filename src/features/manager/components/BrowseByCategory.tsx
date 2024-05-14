"use client";

// component css styles
import styles from "./BrowseByCategory.module.css";

// next
import Link from "next/link";

// prisma and db access
import { CategoryWithSubCategory } from "../managerDb";

// other libraries
import clsx from "clsx";
import useSearchParamsState from "../useSearchParamsState";

// types
interface BrowseByCategoryProps {
  categories: CategoryWithSubCategory[];
  totalItems: number;
  className?: string;
}

interface BrowseByContextProps {
  categories: CategoryWithSubCategory[];
}

export default function BrowseByCategory({ categories, totalItems, className }: BrowseByCategoryProps) {
  const searchParamsState = useSearchParamsState();

  return (
    <section className={clsx(styles["browse-by-category"], className)}>
      <header className={styles["browse-by-category__total"]}>
        <span className="badge badge-info">{totalItems}</span>
      </header>
      <footer className={clsx(styles["browse-by-category__context"], "dropdown lg:tooltip")} data-tip="View all items by category and subcategory">
        {/* This is the "trigger" for a dropdown, and we need to style it so that it takes up the entire container */}
        <div tabIndex={0} role="button" className="h-full p-2 text-start">
          <BrowseByContext categories={categories} />
        </div>
        <ul tabIndex={0} className={clsx(styles["browse-by-category__dropdown-content"], "menu dropdown-content bg-base-200")}>
          <li>
            <Link
              href={searchParamsState.browseByCategoryChanged()}
              onClick={() => (document.activeElement as HTMLElement)?.blur()}
              className={clsx({ "font-bold text-accent": searchParamsState.isNoCategorySelected && !searchParamsState.isSearchMode })}
            >
              All Products
            </Link>
          </li>
          {categories.map(({ id: categoryId, name, subCategories }) => (
            <li key={categoryId}>
              <details open>
                <summary>
                  <Link
                    href={searchParamsState.browseByCategoryChanged(categoryId)}
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
                        href={searchParamsState.browseByCategoryChanged(categoryId, subCategoryId)}
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
      </footer>
    </section>
  );
}

function BrowseByContext({ categories }: BrowseByContextProps) {
  const searchParamsState = useSearchParamsState();

  const currentCategory = categories.find(({ id }) => searchParamsState.isCategorySelected(id));
  const currentSubCategory = currentCategory?.subCategories.find(({ id }) => searchParamsState.isSubCategorySelected(id));

  return (
    <>
      {searchParamsState.isSearchMode ? (
        <>Search Results</>
      ) : searchParamsState.isNoCategorySelected ? (
        <>All Products</>
      ) : currentSubCategory ? (
        <>
          {currentCategory?.name} ► {currentSubCategory.name}
        </>
      ) : (
        <>{currentCategory?.name}</>
      )}
    </>
  );
}
