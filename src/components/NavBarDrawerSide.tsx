// component css styles
import styles from "./NavBarDrawerSide.module.css";

// other libraries
import clsx from "clsx";

// components
import NavBar from "@/components/NavBar";

// types
interface NavBarDrawerSideProps {
  searchedCount?: number;
  filteredCount?: number;
}

export default function NavBarDrawerSide({ searchedCount, filteredCount }: NavBarDrawerSideProps) {
  return (
    <div className={clsx(styles["navbar-drawer-side"], "drawer-side")}>
      <label htmlFor="navBar" aria-label="close sidebar" className="drawer-overlay"></label>
      <div className="min-h-full w-80">
        <NavBar searchedCount={searchedCount} filteredCount={filteredCount} />
      </div>
    </div>
  );
}
