"use client";

// component css styles
import styles from "./ByCategory.module.css";

// react
import { forwardRef, useState } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { useTanTableInstanceContext } from "../../stores/TanTableInstance";

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
  className?: string;
}

export default function ByCategory({ className }: ByCategoryProps) {
  const { categories, totalItems, currentCategory, currentSubCategory, isSearchMode, isNoCategorySelected, browsedByCategory } = useTanTableInstanceContext();

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
              <ByContext />
            </TooltipTrigger>
            <TooltipContent>
              <p>Browse by category</p>
            </TooltipContent>
          </Tooltip>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className={styles["by-category__dropdown-content"]}>
          <DropdownMenuItem
            className={cn({ "font-bold": isNoCategorySelected && !isSearchMode })}
            onClick={() => {
              browsedByCategory();
              setOpen(false);
            }}
          >
            All Products
          </DropdownMenuItem>
          {categories.map(({ id: categoryId, name: categoryName, subCategories }) =>
            subCategories.length === 0 ? (
              <DropdownMenuItem
                key={categoryId}
                className={cn({ "font-bold": currentCategory === categoryName })}
                onClick={() => {
                  browsedByCategory(categoryName);
                  setOpen(false);
                }}
              >
                {categoryName}
              </DropdownMenuItem>
            ) : (
              <DropdownMenuSub key={categoryId}>
                <DropdownMenuSubTrigger>
                  <span className={cn({ "font-bold": currentCategory === categoryName })}>{categoryName}</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem
                      key={categoryId}
                      className={cn({ "font-bold": currentCategory === categoryName })}
                      onClick={() => {
                        browsedByCategory(categoryName);
                        setOpen(false);
                      }}
                    >
                      {categoryName}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {subCategories.map(({ id: subCategoryId, name: subCategoryName }) => (
                      <DropdownMenuItem
                        key={subCategoryId}
                        className={cn({ "font-bold": currentSubCategory === subCategoryName })}
                        onClick={() => {
                          browsedByCategory(categoryName, subCategoryName);
                          setOpen(false);
                        }}
                      >
                        {subCategoryName}
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

const ByContext = forwardRef<HTMLElement>(({ ...props }, ref) => {
  const { currentCategory, currentSubCategory, isSearchMode, isNoCategorySelected } = useTanTableInstanceContext();

  return (
    <footer ref={ref} {...props}>
      {isSearchMode ? (
        <>Search Results</>
      ) : isNoCategorySelected ? (
        <>All Products</>
      ) : currentSubCategory ? (
        <>
          {currentCategory} ► {currentSubCategory}
        </>
      ) : (
        <>{currentCategory}</>
      )}
    </footer>
  );
});
ByContext.displayName = "ByContext";
