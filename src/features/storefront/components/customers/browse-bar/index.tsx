"use client";

// component css styles
import styles from "./index.module.css";

// components
import BrowseBy from "./browse-by";
import SearchPanel from "./SearchPanel";
import Paginate from "./Paginate";

export default function BrowseBar() {
  return (
    <section className={styles["browse-bar"]}>
      <BrowseBy />
      <SearchPanel />
      <Paginate />
    </section>
  );
}
