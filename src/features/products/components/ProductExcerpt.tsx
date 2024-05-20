// component css styles
import styles from "./ProductExcerpt.module.css";

// next
import Link from "next/link";
import Image from "next/image";

// prisma and db access
import { Prisma } from "@prisma/client";

// other libraries
import clsx from "clsx";
import { formatPrice } from "@/lib/helpers";
import { routeToProductDetails } from "@/features/products/helpers";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import PathFinder from "@/features/manager/PathFinder";

// components
import ProductInfo from "./ProductInfo";

// types
interface ProductExcerptProps {
  product: Prisma.ProductGetPayload<{
    include: { categories: { include: { category: true } }; subCategories: { include: { subCategory: true } }; moreImages: true; brand: true };
  }>;
}

export default function ProductExcerpt({ product }: ProductExcerptProps) {
  // Ensure the product exists
  if (!product) {
    // To prevent receiving the "cannot destructure property of undefined" exception, do not attempt to render anything
    return null;
  }

  const { id, name, imageUrl, price } = product;

  return (
    <article className={styles["product-excerpt"]}>
      <div className={styles["product-excerpt__background"]}></div>
      <Link
        href={routeToProductDetails(name, id)}
        className={clsx(styles["product-excerpt__image"], "z-10 transition-transform delay-150 duration-700 ease-in-out hover:translate-x-2")}
      >
        <Image src={PathFinder.toResolvedProductImage(imageUrl)} width={640} height={400} alt={name} sizes="100vw" className="h-36 w-auto object-cover" />
      </Link>
      <div className={clsx(styles["product-excerpt__price"], "z-10")}>{formatPrice(price)}</div>
      <h2 className={clsx(styles["product-excerpt__name"], "z-10")}>{name}</h2>
      <div className={clsx(styles["product-excerpt__more-info"], "collapse collapse-plus")}>
        <input type="checkbox" name="moreInfo" />
        <div className="collapse-title text-end text-2xl">
          <button type="button" className="btn btn-circle btn-info">
            <InformationCircleIcon width={24} height={24} />
          </button>
        </div>
        <div className="collapse-content z-20">
          <ProductInfo product={product} />
        </div>
      </div>
    </article>
  );
}
