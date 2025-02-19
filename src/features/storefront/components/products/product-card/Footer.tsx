// component css styles
import styles from "./Footer.module.css";

// prisma and db access
import type { Product } from "@prisma/client";

// other libraries
import { cn } from "@/lib/utils";

// components
import { Button } from "@/components/ui/custom/button";
import { default as PriceTag } from "@/features/storefront/components/products/tags/Price";

// assets
import { InformationCircleIcon } from "@heroicons/react/24/outline";

// types
interface FooterProps {
  product: Product;
  isListMode?: boolean;
}

export default function Footer({ product: { price }, isListMode = false }: FooterProps) {
  return (
    <footer className={cn(styles["footer"], isListMode && styles["footer--list-mode"])}>
      <PriceTag priceInCents={price} />
      <Button type="button">
        <InformationCircleIcon width={24} height={24} />
        View Details
      </Button>
    </footer>
  );
}

export function FooterSkeleton({ isListMode = false }: Pick<FooterProps, "isListMode">) {
  return (
    <div className={cn(styles["footer"], isListMode && styles["footer--list-mode"])}>
      <div className="h-5 w-14 animate-pulse bg-background"></div>
      <div className="h-10 w-36 animate-pulse bg-background"></div>
    </div>
  );
}
