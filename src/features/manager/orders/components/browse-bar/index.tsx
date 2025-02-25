"use client";

// component css styles
import styles from "./index.module.css";

// other libraries
import { cn } from "@/lib/utils";

// components
import BrowseBy from "./browse-by";
import SearchPanel from "./SearchPanel";
import Paginate from "./Paginate";

// assets
import { lusitana } from "@/assets/fonts";

export default function BrowseBar() {
  return (
    <section className={cn(lusitana.className, styles["browse-bar"])}>
      <BrowseBy className={styles["browse-bar__browse-by"]} />
      <SearchPanel className={styles["browse-bar__search-panel"]} />
      <Paginate className={styles["browse-bar__paginate"]} />
    </section>
  );
}
