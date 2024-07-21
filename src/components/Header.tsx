// component css styles
import styles from "./Header.module.css";

// prisma and db access
import { getCart } from "@/features/cart/cartDb";
import { getCategoriesTreeViewData, getProductFilterData } from "@/features/search/searchDb";

// other libraries
import { cn } from "@/lib/utils";

// components
import HeaderLogo from "./HeaderLogo";
import ProductFilter, { ProductFilterSkeleton } from "@/features/search/components/ProductFilter";
import CartIndicator, { CartIndicatorSkeleton } from "@/features/cart/components/CartIndicator";
import SearchPanel, { SearchPanelSkeleton } from "@/features/search/components/SearchPanel";
import ThemeSwitcher, { ThemeSwitcherSkeleton } from "./ThemeSwitcher";
import NavBarSheetTrigger, { NavBarSheetTriggerSkeleton } from "./NavBarSheetTrigger";
import SideBarSheetTrigger, { SideBarSheetTriggerSkeleton } from "./SideBarSheetTrigger";

// types
interface HeaderProps {
  searchedCount?: number;
  filteredCount?: number;
}

export default async function Header({ searchedCount, filteredCount }: HeaderProps) {
  // Fetch all data in parallel if possible and pass it down to components that require it
  const [cart, productFilterData, categoriesTreeViewData] = await Promise.all([getCart(), getProductFilterData(), getCategoriesTreeViewData()]);

  return (
    <header className={cn(styles["header"], "z-30")}>
      <section className="flex flex-none items-center gap-3">
        <HeaderLogo />
        <NavBarSheetTrigger categoriesTreeViewData={categoriesTreeViewData} />
      </section>
      <SearchPanel searchedCount={searchedCount} className="flex-1" />
      <section className="flex flex-1 items-center justify-around gap-3 sm:flex-none">
        <ProductFilter data={productFilterData} isIndicator={true} filteredCount={filteredCount} />
        <CartIndicator cart={cart} />
        <SideBarSheetTrigger productFilterData={productFilterData} filteredCount={filteredCount} />
        <ThemeSwitcher />
      </section>
    </header>
  );
}

export function HeaderSkeleton() {
  return (
    <header className={cn(styles["header-skeleton"], "z-30")}>
      <section className="flex flex-none items-center gap-3">
        <HeaderLogo />
        <NavBarSheetTriggerSkeleton />
      </section>
      <SearchPanelSkeleton className="flex-1" />
      <section className="flex flex-1 items-center justify-around gap-3 sm:flex-none">
        <ProductFilterSkeleton isIndicator={true} />
        <CartIndicatorSkeleton />
        <SideBarSheetTriggerSkeleton />
        <ThemeSwitcherSkeleton />
      </section>
    </header>
  );
}
