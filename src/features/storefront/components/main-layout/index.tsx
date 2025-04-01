// component css styles
import styles from "./index.module.css";

// react
import { ReactNode, Suspense } from "react";

// components
import { MainLayoutStoreProvider } from "@/features/storefront/stores/mainLayoutProvider";
import Header, { HeaderSkeleton } from "@/features/storefront/components/Header";
import Footer from "@/features/storefront/components/Footer";
import Main from "./Main";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

// types
interface MainLayoutProps {
  totalItems?: number;
  children: ReactNode;
}

export default function MainLayout({ totalItems = 0, children }: MainLayoutProps) {
  return (
    <article className={styles["main-layout"]}>
      <MainLayoutStoreProvider initState={{ isSheetMode: false, totalItems, isNavBarOpen: false, isSideBarOpen: false }}>
        <Suspense fallback={<HeaderSkeleton />}>
          <Header />
        </Suspense>
        {children}
        <Footer />
      </MainLayoutStoreProvider>
    </article>
  );
}

export { Main as MainLayoutMain, NavBar as MainLayoutNavBar, SideBar as MainLayoutSideBar };
