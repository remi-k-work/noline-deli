// component css styles
import styles from "./index.module.css";

// prisma and db access
import categoriesTreeView from "@/features/storefront/db/get-data-for/categoriesTreeView";

// components
import CategoriesTree from "./CategoriesTree";

export default async function CategoriesTreeView() {
  return <CategoriesTree data={await categoriesTreeView()} />;
}

export function CategoriesTreeViewSkeleton() {
  return (
    <article className={styles["categories-tree-view-skeleton"]}>
      <h4 className="font-lusitana text-xl">Browse by Category</h4>
      {new Array(6).fill(null).map((_, index) => (
        <ul key={index} className={styles["categories-list-skeleton"]}>
          <li className={styles["categories-item-skeleton"]}>
            <div className="bg-background mb-2 h-5 animate-pulse rounded-lg" />
          </li>
          <li className={styles["categories-item-skeleton"]}>
            <ul className={styles["categories-list-skeleton"]}>
              <li className={styles["categories-item-skeleton"]}>
                <div className="bg-background mb-2 h-5 animate-pulse rounded-lg" />
              </li>
              <li className={styles["categories-item-skeleton"]}>
                <div className="bg-background mb-2 h-5 animate-pulse rounded-lg" />
              </li>
              <li className={styles["categories-item-skeleton"]}>
                <div className="bg-background mb-2 h-5 animate-pulse rounded-lg" />
              </li>
            </ul>
          </li>
        </ul>
      ))}
    </article>
  );
}
