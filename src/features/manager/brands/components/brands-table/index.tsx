"use client";

// component css styles
import styles from "./index.module.css";

// prisma and db access
import type { BrandWithInfo } from "@/features/manager/brands/db";

// other libraries
import useMediaQuery from "@/hooks/useMediaQuery";

// components
import { Table, TableBody, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/custom/table";
import Entry from "./Entry";

// types
interface BrandsTableProps {
  brands: BrandWithInfo[];
  createdByUser?: string;
}

export default function BrandsTable({ brands, createdByUser }: BrandsTableProps) {
  // Small devices (landscape phones, less than 768px)
  const isSmall = useMediaQuery("(max-width: 767.98px)");

  return (
    <Table className={styles["brands-table"]}>
      <TableHeader className="font-lusitana">
        <TableRow>
          {isSmall ? (
            <>
              <TableHead className="w-(--size-11)">&nbsp;</TableHead>
              <TableHead className="w-1/2">Name</TableHead>
              <TableHead className="w-1/2 text-center">Products#</TableHead>
            </>
          ) : (
            <>
              <TableHead className="w-(--size-13)">&nbsp;</TableHead>
              <TableHead className="w-1/4">Name</TableHead>
              <TableHead className="w-1/4">Logo Url</TableHead>
              <TableHead className="w-1/4 text-center">Products#</TableHead>
              <TableHead className="w-1/4 text-center">
                Created At
                <hr className="border-dotted" />
                Updated At
              </TableHead>
            </>
          )}
          <TableHead className="w-(--size-9)">&nbsp;</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {brands.map((brand) => (
          <Entry key={brand.id} brand={brand} createdByUser={createdByUser} />
        ))}
      </TableBody>
      <TableFooter className="font-lusitana">
        <TableRow>
          {isSmall ? (
            <>
              <TableHead className="w-(--size-11)">&nbsp;</TableHead>
              <TableHead className="w-1/2">Name</TableHead>
              <TableHead className="w-1/2 text-center">Products#</TableHead>
            </>
          ) : (
            <>
              <TableHead className="w-(--size-13)">&nbsp;</TableHead>
              <TableHead className="w-1/4">Name</TableHead>
              <TableHead className="w-1/4">Logo Url</TableHead>
              <TableHead className="w-1/4 text-center">Products#</TableHead>
              <TableHead className="w-1/4 text-center">
                Created At
                <hr className="border-dotted" />
                Updated At
              </TableHead>
            </>
          )}
          <TableHead className="w-(--size-9)">&nbsp;</TableHead>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
