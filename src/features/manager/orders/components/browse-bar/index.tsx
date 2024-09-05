"use client";

// component css styles
import styles from "./index.module.css";

// other libraries
import { cn } from "@/lib/utils";

// components
import ByCategory from "./ByCategory";
import SearchPanel from "./SearchPanel";
import Paginate from "./Paginate";

// assets
import { lusitana } from "@/assets/fonts";

export default function BrowseBar() {
  return (
    <section className={cn(lusitana.className, styles["browse-bar"], "bg-base-100")}>
      <ByCategory className={styles["browse-bar__browse-by-category"]} />
      <SearchPanel className={styles["browse-bar__search-panel"]} />
      <Paginate className={styles["browse-bar__paginate"]} />
    </section>
  );
}
