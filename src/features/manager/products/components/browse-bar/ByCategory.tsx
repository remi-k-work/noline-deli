"use client";

// component css styles
import styles from "./ByCategory.module.css";

// react
import { forwardRef, useState } from "react";

// next
import Link from "next/link";

// prisma and db access
import { CategoryWithSubCategory } from "../../../categories/db";

// other libraries
import { cn } from "@/lib/utils";
import useSearchParamsState from "../../../hooks/useSearchParamsState";

// components
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// types
interface ByCategoryProps {
  categories: CategoryWithSubCategory[];
  totalItems: number;
  className?: string;
}

interface ByContextProps {
  categories: CategoryWithSubCategory[];
}

export default function ByCategory({ categories, totalItems, className }: ByCategoryProps) {
  const searchParamsState = useSearchParamsState();

  // The controlled open state of the drop-down menu
  const [open, setOpen] = useState(false);

  return (
    <section className={cn(styles["by-category"], className)}>
      <header className={styles["by-category__total"]}>
        <span className="badge badge-info">{totalItems}</span>
      </header>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger className={styles["by-category__context"]}>
          <Tooltip>
            <TooltipTrigger asChild>
              <ByContext categories={categories} />
            </TooltipTrigger>
            <TooltipContent>
              <p>View all items by category and subcategory</p>
            </TooltipContent>
          </Tooltip>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className={styles["by-category__dropdown-content"]}>
          <DropdownMenuItem>
            <Link
              href={searchParamsState.browseByCategoryChanged()}
              className={cn({ "font-bold": searchParamsState.isNoCategorySelected && !searchParamsState.isSearchMode }, "block w-full")}
              onClick={() => setOpen(false)}
            >
              All Products
            </Link>
          </DropdownMenuItem>
          {categories.map(({ id: categoryId, name, subCategories }) =>
            subCategories.length === 0 ? (
              <DropdownMenuItem key={categoryId}>
                <Link
                  href={searchParamsState.browseByCategoryChanged(categoryId)}
                  className={cn({ "font-bold": searchParamsState.isCategorySelected(categoryId) }, "block w-full")}
                  onClick={() => setOpen(false)}
                >
                  {name}
                </Link>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuSub key={categoryId}>
                <DropdownMenuSubTrigger>
                  <span className={cn({ "font-bold": searchParamsState.isCategorySelected(categoryId) })}>{name}</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <Link
                        href={searchParamsState.browseByCategoryChanged(categoryId)}
                        className={cn({ "font-bold": searchParamsState.isCategorySelected(categoryId) }, "block w-full")}
                        onClick={() => setOpen(false)}
                      >
                        {name}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {subCategories.map(({ id: subCategoryId, name }) => (
                      <DropdownMenuItem key={subCategoryId}>
                        <Link
                          href={searchParamsState.browseByCategoryChanged(categoryId, subCategoryId)}
                          className={cn({ "font-bold": searchParamsState.isSubCategorySelected(subCategoryId) }, "block w-full")}
                          onClick={() => setOpen(false)}
                        >
                          {name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            ),
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
}

const ByContext = forwardRef<HTMLElement, ByContextProps>(({ categories, ...props }: ByContextProps, ref) => {
  const searchParamsState = useSearchParamsState();

  const currentCategory = categories.find(({ id }) => searchParamsState.isCategorySelected(id));
  const currentSubCategory = currentCategory?.subCategories.find(({ id }) => searchParamsState.isSubCategorySelected(id));

  return (
    <footer ref={ref} {...props}>
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
    </footer>
  );
});
ByContext.displayName = "ByContext";
