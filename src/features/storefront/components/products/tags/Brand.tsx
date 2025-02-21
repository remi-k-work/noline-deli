// component css styles
import styles from "./Brand.module.css";

// next
import Link from "next/link";
import Image from "next/image";

// prisma and db access
import type { Brand } from "@prisma/client";

// other libraries
import PathFinder from "@/lib/PathFinder";

// types
interface Product {
  kind: "product";
  brand: Brand | null;
  isCompact?: boolean;
}

interface OrdItem {
  kind: "orditem";
  name: string;
  logoUrl: string | null;
}

type BrandProps = Product | OrdItem;

export default function Brand(props: BrandProps) {
  if (props.kind === "product") {
    const { brand, isCompact } = props;

    // Ensure the brand exists
    if (!brand) return null;

    const { id, name, logoUrl } = brand;

    return isCompact ? (
      <section className={styles["brand"]}>
        <header className={styles["brand__name"]}>{name}</header>
        {logoUrl && (
          <Link href={PathFinder.toSfProductsByBrand(name, id)} className="flex-none transition-transform delay-150 duration-700 ease-in-out hover:scale-110">
            <Image src={PathFinder.toResolvedBrandLogo(logoUrl)} width={320} height={200} alt={name} sizes="50vw" className="max-h-16 w-auto object-contain" />
          </Link>
        )}
      </section>
    ) : (
      <section className={styles["brand"]}>
        <header>Brand:</header>
        <footer className={styles["brand__name"]}>{name}</footer>
        {logoUrl && (
          <Link href={PathFinder.toSfProductsByBrand(name, id)} className="flex-none transition-transform delay-150 duration-700 ease-in-out hover:scale-110">
            <Image src={PathFinder.toResolvedBrandLogo(logoUrl)} width={320} height={200} alt={name} sizes="50vw" className="max-h-16 w-auto object-contain" />
          </Link>
        )}
      </section>
    );
  } else {
    const { name, logoUrl } = props;

    return (
      <section className={styles["brand"]}>
        <header className={styles["brand__name"]}>{name}</header>
        {logoUrl && (
          <Image src={PathFinder.toResolvedBrandLogo(logoUrl)} width={320} height={200} alt={name} sizes="50vw" className="max-h-16 w-auto object-contain" />
        )}
      </section>
    );
  }
}
