// component css styles
import styles from "./NavBar.module.css";

// components
import SearchPanel from "./SearchPanel";
import CategoriesTreeView from "@/features/products/components/CategoriesTreeView";
import ProductFilter from "@/features/products/components/ProductFilter";

export default function NavBar({ categories, productFilterData }) {
  return (
    <nav className={styles["navbar"]}>
      <div className="lg:hidden">
        <SearchPanel />
        <br />
      </div>
      <CategoriesTreeView categories={categories} />
      <br />
      <ProductFilter {...productFilterData} />
    </nav>
  );
}
