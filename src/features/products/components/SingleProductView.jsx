// component css styles
import styles from "./SingleProductView.module.css";

// next
import Image from "next/image";
import { notFound } from "next/navigation";

// prisma and db access
import { getProduct } from "@/features/products/productsDb";

// other libraries
import clsx from "clsx";

// components
import PriceTag from "./PriceTag";
import AddToCartForm from "@/features/cart/components/AddToCartForm";

// assets
import { lusitana } from "@/assets/fonts";

export default async function SingleProductView({ productId }) {
  // Get all the information you need about this particular product
  const product = await getProduct(productId);

  // Ensure the product exists
  if (!product) {
    notFound();
  }

  const { id, name, description, imageUrl, price, createdAt, updatedAt } = product;

  return (
    <article className={styles["single-product-view"]}>
      <Image src={imageUrl} width={640} height={400} alt={name} className="rounded-lg" priority />
      <h3 className={clsx(lusitana.className, "text-4xl")}>{name}</h3>
      <p>{description}</p>
      <PriceTag priceInCents={price} />
      <AddToCartForm productId={productId} />
    </article>
  );
}
