"use client";

// react
import { Fragment } from "react";

// other libraries
import { flexRender } from "@tanstack/react-table";
import { useTanTableInstanceContext } from "@/features/manager/products/stores/tan-table-instance";

// components
import { Table, TableBody, TableHeader, TableRow } from "@/components/ui/custom/table";
import NotFound from "@/components/NotFound";

export default function ProductsTable() {
  const {
    table,
    tableState: { totalItems },
  } = useTanTableInstanceContext();

  if (totalItems === 0)
    return (
      <>
        <br />
        <NotFound message={"Products were not found!"} />
      </>
    );

  return (
    <Table>
      <TableHeader className="font-lusitana">
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
          <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="odd:bg-surface-3 even:bg-surface-4">
            {row.getVisibleCells().map((cell) => (
              <Fragment key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Fragment>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
