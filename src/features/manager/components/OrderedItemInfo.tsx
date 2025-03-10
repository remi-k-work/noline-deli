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
import { default as PriceTag } from "@/features/storefront/components/products/tags/Price";
import { default as BrandTag } from "@/features/storefront/components/products/tags/Brand";

// types
interface OrderedItemInfoProps {
  orderedItem: OrderedItem;
}

export default function OrderedItemInfo({ orderedItem, orderedItem: { name, description, imageUrl, price } }: OrderedItemInfoProps) {
  return (
    <Table className={styles["ordered-item-info"]}>
      <TableHeader className="font-lusitana">
        <TableRow>
          <TableHead className="w-[50%]">Name</TableHead>
          <TableHead className="w-[50%] text-end">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="bg-(--surface-3)">
          <TableCell>{name}</TableCell>
          <TableCell className="text-end">
            <PriceTag priceInCents={price} />
          </TableCell>
        </TableRow>
        <TableRow className="font-lusitana">
          <TableHead colSpan={2}>Image</TableHead>
        </TableRow>
        <TableRow className="bg-(--surface-3)">
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
        <CategoryAndSubCategory orderedItem={orderedItem} />
        <Brand orderedItem={orderedItem} />
        <TableRow className="font-lusitana">
          <TableHead colSpan={2}>Description</TableHead>
        </TableRow>
        <TableRow className="bg-(--surface-3)">
          <TableCell colSpan={2}>
            <p className="m-auto">{description}</p>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

function CategoryAndSubCategory({ orderedItem: { categoryName, subCategoryName } }: OrderedItemInfoProps) {
  return (
    <>
      <TableRow className="font-lusitana">
        <TableHead>Category</TableHead>
        <TableHead className="text-end">SubCategory</TableHead>
      </TableRow>
      <TableRow className="bg-(--surface-3)">
        <TableCell>{categoryName}</TableCell>
        <TableCell className="text-end">{subCategoryName}</TableCell>
      </TableRow>
    </>
  );
}

function Brand({ orderedItem: { brandName, brandLogo } }: OrderedItemInfoProps) {
  return (
    <>
      <TableRow className="font-lusitana">
        <TableHead colSpan={2}>Brand</TableHead>
      </TableRow>
      <TableRow className="bg-(--surface-3)">
        <TableCell colSpan={2}>
          <BrandTag kind="orditem" name={brandName} logoUrl={brandLogo} />
        </TableCell>
      </TableRow>
    </>
  );
}
