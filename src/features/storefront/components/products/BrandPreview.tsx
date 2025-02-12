// component css styles
import styles from "./BrandPreview.module.css";

// next
import Link from "next/link";
import Image from "next/image";

// prisma and db access
import type { Brand } from "@prisma/client";

// other libraries
import PathFinder from "@/lib/PathFinder";

// types
interface BrandPreviewProps {
  brand: Brand | null;
}

export default function BrandPreview({ brand }: BrandPreviewProps) {
  // Ensure the brand exists
  if (!brand) return null;

  const { id, name, logoUrl } = brand;

  return (
    <article className={styles["brand-preview"]}>
      <Link href={PathFinder.toSfProductsByBrand(name, id)} className="transition-transform delay-150 duration-700 ease-in-out hover:scale-110">
        {logoUrl && (
          <header className={styles["brand-preview__logo"]}>
            <Image src={PathFinder.toResolvedBrandLogo(logoUrl)} width={320} height={200} alt={name} sizes="50vw" className="object-contain" />
          </header>
        )}
        <footer className={styles["brand-preview__name"]}>{name}</footer>
      </Link>
    </article>
  );
}
