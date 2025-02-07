"use client";

// component css styles
import styles from "./index.module.css";

// prisma and db access
import { CategoryWithInfo } from "../../db";

// other libraries
import useMediaQuery from "@/hooks/useMediaQuery";

// components
import { Table, TableBody, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Entry from "./Entry";

// assets
import { lusitana } from "@/assets/fonts";

// types
interface CategoriesTableProps {
  categories: CategoryWithInfo[];
  createdByUser?: string;
}

export default function CategoriesTable({ categories, createdByUser }: CategoriesTableProps) {
  // Small devices (landscape phones, less than 768px)
  const isSmall = useMediaQuery("(max-width: 767.98px)");

  return (
    <Table className={styles["categories-table"]}>
      <TableHeader className={lusitana.className}>
        <TableRow>
          {isSmall ? (
            <>
              <TableHead className="w-1/3">Name</TableHead>
              <TableHead className="w-1/3 text-center">SubCat#</TableHead>
              <TableHead className="w-1/3 text-center">Products#</TableHead>
            </>
          ) : (
            <>
              <TableHead className="w-1/4">Name</TableHead>
              <TableHead className="w-1/4 text-center">SubCategories#</TableHead>
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
        {categories.map((category) => (
          <Entry key={category.id} category={category} createdByUser={createdByUser} />
        ))}
      </TableBody>
      <TableFooter className={lusitana.className}>
        <TableRow>
          {isSmall ? (
            <>
              <TableHead className="w-1/3">Name</TableHead>
              <TableHead className="w-1/3 text-center">SubCat#</TableHead>
              <TableHead className="w-1/3 text-center">Products#</TableHead>
            </>
          ) : (
            <>
              <TableHead className="w-1/4">Name</TableHead>
              <TableHead className="w-1/4 text-center">SubCategories#</TableHead>
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
