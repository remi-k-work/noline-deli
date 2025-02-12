// component css styles
import styles from "./BrandTag.module.css";

// next
import Link from "next/link";
import Image from "next/image";

// prisma and db access
import type { Brand } from "@prisma/client";

// other libraries
import PathFinder from "@/lib/PathFinder";

// types
interface BrandTagProps {
  brand: Brand | null;
  isCompact?: boolean;
}

export default function BrandTag({ brand, isCompact = false }: BrandTagProps) {
  // Ensure the brand exists
  if (!brand) return null;

  const { id, name, logoUrl } = brand;

  return isCompact ? (
    <section className={styles["brand-tag"]}>
      <header className={styles["brand-tag__name"]}>{name}</header>
      {logoUrl && (
        <Link href={PathFinder.toSfProductsByBrand(name, id)} className="flex-none transition-transform delay-150 duration-700 ease-in-out hover:scale-110">
          <Image src={PathFinder.toResolvedBrandLogo(logoUrl)} width={320} height={200} alt={name} sizes="50vw" className="max-h-16 w-auto object-contain" />
        </Link>
      )}
    </section>
  ) : (
    <section className={styles["brand-tag"]}>
      <header>Brand:</header>
      <footer className={styles["brand-tag__name"]}>{name}</footer>
      {logoUrl && (
        <Link href={PathFinder.toSfProductsByBrand(name, id)} className="flex-none transition-transform delay-150 duration-700 ease-in-out hover:scale-110">
          <Image src={PathFinder.toResolvedBrandLogo(logoUrl)} width={320} height={200} alt={name} sizes="50vw" className="max-h-16 w-auto object-contain" />
        </Link>
      )}
    </section>
  );
}
