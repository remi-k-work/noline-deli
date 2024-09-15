// component css styles
import styles from "./BrandTag.module.css";

// next
import Image from "next/image";

// other libraries
import PathFinder from "@/features/manager/PathFinder";

// types
interface BrandTagProps {
  brandName: string;
  brandLogo: string | null;
}

export default function BrandTag({ brandName, brandLogo }: BrandTagProps) {
  return (
    <section className={styles["brand-tag"]}>
      <header className={styles["brand-tag__name"]}>{brandName}</header>
      {brandLogo && (
        <Image
          src={PathFinder.toResolvedBrandLogo(brandLogo)}
          width={320}
          height={200}
          alt={brandName}
          sizes="50vw"
          className="max-h-16 w-auto object-contain"
        />
      )}
    </section>
  );
}
