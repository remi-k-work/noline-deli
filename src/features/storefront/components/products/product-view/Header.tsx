// component css styles
import styles from "./Header.module.css";

// prisma and db access
import type { ProductWithAll } from "@/features/storefront/db/types";

// types
interface HeaderProps {
  product: ProductWithAll;
}

export default function Header({ product: { name } }: HeaderProps) {
  return (
    <header className={styles["header"]}>
      <h2 className="font-lusitana">{name}</h2>
    </header>
  );
}

export function HeaderSkeleton() {
  return (
    <div className={styles["header"]}>
      <div className="bg-background h-14 w-44 animate-pulse"></div>
    </div>
  );
}
