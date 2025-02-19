// component css styles
import styles from "./Content.module.css";

// prisma and db access
import type { Product } from "@prisma/client";

// types
interface ContentProps {
  product: Product;
  isListMode?: boolean;
}

export default function Content({ product: { description }, isListMode = false }: ContentProps) {
  return (
    <article className={styles["content"]}>
      {isListMode ? <p className="text-justify">{description}</p> : <p className="line-clamp-6 text-center">{description}</p>}
    </article>
  );
}

export function ContentSkeleton({ isListMode = false }: Pick<ContentProps, "isListMode">) {
  return (
    <div className={styles["content"]}>
      {isListMode ? <div className="h-48 animate-pulse bg-background"></div> : <div className="h-32 animate-pulse bg-background"></div>}
    </div>
  );
}
