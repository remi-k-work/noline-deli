"use client";

// component css styles
import styles from "./CategoriesTreeView.module.css";

// next
import Link from "next/link";
import { usePathname } from "next/navigation";

// prisma and db access
import type { CategoriesTreeViewData } from "@/features/storefront/db/types";

// other libraries
import { cn } from "@/lib/utils";
import useSearchParamsState from "@/hooks/useSearchParamsState";

interface CategoriesTreeViewProps {
  data: CategoriesTreeViewData;
}

interface CategoriesListProps {
  data: CategoriesTreeViewData["categoriesTreeView"];
}

interface CategoriesItemProps {
  entry: CategoriesTreeViewData["categoriesTreeView"][0];
}

export default function CategoriesTreeView({ data }: CategoriesTreeViewProps) {
  return (
    <article className={styles["categories-tree-view"]}>
      <h4 className="font-lusitana text-xl">Browse by Category</h4>
      <CategoriesList data={data.categoriesTreeView} />
    </article>
  );
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

function CategoriesList({ data }: CategoriesListProps) {
  return (
    <ul className={styles["categories-list"]}>
      {data.map((entry, index) => (
        <CategoriesItem key={index} entry={entry} />
      ))}
    </ul>
  );
}

function CategoriesItem({ entry }: CategoriesItemProps) {
  // Make sure to carry over currently used search params (product filter, viewing settings)
  const { movedToNewLocation } = useSearchParamsState();
  const pathname = usePathname();

  const { label, href, subCategories = [] } = entry;

  return (
    <li className={styles["categories-item"]}>
      {subCategories.length > 0 ? (
        <>
          <Link href={movedToNewLocation(href)} className={cn("link", { "font-bold": pathname === href })}>
            {label}
          </Link>
          <CategoriesList data={subCategories} />
        </>
      ) : (
        <Link href={movedToNewLocation(href)} className={cn("link", { "font-bold": pathname === href })}>
          {label}
        </Link>
      )}
    </li>
  );
}
