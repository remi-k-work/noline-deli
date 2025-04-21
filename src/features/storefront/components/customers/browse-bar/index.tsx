"use client";

// component css styles
import styles from "./index.module.css";

// components
import BrowseBy, { BrowseBySkeleton } from "./browse-by";
import SearchPanel, { SearchPanelSkeleton } from "./SearchPanel";
import Paginate, { PaginateSkeleton } from "./Paginate";

export default function BrowseBar() {
  return (
    <section className={styles["browse-bar"]}>
      <BrowseBy />
      <SearchPanel />
      <Paginate />
    </section>
  );
}

export function BrowseBarSkeleton() {
  return (
    <div className={styles["browse-bar"]}>
      <BrowseBySkeleton />
      <SearchPanelSkeleton />
      <PaginateSkeleton />
    </div>
  );
}
