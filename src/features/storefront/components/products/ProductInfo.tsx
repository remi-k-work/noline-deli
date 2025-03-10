// component css styles
import styles from "./ProductInfo.module.css";

// next
import Image from "next/image";

// prisma and db access
import type { ProductWithAll } from "@/features/storefront/db/types";

// other libraries
import PathFinder from "@/lib/PathFinder";

// components
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/custom/table";
import { default as PriceTag } from "@/features/storefront/components/products/tags/Price";
import { default as BrandTag } from "@/features/storefront/components/products/tags/Brand";
import { default as FreeShippingTag } from "@/features/storefront/components/products/tags/FreeShipping";

// types
interface ProductInfoProps {
  product: ProductWithAll;
}

export default function ProductInfo({ product, product: { name, description, imageUrl, price } }: ProductInfoProps) {
  return (
    <Table className={styles["product-info"]}>
      <TableHeader className="font-lusitana">
        <TableRow>
          <TableHead className="w-[50%]">Name</TableHead>
          <TableHead className="w-[50%] text-end">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="bg-surface-3">
          <TableCell>{name}</TableCell>
          <TableCell className="text-end">
            <PriceTag priceInCents={price} />
          </TableCell>
        </TableRow>
        <TableRow className="font-lusitana">
          <TableHead colSpan={2}>Image</TableHead>
        </TableRow>
        <TableRow className="bg-surface-3">
          <TableCell colSpan={2}>
            <Image
              src={PathFinder.toResolvedProductImage(imageUrl)}
              width={640}
              height={400}
              alt={name}
              sizes="50vw"
              className="m-auto h-72 w-auto object-contain"
            />
          </TableCell>
        </TableRow>
        <CategoryAndSubCategory product={product} />
        <Brand product={product} />
        <MoreImages product={product} />
        <TableRow className="font-lusitana">
          <TableHead colSpan={2}>Description</TableHead>
        </TableRow>
        <TableRow className="bg-surface-3">
          <TableCell colSpan={2}>
            <p className="m-auto">{description}</p>
          </TableCell>
        </TableRow>
        <OtherInfo product={product} />
      </TableBody>
    </Table>
  );
}

function CategoryAndSubCategory({ product: { categories, subCategories } }: ProductInfoProps) {
  return (
    (categories.length > 0 || subCategories.length > 0) && (
      <>
        <TableRow className="font-lusitana">
          <TableHead>Category</TableHead>
          <TableHead className="text-end">SubCategory</TableHead>
        </TableRow>
        <TableRow className="bg-surface-3">
          <TableCell>
            <ul>
              {categories.map(({ category: { id, name } }) => (
                <li key={id}>{name}</li>
              ))}
            </ul>
          </TableCell>
          <TableCell className="text-end">
            <ul>
              {subCategories.map(({ subCategory: { id, name } }) => (
                <li key={id}>{name}</li>
              ))}
            </ul>
          </TableCell>
        </TableRow>
      </>
    )
  );
}

function Brand({ product: { brand } }: ProductInfoProps) {
  return (
    brand && (
      <>
        <TableRow className="font-lusitana">
          <TableHead colSpan={2}>Brand</TableHead>
        </TableRow>
        <TableRow className="bg-surface-3">
          <TableCell colSpan={2}>
            <BrandTag kind="product" brand={brand} isCompact={true} />
          </TableCell>
        </TableRow>
      </>
    )
  );
}

function MoreImages({ product: { name, moreImages } }: ProductInfoProps) {
  return (
    moreImages.length > 0 && (
      <>
        <TableRow className="font-lusitana">
          <TableHead colSpan={2}>More Images</TableHead>
        </TableRow>
        <TableRow className="bg-surface-3">
          <TableCell colSpan={2} className="overflow-x-auto">
            <div className="flex gap-4">
              {moreImages.map(({ id, imageUrl }) => (
                <Image
                  key={id}
                  src={PathFinder.toResolvedProductImage(imageUrl)}
                  width={640}
                  height={400}
                  alt={name}
                  sizes="50vw"
                  className="h-36 w-auto object-contain"
                />
              ))}
            </div>
          </TableCell>
        </TableRow>
      </>
    )
  );
}

function OtherInfo({ product: { freeShipping } }: ProductInfoProps) {
  return (
    freeShipping && (
      <>
        <TableRow className="font-lusitana">
          <TableHead colSpan={2}>Other Info</TableHead>
        </TableRow>
        <TableRow className="bg-surface-3">
          <TableCell colSpan={2}>
            <FreeShippingTag />
          </TableCell>
        </TableRow>
      </>
    )
  );
}
