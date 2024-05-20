// component css styles
import styles from "./ProductsTableEntry.module.css";

// next
import Link from "next/link";
import Image from "next/image";

// prisma and db access
import { ProductWithAll } from "../managerDb";

// other libraries
import clsx from "clsx";
import { formatPrice } from "@/lib/helpers";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import PathFinder from "../PathFinder";

// components
import ProductInfo from "@/features/products/components/ProductInfo";
import ProductsTableActions from "./ProductsTableActions";

// types
interface ProductsTableEntryProps {
  product: ProductWithAll;
}

export default function ProductsTableEntry({ product }: ProductsTableEntryProps) {
  // Ensure the product exists
  if (!product) {
    // To prevent receiving the "cannot destructure property of undefined" exception, do not attempt to render anything
    return null;
  }

  const {
    id,
    name,
    imageUrl,
    price,
    categories,
    subCategories,
    user: { role },
  } = product;

  return (
    <tr className={styles["products-table-entry"]}>
      <td>
        <div className={styles["products-table-entry-image"]}>
          <Link href={PathFinder.toProductEdit(id)} className={styles["products-table-entry-image__link"]}>
            <Image
              src={PathFinder.toResolvedProductImage(imageUrl)}
              width={320}
              height={200}
              alt={name}
              title={name}
              sizes="50vw"
              className="h-auto max-h-14 w-auto rounded-lg object-cover"
            />
          </Link>
          <div className={clsx(styles["products-table-entry-image__info"], "dropdown dropdown-right")}>
            <div className="lg:tooltip lg:tooltip-right" data-tip="Display all information about this product">
              <div tabIndex={0} role="button" className="btn btn-circle btn-info">
                <InformationCircleIcon width={24} height={24} />
              </div>
            </div>
            <div tabIndex={0} className={clsx(styles["products-table-entry__product-info"], "dropdown-content z-10 shadow")}>
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
        <ProductsTableActions productId={id} productName={name} productImageUrl={imageUrl} productPrice={price} usersRole={role} />
      </td>
    </tr>
  );
}
