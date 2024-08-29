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
  const { table, categories } = useTanTableInstanceContext();

  const totalItems = table.getFilteredRowModel().rows.length;
  const isSearchMode = !!table.getState().globalFilter;
  const currentCategory = table.getColumn("category")?.getFilterValue() as string;
  const currentSubCategory = table.getColumn("subCategory")?.getFilterValue() as string;

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
            className={cn({ "font-bold": isSearchMode })}
            onClick={() => {
              table.resetGlobalFilter();
              table.resetColumnFilters();
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
                  table.resetGlobalFilter();
                  table.resetColumnFilters();
                  table.getColumn("category")?.setFilterValue(categoryName);
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
                        table.resetGlobalFilter();
                        table.resetColumnFilters();
                        table.getColumn("category")?.setFilterValue(categoryName);
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
                          table.resetGlobalFilter();
                          table.resetColumnFilters();
                          table.getColumn("category")?.setFilterValue(categoryName);
                          table.getColumn("subCategory")?.setFilterValue(subCategoryName);
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
  const { table } = useTanTableInstanceContext();

  const isSearchMode = !!table.getState().globalFilter;
  const currentCategory = table.getColumn("category")?.getFilterValue() as string;
  const currentSubCategory = table.getColumn("subCategory")?.getFilterValue() as string;

  return (
    <footer ref={ref} {...props}>
      {isSearchMode ? (
        <>Search Results</>
      ) : !currentCategory ? (
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
