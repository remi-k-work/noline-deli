// component css styles
import styles from "./NavBarDrawerContent.module.css";

// react
import { Suspense } from "react";

// components
import Header, { HeaderSkeleton } from "@/components/Header";
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
        <Suspense fallback={<HeaderSkeleton searchedCount={searchedCount} filteredCount={filteredCount} />}>
          <Header searchedCount={searchedCount} filteredCount={filteredCount} />
        </Suspense>
        <main className={styles["navbar-drawer-content__main"]}>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
