// component css styles
import styles from "./Header.module.css";

// prisma and db access
import { getCart } from "@/features/cart/db/cart";
import productFilter from "@/features/storefront/db/get-data-for/productFilter";
import categoriesTreeView from "@/features/storefront/db/get-data-for/categoriesTreeView";

// other libraries
import { cn } from "@/lib/utils";

// components
import HeaderLogo from "./HeaderLogo";
import ProductFilterIndicator, { ProductFilterIndicatorSkeleton } from "./search/product-filter-indicator";
import CartIndicator, { CartIndicatorSkeleton } from "@/features/cart/components/CartIndicator";
import SearchPanel, { SearchPanelSkeleton } from "@/features/storefront/components/search/SearchPanel";
import ThemeSwitcher, { ThemeSwitcherSkeleton } from "@/components/ThemeSwitcher";
import NavBarSheetTrigger, { NavBarSheetTriggerSkeleton } from "./NavBarSheetTrigger";
import SideBarSheetTrigger, { SideBarSheetTriggerSkeleton } from "./SideBarSheetTrigger";

// types
interface HeaderProps {
  searchedCount?: number;
  filteredCount?: number;
}

export default async function Header({ searchedCount, filteredCount }: HeaderProps) {
  // Fetch all data in parallel if possible and pass it down to components that require it
  const [cart, productFilterData, categoriesTreeViewData] = await Promise.all([getCart(), productFilter(), categoriesTreeView()]);

  return (
    <header className={cn(styles["header"], "z-[2]")}>
      <HeaderLogo className={styles["header__logo"]} />
      <NavBarSheetTrigger categoriesTreeViewData={categoriesTreeViewData} className={styles["header__navbar-sheet-trigger"]} />
      <SearchPanel searchedCount={searchedCount} className={styles["header__search-panel"]} />
      <ProductFilterIndicator productFilterData={productFilterData} className={styles["header__product-filter-indicator"]} />
      <CartIndicator cart={cart} className={styles["header__cart-indicator"]} />
      <SideBarSheetTrigger productFilterData={productFilterData} filteredCount={filteredCount} className={styles["header__sidebar-sheet-trigger"]} />
      <ThemeSwitcher className={styles["header__theme-switcher"]} />
    </header>
  );
}

export function HeaderSkeleton() {
  return (
    <header className={cn(styles["header"], "z-[2]")}>
      <HeaderLogo className={styles["header__logo"]} />
      <NavBarSheetTriggerSkeleton className={styles["header__navbar-sheet-trigger"]} />
      <SearchPanelSkeleton className={styles["header__search-panel"]} />
      <ProductFilterIndicatorSkeleton className={styles["header__product-filter-indicator"]} />
      <CartIndicatorSkeleton className={styles["header__cart-indicator"]} />
      <SideBarSheetTriggerSkeleton className={styles["header__sidebar-sheet-trigger"]} />
      <ThemeSwitcherSkeleton className={styles["header__theme-switcher"]} />
    </header>
  );
}
