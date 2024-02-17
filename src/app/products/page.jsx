// component css styles
import styles from "./page.module.css";

// prisma and db access
import { allProducts } from "@/features/products/productsDb";

// components
import ProductsList from "@/features/products/components/ProductsList";
import NotFound from "@/components/NotFound";

export default async function Page() {
  // Retrieve all of the products from an external source (database)
  const products = await allProducts();

  return (
    <article className={styles["page"]}>
      {products.length > 0 ? <ProductsList products={products} /> : <NotFound message={"Products were not found!"} />}
    </article>
  );
}
