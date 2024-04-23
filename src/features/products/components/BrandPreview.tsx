// component css styles
import styles from "./BrandPreview.module.css";

// next
import Link from "next/link";
import Image from "next/image";

// prisma and db access
import { Brand } from "@prisma/client";

// other libraries
import { routeToBrandLogo, routeToAllProductsByBrand } from "@/features/products/helpers";

// types
interface BrandPreviewProps {
  brand: Brand | null;
}

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
            <Image src={routeToBrandLogo(logoUrl)} width={320} height={200} alt={name} sizes="100vw" className="object-contain" />
          </header>
        )}
        <footer className={styles["brand-preview__name"]}>{name}</footer>
      </Link>
    </article>
  );
}
