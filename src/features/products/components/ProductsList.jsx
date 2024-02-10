// component css styles
import styles from "./ProductsList.module.css";

// prisma and db access
import prisma from "@/lib/db/prisma";

// components
import ProductCard from "./ProductCard";
import NotFound from "../../../components/NotFound";

export default async function ProductsList() {
  // const products = await prisma.product.findMany({ orderBy: { id: "desc" } });
  const products = await prisma.product.findMany({ where: { price: 9 }, orderBy: { id: "desc" } });

  return (
    <section className={styles["products-list"]}>
      {products.length > 0 ? products.map((product) => <ProductCard key={product.id} product={product} />) : <NotFound message={"Products were not found!"} />}
    </section>
  );
}
