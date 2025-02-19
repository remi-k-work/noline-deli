// component css styles
import styles from "./Figure.module.css";

// next
import Image from "next/image";

// prisma and db access
import type { Product } from "@prisma/client";

// other libraries
import { cn } from "@/lib/utils";
import PathFinder from "@/lib/PathFinder";

// types
interface FigureProps {
  product: Product;
  isListMode?: boolean;
}

export default function Figure({ product: { name, imageUrl }, isListMode = false }: FigureProps) {
  return (
    <figure className={cn(styles["figure"], isListMode && styles["figure--list-mode"])}>
      <Image
        src={PathFinder.toResolvedProductImage(imageUrl)}
        width={640}
        height={400}
        alt={name}
        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
      />
    </figure>
  );
}

export function FigureSkeleton({ isListMode = false }: Pick<FigureProps, "isListMode">) {
  return (
    <div className={cn(styles["figure-skeleton"], isListMode && styles["figure-skeleton--list-mode"])}>
      <div className="animate-pulse bg-background"></div>
    </div>
  );
}
