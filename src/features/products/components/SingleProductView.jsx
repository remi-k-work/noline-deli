// component css styles
import styles from "./SingleProductView.module.css";

// next
import Image from "next/image";

// other libraries
import clsx from "clsx";

// components
import PriceTag from "./PriceTag";
import AddToCartForm from "@/features/cart/components/AddToCartForm";

// assets
import { lusitana } from "@/assets/fonts";

export default function SingleProductView({ product }) {
  // Ensure the product exists
  if (!product) {
    // To prevent receiving the "cannot destructure property of undefined" exception, do not attempt to render anything
    return null;
  }

  const { id, name, description, imageUrl, price, createdAt, updatedAt } = product;

  return (
    <article className={styles["single-product-view"]}>
      <Image src={imageUrl} width={640} height={400} alt={name} className="rounded-lg" priority />
      <h3 className={clsx(lusitana.className, "text-4xl")}>{name}</h3>
      <p>{description}</p>
      <PriceTag priceInCents={price} />
      <AddToCartForm productId={id} />
    </article>
  );
}
