"use client";

// prisma and db access
import type { CategoriesTreeViewData } from "@/features/storefront/db/types";

// other libraries
import useMediaQuery from "@/hooks/useMediaQuery";

// components
import CategoriesTreeView, { CategoriesTreeViewSkeleton } from "@/features/storefront/components/products/CategoriesTreeView";

// types
interface NavBarProps {
  categoriesTreeViewData: CategoriesTreeViewData;
  sheetMode?: boolean;
  className?: string;
}

export default function NavBar({ categoriesTreeViewData, sheetMode = false, className }: NavBarProps) {
  // Large screens
  const isLarge = useMediaQuery("(min-width: 1024px)");

  return (
    (isLarge || sheetMode) && (
      <nav className={className}>
        <section className="sticky top-20">
          <CategoriesTreeView data={categoriesTreeViewData} />
        </section>
      </nav>
    )
  );
}

export function NavBarSkeleton({ className }: Required<Pick<NavBarProps, "className">>) {
  // Large screens
  const isLarge = useMediaQuery("(min-width: 1024px)");

  return (
    isLarge && (
      <nav className={className}>
        <CategoriesTreeViewSkeleton />
      </nav>
    )
  );
}
