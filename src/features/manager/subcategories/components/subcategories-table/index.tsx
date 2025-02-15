"use client";

// component css styles
import styles from "./index.module.css";

// prisma and db access
import type { SubCategoryWithInfo } from "../../../categories/db";

// other libraries
import useMediaQuery from "@/hooks/useMediaQuery";

// components
import { Table, TableBody, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/custom/table";
import Entry from "./Entry";

// assets
import { lusitana } from "@/assets/fonts";

// types
interface SubCategoriesTableProps {
  subCategories: SubCategoryWithInfo[];
  createdByUser?: string;
}

export default function SubCategoriesTable({ subCategories, createdByUser }: SubCategoriesTableProps) {
  // Small devices (landscape phones, less than 768px)
  const isSmall = useMediaQuery("(max-width: 767.98px)");

  return (
    <Table className={styles["subcategories-table"]}>
      <TableHeader className={lusitana.className}>
        <TableRow>
          {isSmall ? (
            <>
              <TableHead className="w-1/3">Name</TableHead>
              <TableHead className="w-1/3">Parent Category</TableHead>
              <TableHead className="w-1/3 text-center">Products#</TableHead>
            </>
          ) : (
            <>
              <TableHead className="w-1/4">Name</TableHead>
              <TableHead className="w-1/4">Parent Category</TableHead>
              <TableHead className="w-1/4 text-center">Products#</TableHead>
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
        {subCategories.map((subCategory) => (
          <Entry key={subCategory.id} subCategory={subCategory} createdByUser={createdByUser} />
        ))}
      </TableBody>
      <TableFooter className={lusitana.className}>
        <TableRow>
          {isSmall ? (
            <>
              <TableHead className="w-1/3">Name</TableHead>
              <TableHead className="w-1/3">Parent Category</TableHead>
              <TableHead className="w-1/3 text-center">Products#</TableHead>
            </>
          ) : (
            <>
              <TableHead className="w-1/4">Name</TableHead>
              <TableHead className="w-1/4">Parent Category</TableHead>
              <TableHead className="w-1/4 text-center">Products#</TableHead>
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
