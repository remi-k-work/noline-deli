// component css styles
import styles from "./ProductCard.module.css";

// next
import Link from "next/link";
import Image from "next/image";

// other libraries
import clsx from "clsx";
import { routeToProductDetails, routeToProductImage } from "@/features/products/helpers";

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

  const { id, name, description, imageUrl, price, createdAt } = product;

  // A product that was introduced less than 7 days ago is deemed new
  const isNew = Date.now() - new Date(createdAt).getTime() < 1000 * 60 * 60 * 24 * 7;

  return listMode ? (
    <article className={clsx(styles["product-card"], styles["product-card--list-mode"], "indicator")}>
      <Link href={routeToProductDetails(name, id)} className="card card-side w-full bg-base-100 transition-shadow hover:shadow-xl">
        <figure className="flex-none">
          {isNew && <span className="badge indicator-item badge-secondary indicator-start">NEW</span>}
          <Image src={routeToProductImage(imageUrl)} width={640} height={400} alt={name} className="h-auto w-72 object-cover" />
        </figure>
        <div className="card-body">
          <h3 className={clsx(lusitana.className, "card-title text-2xl")}>{name}</h3>
          <p>{description.substring(0, 150)}...</p>
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
        </figure>
        <div className="card-body">
          <h3 className={clsx(lusitana.className, "card-title text-lg")}>{name}</h3>
          <div className="card-actions justify-end">
            <PriceTag priceInCents={price} />
          </div>
        </div>
      </Link>
    </article>
  );
}
