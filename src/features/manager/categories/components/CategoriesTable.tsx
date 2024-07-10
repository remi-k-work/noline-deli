"use client";

// component css styles
import styles from "./CategoriesTable.module.css";

// prisma and db access
import { CategoryWithUser } from "../db";

// components
import { Table, TableBody, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CategoriesTableEntry from "./CategoriesTableEntry";

// assets
import { lusitana } from "@/assets/fonts";

// types
interface CategoriesTableProps {
  categories: CategoryWithUser[];
  createdByUser?: string;
}

export default function CategoriesTable({ categories, createdByUser }: CategoriesTableProps) {
  return (
    <Table className={styles["categories-table"]}>
      <TableHeader className={lusitana.className}>
        <TableRow>
          <TableHead className="w-full">Name</TableHead>
          <TableHead className="w-[--size-9]">&nbsp;</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <CategoriesTableEntry key={category.id} category={category} createdByUser={createdByUser} />
        ))}
      </TableBody>
      <TableFooter className={lusitana.className}>
        <TableRow>
          <TableHead className="w-full">Name</TableHead>
          <TableHead className="w-[--size-9]">&nbsp;</TableHead>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
