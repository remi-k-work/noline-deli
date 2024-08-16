"use client";

// prisma and db access
import { CategoriesTreeViewData } from "@/features/search/searchDb";

// other libraries
import useMediaQuery from "@/lib/hooks/useMediaQuery";

// components
import CategoriesTreeView, { CategoriesTreeViewSkeleton } from "@/features/products/components/CategoriesTreeView";

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
