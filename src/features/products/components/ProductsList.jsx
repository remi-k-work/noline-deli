// component css styles
import styles from "./ProductsList.module.css";

// prisma and db access
import { allProducts } from "@/features/products/productsDb";

// components
import ProductCard from "./ProductCard";
import NotFound from "@/components/NotFound";

export default async function ProductsList() {
  // Retrieve all of the products from an external source (database)
  const products = await allProducts();

  return (
    <section className={styles["products-list"]}>
      {products.length > 0 ? products.map((product) => <ProductCard key={product.id} product={product} />) : <NotFound message={"Products were not found!"} />}
    </section>
  );
}
