"use client";

// component css styles
import styles from "./SubCategoriesTable.module.css";

// prisma and db access
import { SubCategoryWithUser } from "../../categories/db";

// components
import { Table, TableBody, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SubCategoriesTableEntry from "./SubCategoriesTableEntry";

// assets
import { lusitana } from "@/assets/fonts";

// types
interface SubCategoriesTableProps {
  subCategories: SubCategoryWithUser[];
  createdByUser?: string;
}

export default function SubCategoriesTable({ subCategories, createdByUser }: SubCategoriesTableProps) {
  return (
    <Table className={styles["subcategories-table"]}>
      <TableHeader className={lusitana.className}>
        <TableRow>
          <TableHead className="w-1/2">Name</TableHead>
          <TableHead className="w-1/2">Parent Category</TableHead>
          <TableHead className="w-[--size-9]">&nbsp;</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subCategories.map((subCategory) => (
          <SubCategoriesTableEntry key={subCategory.id} subCategory={subCategory} createdByUser={createdByUser} />
        ))}
      </TableBody>
      <TableFooter className={lusitana.className}>
        <TableRow>
          <TableHead className="w-1/2">Name</TableHead>
          <TableHead className="w-1/2">Parent Category</TableHead>
          <TableHead className="w-[--size-9]">&nbsp;</TableHead>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
