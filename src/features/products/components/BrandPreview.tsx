// component css styles
import styles from "./BrandPreview.module.css";

// next
import Link from "next/link";
import Image from "next/image";

// other libraries
import clsx from "clsx";
import { routeToBrandLogo, routeToAllProductsByBrand } from "@/features/products/helpers";

// types
import { BrandPreviewProps } from "../../../../types";

export default function BrandPreview({ brand }: BrandPreviewProps) {
  // Ensure the brand exists
  if (!brand) {
    // To prevent receiving the "cannot destructure property of undefined" exception, do not attempt to render anything
    return null;
  }

  const { id, name, logoUrl } = brand;

  return (
    <article className={styles["brand-preview"]}>
      <Link href={routeToAllProductsByBrand(name, id)} className="transition-transform delay-150 duration-700 ease-in-out hover:scale-110">
        {logoUrl && (
          <header className={styles["brand-preview__logo"]}>
            <Image
              src={routeToBrandLogo(logoUrl)}
              fill={true}
              alt={name}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain"
            />
          </header>
        )}
        <footer className={styles["brand-preview__name"]}>{name}</footer>
      </Link>
    </article>
  );
}
