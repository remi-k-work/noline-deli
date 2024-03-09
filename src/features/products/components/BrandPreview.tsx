// component css styles
import styles from "./BrandPreview.module.css";

// next
import Link from "next/link";
import Image from "next/image";

// other libraries
import clsx from "clsx";
import { routeToBrandLogo, routeToAllProductsByBrand } from "@/features/products/helpers";
import { EyeIcon } from "@heroicons/react/24/solid";

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
      <header className={styles["brand-preview__logo"]}>
        <Image
          src={routeToBrandLogo(logoUrl)}
          fill={true}
          alt={name}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain"
        />
      </header>
      <Link href={routeToAllProductsByBrand(name, id)} className={styles["brand-preview__view-brand"]}>
        <EyeIcon width={24} height={24} />
        {name}
      </Link>
    </article>
  );
}
