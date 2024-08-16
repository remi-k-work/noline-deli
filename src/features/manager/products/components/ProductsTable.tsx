"use client";

// component css styles
import styles from "./ProductsTable.module.css";

// prisma and db access
import { ProductWithInfo } from "../db";

// other libraries
import useMediaQuery from "@/lib/hooks/useMediaQuery";

// components
import { Table, TableBody, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ProductsTableEntry from "./ProductsTableEntry";

// assets
import { lusitana } from "@/assets/fonts";

// types
interface ProductsTableProps {
  products: ProductWithInfo[];
  createdByUser?: string;
}

export default function ProductsTable({ products, createdByUser }: ProductsTableProps) {
  // Small devices (landscape phones, less than 768px)
  const isSmall = useMediaQuery("(max-width: 767.98px)");

  return (
    <Table className={styles["products-table"]}>
      <TableHeader className={lusitana.className}>
        <TableRow>
          {isSmall ? (
            <>
              <TableHead className="w-[--size-11]">&nbsp;</TableHead>
              <TableHead className="w-full">
                <b>Name</b>
                <br />
                Category
                <br />
                SubCategory
              </TableHead>
            </>
          ) : (
            <>
              <TableHead className="w-[--size-13]">&nbsp;</TableHead>
              <TableHead className="w-2/4">
                <b>Name</b>
                <br />
                Category
                <br />
                SubCategory
              </TableHead>
              <TableHead className="w-1/4 text-center">
                Images#
                <hr className="border-dotted" />
                Popularity#
                <br />
                <b>Price</b>
              </TableHead>
              <TableHead className="w-1/4 text-center">
                Created At
                <hr className="border-dotted" />
                Updated At
              </TableHead>
            </>
          )}
          <TableHead className="w-[--size-9]">&nbsp;</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <ProductsTableEntry key={product.id} product={product} createdByUser={createdByUser} />
        ))}
      </TableBody>
      <TableFooter className={lusitana.className}>
        <TableRow>
          {isSmall ? (
            <>
              <TableHead className="w-[--size-11]">&nbsp;</TableHead>
              <TableHead className="w-full">
                <b>Name</b>
                <br />
                Category
                <br />
                SubCategory
              </TableHead>
            </>
          ) : (
            <>
              <TableHead className="w-[--size-13]">&nbsp;</TableHead>
              <TableHead className="w-2/4">
                <b>Name</b>
                <br />
                Category
                <br />
                SubCategory
              </TableHead>
              <TableHead className="w-1/4 text-center">
                Images#
                <hr className="border-dotted" />
                Popularity#
                <br />
                <b>Price</b>
              </TableHead>
              <TableHead className="w-1/4 text-center">
                Created At
                <hr className="border-dotted" />
                Updated At
              </TableHead>
            </>
          )}
          <TableHead className="w-[--size-9]">&nbsp;</TableHead>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
