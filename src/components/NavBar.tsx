// component css styles
import styles from "./NavBar.module.css";

// prisma and db access
import { allCategories } from "@/features/products/productsDb";
import { getProductFilterData } from "@/features/search/searchDb";

// components
import SearchPanel from "@/features/search/components/SearchPanel";
import CategoriesTreeView from "@/features/products/components/CategoriesTreeView";
import ProductFilter from "@/features/search/components/ProductFilter";

// types
interface NavBarProps {
  searchedCount?: number;
  filteredCount?: number;
}

export default async function NavBar({ searchedCount, filteredCount }: NavBarProps) {
  // Fetch all data in parallel if possible and pass it down to components that require it
  const [categories, productFilterData] = await Promise.all([allCategories(), getProductFilterData()]);

  return (
    <nav className={styles["navbar"]}>
      <div className="lg:hidden">
        <SearchPanel drawerToHide={"navBar"} searchedCount={searchedCount} />
      </div>
      <ProductFilter {...productFilterData} drawerToHide={"navBar"} filteredCount={filteredCount} />
      <CategoriesTreeView categories={categories} />
    </nav>
  );
}
