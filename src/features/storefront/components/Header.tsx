// component css styles
import styles from "./Header.module.css";

// prisma and db access
import { getCart } from "@/features/cart/db/cart";
import productFilter from "@/features/storefront/db/get-data-for/productFilter";

// other libraries
import { cn } from "@/lib/utils";

// components
import HeaderLogo from "./HeaderLogo";
import ProductFilterIndicator, { ProductFilterIndicatorSkeleton } from "./search/product-filter-indicator";
import CartIndicator, { CartIndicatorSkeleton } from "@/features/cart/components/CartIndicator";
import SearchPanel, { SearchPanelSkeleton } from "@/features/storefront/components/search/SearchPanel";
import MyAccount, { MyAccountSkeleton } from "./MyAccount";
import ThemeSwitcher, { ThemeSwitcherSkeleton } from "@/components/ThemeSwitcher";

export default async function Header() {
  // Fetch all data in parallel if possible and pass it down to components that require it
  const [cart, productFilterData] = await Promise.all([getCart(), productFilter()]);

  return (
    <header className={cn(styles["header"], "z-3")}>
      <HeaderLogo />
      <SearchPanel />
      <ProductFilterIndicator productFilterData={productFilterData} />
      <CartIndicator cart={cart} />
      <MyAccount />
      <ThemeSwitcher />
    </header>
  );
}

export function HeaderSkeleton() {
  return (
    <header className={cn(styles["header"], "z-3")}>
      <HeaderLogo />
      <SearchPanelSkeleton />
      <ProductFilterIndicatorSkeleton />
      <CartIndicatorSkeleton />
      <MyAccountSkeleton />
      <ThemeSwitcherSkeleton />
    </header>
  );
}
