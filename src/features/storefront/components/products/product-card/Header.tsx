// component css styles
import styles from "./Header.module.css";

// prisma and db access
import type { Product } from "@prisma/client";

// other libraries
import { cn } from "@/lib/utils";

// types
interface HeaderProps {
  product: Product;
  isListMode?: boolean;
}

export default function Header({ product: { name }, isListMode = false }: HeaderProps) {
  return (
    <header className={cn(styles["header"], isListMode && styles["header--list-mode"])}>
      <h2 className="font-lusitana">{name}</h2>
    </header>
  );
}

export function HeaderSkeleton({ isListMode = false }: Pick<HeaderProps, "isListMode">) {
  return (
    <div className={cn(styles["header"], isListMode && styles["header--list-mode"])}>
      <div className="bg-background h-14 w-44 animate-pulse"></div>
    </div>
  );
}
