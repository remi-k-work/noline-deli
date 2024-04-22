// component css styles
import styles from "./BrandTag.module.css";

// next
import Link from "next/link";
import Image from "next/image";

// prisma and db access
import { Brand } from "@prisma/client";

// other libraries
import clsx from "clsx";
import { routeToBrandLogo, routeToAllProductsByBrand } from "@/features/products/helpers";

// types
interface BrandTagProps {
  brand: Brand | null;
  isCompact?: boolean;
}

export default function BrandTag({ brand, isCompact = false }: BrandTagProps) {
  // Ensure the brand exists
  if (!brand) {
    // To prevent receiving the "cannot destructure property of undefined" exception, do not attempt to render anything
    return null;
  }

  const { id, name, logoUrl } = brand;

  return isCompact ? (
    <section className={styles["brand-tag"]}>
      <header className={clsx(styles["brand-tag__name"], "flex-1")}>{name}</header>
      <Link href={routeToAllProductsByBrand(name, id)} className="flex-1 transition-transform delay-150 duration-700 ease-in-out hover:scale-110">
        {logoUrl && (
          <div className={styles["brand-tag__logo"]}>
            <Image src={routeToBrandLogo(logoUrl)} fill={true} alt={name} sizes="100vw" className="object-contain" />
          </div>
        )}
      </Link>
    </section>
  ) : (
    <section className={styles["brand-tag"]}>
      <header className="flex-1">Brand:</header>
      <footer className={clsx(styles["brand-tag__name"], "flex-none")}>{name}</footer>
      <Link href={routeToAllProductsByBrand(name, id)} className="flex-none transition-transform delay-150 duration-700 ease-in-out hover:scale-110">
        {logoUrl && (
          <div className={styles["brand-tag__logo"]}>
            <Image src={routeToBrandLogo(logoUrl)} fill={true} alt={name} sizes="100vw" className="object-contain" />
          </div>
        )}
      </Link>
    </section>
  );
}
