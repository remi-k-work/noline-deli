// component css styles
import styles from "./ProductCard.module.css";

// next
import Link from "next/link";
import Image from "next/image";

// other libraries
import clsx from "clsx";
import { routeToProductDetails, routeToProductImage } from "@/features/products/helpers";
import { TruckIcon } from "@heroicons/react/24/solid";

// components
import PriceTag from "./PriceTag";

// assets
import { lusitana } from "@/assets/fonts";

export default function ProductCard({ product, listMode = false }) {
  // Ensure the product exists
  if (!product) {
    // To prevent receiving the "cannot destructure property of undefined" exception, do not attempt to render anything
    return null;
  }

  const { id, name, description, imageUrl, price, freeShipping, createdAt } = product;

  // A product that was introduced less than 7 days ago is deemed new
  const isNew = Date.now() - new Date(createdAt).getTime() < 1000 * 60 * 60 * 24 * 7;

  return listMode ? (
    <article className={clsx(styles["product-card"], styles["product-card--list-mode"], "indicator")}>
      <Link href={routeToProductDetails(name, id)} className="card image-full card-side w-full bg-base-100 transition-shadow hover:shadow-xl">
        <figure className="flex-none">
          {isNew && <span className="badge indicator-item badge-secondary indicator-start z-10">NEW</span>}
          <Image src={routeToProductImage(imageUrl)} width={640} height={400} alt={name} className="h-auto w-72 object-cover" />
          {freeShipping && (
            <span className="badge indicator-item badge-secondary indicator-center indicator-bottom z-10 flex items-center justify-center gap-2 p-3">
              <TruckIcon width={24} height={24} />
              Free Shipping
            </span>
          )}
        </figure>
        <div className="card-body">
          <h2 className={clsx(lusitana.className, "card-title text-2xl")}>{name}</h2>
          <p>{description.substring(0, 250)}...</p>
          <div className="card-actions justify-end">
            <PriceTag priceInCents={price} />
          </div>
        </div>
      </Link>
    </article>
  ) : (
    <article className={clsx(styles["product-card"], "indicator")}>
      <Link href={routeToProductDetails(name, id)} className="card card-compact w-full bg-base-100 transition-shadow hover:shadow-xl">
        <figure className="flex-none">
          {isNew && <span className="badge indicator-item badge-secondary indicator-center">NEW</span>}
          <Image src={routeToProductImage(imageUrl)} width={640} height={400} alt={name} className="h-36 w-auto object-cover" />
          {freeShipping && (
            <span className="badge indicator-item badge-secondary indicator-center indicator-bottom flex items-center justify-center gap-2 p-3">
              <TruckIcon width={24} height={24} />
              Free Shipping
            </span>
          )}
        </figure>
        <div className="card-body">
          <h2 className={clsx(lusitana.className, "card-title text-lg")}>{name}</h2>
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
    <article className={clsx(styles["product-card-skeleton"], styles["product-card-skeleton--list-mode"])}>
      <div className="card image-full card-side w-full bg-base-100 transition-shadow hover:shadow-xl">
        <figure className="flex-none">
          <div className="skeleton h-72 w-72 rounded-lg"></div>
        </figure>
        <div className="card-body">
          <div className="skeleton h-10 w-1/2"></div>
          <div className="skeleton h-4 w-3/4"></div>
          <div className="skeleton h-4 w-3/4"></div>
          <div className="skeleton h-4 w-3/4"></div>
          <div className="skeleton h-4 w-3/4"></div>
          <div className="skeleton h-4 w-3/4"></div>
          <div className="skeleton h-4 w-3/4"></div>
          <div className="card-actions justify-end">
            <div className="skeleton h-4 w-1/6"></div>
          </div>
        </div>
      </div>
    </article>
  ) : (
    <article className={clsx(styles["product-card-skeleton"])}>
      <div className="card card-compact w-full bg-base-100 transition-shadow hover:shadow-xl">
        <figure className="flex-none">
          <div className="skeleton h-36 w-36 rounded-lg"></div>
        </figure>
        <div className="card-body">
          <div className="skeleton h-10"></div>
          <div className="card-actions justify-end">
            <div className="skeleton h-4 w-1/6"></div>
          </div>
        </div>
      </div>
    </article>
  );
}
