// component css styles
import styles from "./NavBar.module.css";

// components
import CategoriesTreeView from "@/features/products/components/CategoriesTreeView";

export default function NavBar({ categories }) {
  return (
    <nav className={styles["navbar"]}>
      <CategoriesTreeView categories={categories} />
    </nav>
  );
}
