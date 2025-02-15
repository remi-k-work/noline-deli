// component css styles
import styles from "./ProductCard.module.css";

// next
import Link from "next/link";
import Image from "next/image";

// prisma and db access
import type { Product } from "@prisma/client";

// other libraries
import { cn } from "@/lib/utils";
import PathFinder from "@/lib/PathFinder";

// components
import PriceTag from "../PriceTag";

// assets
import { lusitana } from "@/assets/fonts";
import { TruckIcon } from "@heroicons/react/24/solid";

// types
interface ProductCardProps {
  product: Product;
  listMode?: boolean;
}

export default function ProductCard({ product, listMode = false }: ProductCardProps) {
  // Ensure the product exists
  if (!product) return null;

  const { id, name, description, imageUrl, price, freeShipping, createdAt } = product;

  // A product that was introduced less than 7 days ago is deemed new
  const isNew = Date.now() - new Date(createdAt).getTime() < 1000 * 60 * 60 * 24 * 7;

  return listMode ? (
    <article className={cn(styles["product-card"], styles["product-card--list-mode"], "indicator")}>
      <Link href={PathFinder.toSfProductDetails(name, id)} className="card image-full card-side w-full bg-base-100 transition-shadow hover:shadow-xl">
        <figure className="flex-none">
          {isNew && <span className="badge indicator-item badge-secondary indicator-start z-10">NEW</span>}
          <Image src={PathFinder.toResolvedProductImage(imageUrl)} width={640} height={400} alt={name} sizes="100vw" className="max-h-72 w-full object-cover" />
          {freeShipping && (
            <span className="badge indicator-item badge-secondary indicator-center indicator-bottom z-10 flex items-center justify-center gap-2 p-3">
              <TruckIcon width={24} height={24} />
              Free Shipping
            </span>
          )}
        </figure>
        <div className="card-body">
          <h2 className={cn(lusitana.className, "card-title text-2xl")}>{name}</h2>
          <p>{description.substring(0, 250)}...</p>
          <div className="card-actions justify-end">
            <PriceTag priceInCents={price} />
          </div>
        </div>
      </Link>
    </article>
  ) : (
    <article className={cn(styles["product-card"], "indicator")}>
      <Link href={PathFinder.toSfProductDetails(name, id)} className="card card-compact w-full bg-base-100 transition-shadow hover:shadow-xl">
        <figure className="flex-none">
          {isNew && <span className="badge indicator-item badge-secondary indicator-center">NEW</span>}
          <Image
            src={PathFinder.toResolvedProductImage(imageUrl)}
            width={640}
            height={400}
            alt={name}
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="h-36 w-full object-cover"
          />
          {freeShipping && (
            <span className="badge indicator-item badge-secondary indicator-center indicator-bottom flex items-center justify-center gap-2 p-3">
              <TruckIcon width={24} height={24} />
              Free Shipping
            </span>
          )}
        </figure>
        <div className="card-body">
          <h2 className={cn(lusitana.className, "card-title text-lg")}>{name}</h2>
          <div className="card-actions justify-end">
            <PriceTag priceInCents={price} />
          </div>
        </div>
      </Link>
    </article>
  );
}

export function ProductCardSkeleton({ listMode = false }) {
  return listMode ? (
    <article className={cn(styles["product-card-skeleton"], styles["product-card-skeleton--list-mode"])}>
      <div className="card image-full card-side w-full bg-base-100 transition-shadow hover:shadow-xl">
        <figure className="flex-none">
          <div className="h-72 w-72 animate-pulse rounded-lg bg-background"></div>
        </figure>
        <div className="card-body">
          <div className="h-10 w-1/2 animate-pulse bg-background"></div>
          <div className="h-4 w-3/4 animate-pulse bg-background"></div>
          <div className="h-4 w-3/4 animate-pulse bg-background"></div>
          <div className="h-4 w-3/4 animate-pulse bg-background"></div>
          <div className="h-4 w-3/4 animate-pulse bg-background"></div>
          <div className="h-4 w-3/4 animate-pulse bg-background"></div>
          <div className="h-4 w-3/4 animate-pulse bg-background"></div>
          <div className="card-actions justify-end">
            <div className="h-4 w-1/6 animate-pulse bg-background"></div>
          </div>
        </div>
      </div>
    </article>
  ) : (
    <article className={cn(styles["product-card-skeleton"])}>
      <div className="card card-compact w-full bg-base-100 transition-shadow hover:shadow-xl">
        <figure className="flex-none">
          <div className="h-36 w-36 animate-pulse rounded-lg bg-background"></div>
        </figure>
        <div className="card-body">
          <div className="h-10 animate-pulse bg-background"></div>
          <div className="card-actions justify-end">
            <div className="h-4 w-1/6 animate-pulse bg-background"></div>
          </div>
        </div>
      </div>
    </article>
  );
}
