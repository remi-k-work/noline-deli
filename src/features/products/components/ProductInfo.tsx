// component css styles
import styles from "./ProductInfo.module.css";

// next
import Image from "next/image";

// prisma and db access
import { Prisma } from "@prisma/client";

// other libraries
import clsx from "clsx";
import { routeToProductImage } from "@/features/products/helpers";
import { TruckIcon } from "@heroicons/react/24/solid";

// components
import PriceTag from "./PriceTag";
import BrandTag from "./BrandTag";

// assets
import { lusitana } from "@/assets/fonts";

// types
interface ProductInfoProps {
  product: Prisma.ProductGetPayload<{
    include: { categories: { include: { category: true } }; subCategories: { include: { subCategory: true } }; moreImages: true; brand: true };
  }>;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  // Ensure the product exists
  if (!product) {
    // To prevent receiving the "cannot destructure property of undefined" exception, do not attempt to render anything
    return null;
  }

  const { name, description, price, freeShipping, categories, subCategories, moreImages, brand } = product;

  return (
    <table className={styles["product-info"]}>
      <thead className={clsx(lusitana.className)}>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="text-start">
            <h2>{name}</h2>
          </td>
          <td className="text-end">
            <PriceTag priceInCents={price} />
          </td>
        </tr>
        {(categories.length > 0 || subCategories.length > 0) && (
          <>
            <tr className={clsx(lusitana.className)}>
              <th>Category</th>
              <th>Subcategory</th>
            </tr>
            <tr>
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
            </tr>
          </>
        )}
        {brand && (
          <>
            <tr className={clsx(lusitana.className)}>
              <th colSpan={2}>Brand</th>
            </tr>
            <tr>
              <td colSpan={2}>
                <BrandTag brand={brand} isCompact={true} />
              </td>
            </tr>
          </>
        )}
        {moreImages.length > 0 && (
          <>
            <tr className={clsx(lusitana.className)}>
              <th colSpan={2}>More Images</th>
            </tr>
            <tr>
              <td colSpan={2} className="overflow-x-auto">
                <div className="flex gap-4">
                  {moreImages.map(({ id, imageUrl }) => (
                    <Image key={id} src={routeToProductImage(imageUrl)} width={640} height={400} alt={name} className="h-36 w-auto object-cover" />
                  ))}
                </div>
              </td>
            </tr>
          </>
        )}
        <tr className={clsx(lusitana.className)}>
          <th colSpan={2}>Description</th>
        </tr>
        <tr>
          <td colSpan={2} className="text-start">
            <p>{description}</p>
          </td>
        </tr>
        {freeShipping && (
          <>
            <tr className={clsx(lusitana.className)}>
              <th colSpan={2}>Other Info</th>
            </tr>
            <tr>
              <td colSpan={2}>
                <span className="flex items-center justify-center gap-2 p-3 text-info">
                  <TruckIcon width={24} height={24} />
                  Free Shipping
                </span>
              </td>
            </tr>
          </>
        )}
      </tbody>
    </table>
  );
}
