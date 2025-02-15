// component css styles
import styles from "./OrderedItemInfo.module.css";

// next
import Image from "next/image";

// prisma and db access
import type { OrderedItem } from "@prisma/client";

// other libraries
import PathFinder from "@/lib/PathFinder";

// components
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/custom/table";
import PriceTag from "@/features/storefront/components/products/PriceTag";
import BrandTag from "./BrandTag";

// assets
import { lusitana } from "@/assets/fonts";

// types
interface OrderedItemInfoProps {
  orderedItem: OrderedItem;
}

interface CategoryAndSubCategoryProps {
  categoryName: string;
  subCategoryName: string | null;
}

interface BrandProps {
  brandName: string;
  brandLogo: string | null;
}

export default function OrderedItemInfo({ orderedItem }: OrderedItemInfoProps) {
  // Ensure the ordered item exists
  if (!orderedItem) return null;

  const { name, description, imageUrl, price, brandName, brandLogo, categoryName, subCategoryName } = orderedItem;

  return (
    <Table className={styles["ordered-item-info"]}>
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
        <CategoryAndSubCategory categoryName={categoryName} subCategoryName={subCategoryName} />
        <Brand brandName={brandName} brandLogo={brandLogo} />
        <TableRow className={lusitana.className}>
          <TableHead colSpan={2}>Description</TableHead>
        </TableRow>
        <TableRow className="bg-[--surface-3]">
          <TableCell colSpan={2}>
            <p className="m-auto">{description}</p>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

function CategoryAndSubCategory({ categoryName, subCategoryName }: CategoryAndSubCategoryProps) {
  return (
    <>
      <TableRow className={lusitana.className}>
        <TableHead>Category</TableHead>
        <TableHead className="text-end">SubCategory</TableHead>
      </TableRow>
      <TableRow className="bg-[--surface-3]">
        <TableCell>{categoryName}</TableCell>
        <TableCell className="text-end">{subCategoryName}</TableCell>
      </TableRow>
    </>
  );
}

function Brand({ brandName, brandLogo }: BrandProps) {
  return (
    <>
      <TableRow className={lusitana.className}>
        <TableHead colSpan={2}>Brand</TableHead>
      </TableRow>
      <TableRow className="bg-[--surface-3]">
        <TableCell colSpan={2}>
          <BrandTag brandName={brandName} brandLogo={brandLogo} />
        </TableCell>
      </TableRow>
    </>
  );
}
