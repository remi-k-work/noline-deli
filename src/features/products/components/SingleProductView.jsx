// component css styles
import styles from "./SingleProductView.module.css";

// next
import Link from "next/link";
import Image from "next/image";

// prisma and db access
import prisma from "@/lib/db/prisma";

// other libraries
import clsx from "clsx";

// components
import NotFound from "@/components/NotFound";
import PriceTag from "./PriceTag";

// assets
import { lusitana } from "@/assets/fonts";

export default async function SingleProductView({ productId }) {
  // Get all the information you need about this particular product
  const product = await prisma.product.findUnique({ where: { id: productId } });

  // Ensure the product exists
  if (!product) {
    return <NotFound message={"Product not found!"} />;
  }

  const { id, name, description, imageUrl, price, createdAt, updatedAt } = product;

  return (
    <article className={styles["single-product-view"]}>
      <Image src={imageUrl} width={640} height={400} alt={name} className="rounded-lg" priority />
      <h3 className={clsx(lusitana.className, "text-4xl")}>{name}</h3>
      <p>{description}</p>
      <PriceTag priceInCents={price} />
    </article>
  );
}
