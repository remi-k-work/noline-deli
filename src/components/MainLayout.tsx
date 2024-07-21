// component css styles
import styles from "./MainLayout.module.css";

// react
import { ReactNode, Suspense } from "react";

// components
import Header, { HeaderSkeleton } from "@/components/Header";
import Footer from "@/components/Footer";
import { NavBarSkeleton } from "@/components/NavBar";
import NavBarFetcher from "./NavBarFetcher";
import { SideBarSkeleton } from "./SideBar";
import SideBarFetcher from "./SideBarFetcher";

// types
interface MainLayoutProps {
  searchedCount?: number;
  filteredCount?: number;
  children: ReactNode;
}

export default function MainLayout({ searchedCount, filteredCount, children }: MainLayoutProps) {
  return (
    <article className={styles["main-layout"]}>
      <Suspense fallback={<HeaderSkeleton />}>
        <Header searchedCount={searchedCount} filteredCount={filteredCount} />
      </Suspense>
      <Suspense fallback={<NavBarSkeleton className={styles["main-layout__navbar"]} />}>
        <NavBarFetcher className={styles["main-layout__navbar"]} />
      </Suspense>
      <Suspense fallback={<SideBarSkeleton className={styles["main-layout__sidebar"]} />}>
        <SideBarFetcher className={styles["main-layout__sidebar"]} />
      </Suspense>
      <main className={styles["main-layout__main"]}>{children}</main>
      <Footer />
    </article>
  );
}
