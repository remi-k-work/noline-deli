// component css styles
import styles from "./NavBarDrawerContent.module.css";

// components
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// types
interface NavBarDrawerContentProps {
  searchedCount?: number;
  filteredCount?: number;
  children: React.ReactNode;
}

export default function NavBarDrawerContent({ searchedCount, filteredCount, children }: NavBarDrawerContentProps) {
  return (
    <div className="drawer-content">
      <div className={styles["navbar-drawer-content"]}>
        <Header searchedCount={searchedCount} filteredCount={filteredCount} />
        <main className={styles["navbar-drawer-content__main"]}>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
