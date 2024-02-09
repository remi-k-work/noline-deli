// component css styles
import styles from "./ProductsList.module.css";

// prisma and db access
import prisma from "@/lib/db/prisma";

// components
import ProductCard from "../../products/components/ProductCard";

export default async function ProductsList() {
  const products = await prisma.product.findMany({ orderBy: { id: "desc" } });

  return (
    <section className={styles["products-list"]}>
      <ProductCard product={products[0]} />
    </section>
  );
}
