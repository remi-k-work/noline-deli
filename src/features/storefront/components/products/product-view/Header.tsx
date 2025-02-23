// component css styles
import styles from "./Header.module.css";

// prisma and db access
import type { ProductWithAll } from "@/features/storefront/db/types";

// assets
import { lusitana } from "@/assets/fonts";

// types
interface HeaderProps {
  product: ProductWithAll;
}

export default function Header({ product: { name } }: HeaderProps) {
  return (
    <header className={styles["header"]}>
      <h2 className={lusitana.className}>{name}</h2>
    </header>
  );
}

export function HeaderSkeleton() {
  return (
    <div className={styles["header"]}>
      <div className="h-14 w-44 animate-pulse bg-background"></div>
    </div>
  );
}
