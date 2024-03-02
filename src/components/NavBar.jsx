// component css styles
import styles from "./NavBar.module.css";

// components
import CategoriesTreeView from "@/features/products/components/CategoriesTreeView";
import ProductFilter from "@/features/products/components/ProductFilter";

export default function NavBar({ categories, productFilterData }) {
  return (
    <nav className={styles["navbar"]}>
      <CategoriesTreeView categories={categories} />
      <ProductFilter {...productFilterData} />
    </nav>
  );
}
