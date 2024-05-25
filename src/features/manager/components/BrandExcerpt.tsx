// component css styles
import styles from "./BrandExcerpt.module.css";

// next
import Image from "next/image";

// other libraries
import PathFinder from "@/features/manager/PathFinder";

// types
interface BrandExcerptProps {
  name: string;
  logoUrl: string | null;
}

export default function BrandExcerpt({ name, logoUrl }: BrandExcerptProps) {
  return (
    <article className={styles["brand-excerpt"]}>
      {logoUrl && (
        <header className={styles["brand-excerpt__logo"]}>
          <Image src={PathFinder.toResolvedBrandLogo(logoUrl)} width={320} height={200} alt={name} sizes="50vw" className="object-contain" />
        </header>
      )}
      <footer className={styles["brand-excerpt__name"]}>{name}</footer>
    </article>
  );
}
