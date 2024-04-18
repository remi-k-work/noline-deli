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
import ProductsTableActions from "./ProductsTableActions";

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

  const { name, imageUrl, price, categories, subCategories } = product;

  return (
    <tr className={styles["products-table-entry"]}>
      <td>
        <div className={styles["products-table-entry-image"]}>
          <Link href={"#"} className={styles["products-table-entry-image__link"]}>
            <Image src={routeToProductImage(imageUrl)} width={640} height={400} alt={name} title={name} className="h-12 w-auto object-cover" />
          </Link>
          <div className={clsx(styles["products-table-entry-image__info"], "dropdown dropdown-right")}>
            <div tabIndex={0} role="button" className="btn btn-circle btn-info">
              <InformationCircleIcon width={24} height={24} />
            </div>
            <div tabIndex={0} className="dropdown-content z-10 w-80 shadow">
              <ProductInfo product={product} />
            </div>
          </div>
        </div>
      </td>
      <td>{name}</td>
      <td>
        <ul>
          {categories.map(({ category: { id, name } }) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
      </td>
      <td>
        <ul>
          {subCategories.map(({ subCategory: { id, name } }) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
      </td>
      <td>{formatPrice(price)}</td>
      <td>
        <ProductsTableActions />
      </td>
    </tr>
  );
}
