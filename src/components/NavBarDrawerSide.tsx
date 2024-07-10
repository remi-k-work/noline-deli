// component css styles
import styles from "./NavBarDrawerSide.module.css";

// react
import { Suspense } from "react";

// other libraries
import { cn } from "@/lib/utils";

// components
import NavBar, { NavBarSkeleton } from "@/components/NavBar";

// types
interface NavBarDrawerSideProps {
  searchedCount?: number;
  filteredCount?: number;
}

export default function NavBarDrawerSide({ searchedCount, filteredCount }: NavBarDrawerSideProps) {
  return (
    <div className={cn(styles["navbar-drawer-side"], "drawer-side")}>
      <label htmlFor="navBar" aria-label="close sidebar" className="drawer-overlay"></label>
      <div className="min-h-full w-80">
        <Suspense fallback={<NavBarSkeleton searchedCount={searchedCount} filteredCount={filteredCount} />}>
          <NavBar searchedCount={searchedCount} filteredCount={filteredCount} />
        </Suspense>
      </div>
    </div>
  );
}
