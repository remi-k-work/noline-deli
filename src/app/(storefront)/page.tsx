// component css styles
import styles from "./page.module.css";

// next
import Image from "next/image";
import Link from "next/link";

// prisma and db access
import dashboard from "@/features/storefront/db/get-data-for/dashboard";

// other libraries
import { cn } from "@/lib/utils";
import PathFinder from "@/lib/PathFinder";

// components
import MainLayout from "@/features/storefront/components/MainLayout";
import ProductExcerpt from "@/features/storefront/components/products/ProductExcerpt";
import BrandPreview from "@/features/storefront/components/products/BrandPreview";

// assets
import { lusitana } from "@/assets/fonts";
import hero from "@/assets/hero.jpg";
import bannerManager from "@/assets/manager/banner-manager.webp";

export default async function Page() {
  // Collect all of the necessary data for our dashboard (like featured products and brands)
  const { featuredProducts, featuredBrands, totalProducts, totalBrands } = await dashboard();

  return (
    <MainLayout>
      <article className={styles["page"]}>
        <article className={styles["dashboard"]}>
          <h4 className={cn(lusitana.className, "text-xl")}>Try our Manager Feature!</h4>
          <section className={styles["dashboard__manager"]}>
            <Link href={PathFinder.toManagerHome()} target="_blank" className="hero sepia hover:sepia-0">
              <div className="hero-overlay">
                <Image src={bannerManager} alt={"Try our Manager Feature!"} className="h-48 w-full object-cover" priority />
              </div>
              <div className="hero-content">
                <p className={cn(lusitana.className, "p-2 text-center text-xl text-neutral-content backdrop-brightness-50 backdrop-grayscale lg:text-2xl")}>
                  Add, edit, and manage products, categories, brands, and images with ease
                </p>
              </div>
            </Link>
          </section>
        </article>
        <br />
        <br />
        <h1 className={cn(lusitana.className, "mb-8 text-xl lg:text-3xl")}>Taste of Home, Delivered since 1992</h1>
        <header className={styles["hero"]}>
          <Image src={hero} alt={"Hero"} />
          <p>
            Welcome to NoLine-Deli, an organic, healthy European food store that respects your time and is a place where you will never experience standing in
            long lines. We will deliver goods directly to your home. We also have another goal besides making it convenient for you. We want to introduce fresh,
            healthy, organic, and high-quality European products to you, no matter which part of the United States you are located in. If you have Central
            European roots or happen to visit here, we want to bring you some of your favorite foods and memories and make you feel like you are in your
            hometown. We treat each client individually. In our offer, you will find products that are specific to Poland, famous for sausage, pierogis,
            kielbasa, and kiszka. However, we constantly expand our merchandise and are open to your suggestions. Our organic healthy food store has a goal to
            deliver any item you ask for from the variety we have to offer: breads, coffees, desserts, baking, dry goods, sauces, snacks, soups, spices, sweets,
            teas, and more. In case you have individual needs that go beyond the list of our items, please let us know, and we will try to find them for you. If
            you are creating a party and need some advice about the menu, we might help as well.
          </p>
        </header>
        <article className={styles["dashboard"]}>
          <h4 className={cn(lusitana.className, "text-xl")}>Featured Products</h4>
          <section className={styles["dashboard__featured-products"]}>
            {featuredProducts.map((featuredProduct) => (
              <ProductExcerpt key={featuredProduct.id} kind="regular" product={featuredProduct} />
            ))}
          </section>

          <h4 className={cn(lusitana.className, "text-xl")}>Featured Brands</h4>
          <section className={styles["dashboard__featured-brands"]}>
            {featuredBrands.map((featuredBrand) => (
              <BrandPreview key={featuredBrand.id} brand={featuredBrand} />
            ))}
          </section>

          <article className={styles["dashboard__totals"]}>
            <section className={styles["dashboard-totals__total-products"]}>
              <h4 className={cn(lusitana.className, "text-xl")}>Total Products</h4>
              <h5>{totalProducts}</h5>
            </section>

            <section className={styles["dashboard-totals__total-brands"]}>
              <h4 className={cn(lusitana.className, "text-xl")}>Total Brands</h4>
              <h5>{totalBrands}</h5>
            </section>
          </article>
        </article>
      </article>
    </MainLayout>
  );
}
