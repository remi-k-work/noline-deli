// component css styles
import styles from "./SingleProductView.module.css";

// next
import Image from "next/image";

// other libraries
import clsx from "clsx";
import { routeToProductImage } from "@/features/products/helpers";

// components
import ImageSlider from "./ImageSlider";
import BrandTag from "./BrandTag";
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

  const { id, name, description, imageUrl, price, moreImages, brand } = product;

  return (
    <article className={styles["single-product-view"]}>
      {/* Display the picture slider when there are several images for a product */}
      {moreImages.length > 0 ? (
        <ImageSlider productName={name} moreImages={[{ imageUrl }, ...moreImages]} />
      ) : (
        <Image src={routeToProductImage(imageUrl)} width={640} height={400} alt={name} className="h-96 w-auto rounded-lg object-cover" priority />
      )}
      <h2 className={clsx(lusitana.className, "text-4xl")}>{name}</h2>
      <BrandTag brand={brand} />
      <p>{description}</p>
      <PriceTag priceInCents={price} />
      <AddToCartForm productId={id} />
    </article>
  );
}
