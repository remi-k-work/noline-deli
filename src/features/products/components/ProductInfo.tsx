// component css styles
import styles from "./ProductInfo.module.css";

// next
import Image from "next/image";

// prisma and db access
import { ProductWithAll } from "@/features/products/db/types";

// other libraries
import PathFinder from "@/lib/PathFinder";

// components
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PriceTag from "./PriceTag";
import BrandTag from "./BrandTag";

// assets
import { lusitana } from "@/assets/fonts";
import { TruckIcon } from "@heroicons/react/24/solid";

// types
interface ProductInfoProps {
  product: ProductWithAll;
}

interface CategoryAndSubCategoryProps {
  categories: ProductWithAll["categories"];
  subCategories: ProductWithAll["subCategories"];
}

interface BrandProps {
  brand: ProductWithAll["brand"];
}

interface MoreImagesProps {
  name: ProductWithAll["name"];
  moreImages: ProductWithAll["moreImages"];
}

interface OtherInfoProps {
  freeShipping: ProductWithAll["freeShipping"];
}

export default function ProductInfo({ product }: ProductInfoProps) {
  // Ensure the product exists
  if (!product) {
    // To prevent receiving the "cannot destructure property of undefined" exception, do not attempt to render anything
    return null;
  }

  const { name, description, imageUrl, price, freeShipping, categories, subCategories, moreImages, brand } = product;

  return (
    <Table className={styles["product-info"]}>
      <TableHeader className={lusitana.className}>
        <TableRow>
          <TableHead className="w-[50%]">Name</TableHead>
          <TableHead className="w-[50%] text-end">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="bg-[--surface-3]">
          <TableCell>{name}</TableCell>
          <TableCell className="text-end">
            <PriceTag priceInCents={price} />
          </TableCell>
        </TableRow>
        <TableRow className={lusitana.className}>
          <TableHead colSpan={2}>Image</TableHead>
        </TableRow>
        <TableRow className="bg-[--surface-3]">
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
        <CategoryAndSubCategory categories={categories} subCategories={subCategories} />
        <Brand brand={brand} />
        <MoreImages name={name} moreImages={moreImages} />
        <TableRow className={lusitana.className}>
          <TableHead colSpan={2}>Description</TableHead>
        </TableRow>
        <TableRow className="bg-[--surface-3]">
          <TableCell colSpan={2}>
            <p className="m-auto">{description}</p>
          </TableCell>
        </TableRow>
        <OtherInfo freeShipping={freeShipping} />
      </TableBody>
    </Table>
  );
}

function CategoryAndSubCategory({ categories, subCategories }: CategoryAndSubCategoryProps) {
  return (
    (categories.length > 0 || subCategories.length > 0) && (
      <>
        <TableRow className={lusitana.className}>
          <TableHead>Category</TableHead>
          <TableHead className="text-end">SubCategory</TableHead>
        </TableRow>
        <TableRow className="bg-[--surface-3]">
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

function Brand({ brand }: BrandProps) {
  return (
    brand && (
      <>
        <TableRow className={lusitana.className}>
          <TableHead colSpan={2}>Brand</TableHead>
        </TableRow>
        <TableRow className="bg-[--surface-3]">
          <TableCell colSpan={2}>
            <BrandTag brand={brand} isCompact={true} />
          </TableCell>
        </TableRow>
      </>
    )
  );
}

function MoreImages({ name, moreImages }: MoreImagesProps) {
  return (
    moreImages.length > 0 && (
      <>
        <TableRow className={lusitana.className}>
          <TableHead colSpan={2}>More Images</TableHead>
        </TableRow>
        <TableRow className="bg-[--surface-3]">
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

function OtherInfo({ freeShipping }: OtherInfoProps) {
  return (
    freeShipping && (
      <>
        <TableRow className={lusitana.className}>
          <TableHead colSpan={2}>Other Info</TableHead>
        </TableRow>
        <TableRow className="bg-[--surface-3]">
          <TableCell colSpan={2}>
            <span className="flex items-center justify-center gap-2 p-3 text-info">
              <TruckIcon width={24} height={24} />
              Free Shipping
            </span>
          </TableCell>
        </TableRow>
      </>
    )
  );
}
