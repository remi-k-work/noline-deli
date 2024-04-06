// component css styles
import styles from "./NavBar.module.css";

// components
import SearchPanel from "@/features/search/components/SearchPanel";
import CategoriesTreeView from "@/features/products/components/CategoriesTreeView";
import ProductFilter from "@/features/search/components/ProductFilter";

export default function NavBar({ categories, productFilterData }) {
  return (
    <nav className={styles["navbar"]}>
      <div className="lg:hidden">
        <SearchPanel drawerToHide={"navBar"} />
      </div>
      <ProductFilter {...productFilterData} drawerToHide={"navBar"} />
      <CategoriesTreeView categories={categories} />
    </nav>
  );
}
