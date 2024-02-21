// component css styles
import styles from "./ProductCard.module.css";

// next
import Link from "next/link";
import Image from "next/image";

// other libraries
import clsx from "clsx";

// components
import PriceTag from "./PriceTag";

// assets
import { lusitana } from "@/assets/fonts";

export default function ProductCard({ product }) {
  // Ensure the product exists
  if (!product) {
    // To prevent receiving the "cannot destructure property of undefined" exception, do not attempt to render anything
    return null;
  }

  const { id, name, description, imageUrl, price, createdAt } = product;

  // A product that was introduced less than 7 days ago is deemed new
  const isNew = Date.now() - new Date(createdAt).getTime() < 1000 * 60 * 60 * 24 * 7;

  return (
    <article className={styles["product-card"]}>
      <Link href={`/products/${id}`} className="card w-full bg-base-100 transition-shadow hover:shadow-xl">
        <figure>
          <Image src={imageUrl} width={640} height={400} alt={name} className="w-auto object-cover" />
        </figure>
        <div className="card-body">
          <h3 className={clsx(lusitana.className, "card-title text-3xl")}>{name}</h3>
          {isNew && <div className="badge badge-secondary">NEW</div>}
          <p>{description}</p>
          <PriceTag priceInCents={price} />
        </div>
      </Link>
    </article>
  );
}
