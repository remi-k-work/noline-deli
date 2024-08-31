"use client";

// component css styles
import styles from "./index.module.css";

// react
import { Fragment } from "react";

// other libraries
import { cn } from "@/lib/utils";
import { flexRender } from "@tanstack/react-table";
import { useTanTableInstanceContext } from "../../stores/TanTableInstance";

// components
import { Table, TableBody, TableHeader, TableRow } from "@/components/ui/table";
import NotFound from "@/components/NotFound";

// assets
import { lusitana } from "@/assets/fonts";

export default function ProductsTable() {
  const { createdByUser, table, totalItems } = useTanTableInstanceContext();

  if (totalItems === 0)
    return (
      <>
        <br />
        <NotFound message={"Products were not found!"} />
      </>
    );

  return (
    <Table className={styles["products-table"]}>
      <TableHeader className={lusitana.className}>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Fragment key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</Fragment>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && "selected"}
            className={cn("odd:bg-[--surface-3] even:bg-[--surface-4]", {
              "text-error": row.original.user.role === "ADMIN" || row.original.createdBy !== createdByUser,
            })}
          >
            {row.getVisibleCells().map((cell) => (
              <Fragment key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Fragment>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
