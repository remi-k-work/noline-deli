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
  brand: Brand;
}

export default function BrandPreview({ brand: { id, name, logoUrl } }: BrandPreviewProps) {
  return (
    <article className={styles["brand-preview"]}>
      <Link href={PathFinder.toSfProductsByBrand(name, id)} className="transition-transform delay-150 duration-700 ease-in-out hover:scale-110">
        <header>
          <Image src={PathFinder.toResolvedBrandLogo(logoUrl)} width={320} height={200} alt={name} sizes="50vw" className="object-contain" />
        </header>
        <footer>{name}</footer>
      </Link>
    </article>
  );
}

export function BrandPreviewSkeleton() {
  return (
    <div className={styles["brand-preview"]}>
      <header className="size-46 animate-pulse"></header>
      <footer>
        <div className="bg-background h-5.5 w-32 animate-pulse"></div>
      </footer>
    </div>
  );
}
