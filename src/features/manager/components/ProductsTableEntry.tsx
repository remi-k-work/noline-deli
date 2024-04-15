// component css styles
import styles from "./ProductsTableEntry.module.css";

// next
import Link from "next/link";
import Image from "next/image";

// prisma and db access
import { Prisma } from "@prisma/client";

// other libraries
import clsx from "clsx";
import { formatPrice } from "@/lib/helpers";
import { routeToProductImage } from "@/features/products/helpers";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

// components
import ProductInfo from "@/features/products/components/ProductInfo";

// types
interface ProductsTableEntryProps {
  product: Prisma.ProductGetPayload<{
    include: { categories: { include: { category: true } }; subCategories: { include: { subCategory: true } }; moreImages: true; brand: true };
  }>;
}

export default function ProductsTableEntry({ product }: ProductsTableEntryProps) {
  // Ensure the product exists
  if (!product) {
    // To prevent receiving the "cannot destructure property of undefined" exception, do not attempt to render anything
    return null;
  }

  const { name, description, imageUrl, price, freeShipping, categories, subCategories, moreImages, brand } = product;

  return (
    <tr className={styles["products-table-entry"]}>
      <td className={styles["products-table-entry-image"]}>
        <Link href={"#"} className={styles["cart-table-entry-image__link"]}>
          <Image src={routeToProductImage(imageUrl)} width={640} height={400} alt={name} className="h-24 w-auto object-cover" />
        </Link>
        <details className={clsx(styles["products-table-entry-image__info"], "dropdown")}>
          <summary className="btn btn-circle btn-info">
            <InformationCircleIcon width={24} height={24} />
          </summary>
          <div className="dropdown-content z-10 w-80 shadow">
            <ProductInfo product={product} />
          </div>
        </details>
      </td>
      <td>55</td>
      <td>{formatPrice(price)}</td>
      <td>Edit | Delete</td>
    </tr>
  );
}
