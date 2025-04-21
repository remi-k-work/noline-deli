"use client";

// react
import { Fragment } from "react";

// other libraries
import { flexRender } from "@tanstack/react-table";
import { useInstanceContext } from "@/features/storefront/stores/customers/orders-table";

// components
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/custom/table";
import NotFound from "@/components/NotFound";
import OrderDetails from "@/features/storefront/components/customers/order-details";
import { OrderAndCreatedHeaderSkeleton } from "./headers/OrderAndCreated";
import { TotalAndItemsHeaderSkeleton } from "./headers/TotalAndItems";
import { ShippingAndStatusHeaderSkeleton } from "./headers/ShippingAndStatus";
import { ActionsHeaderSkeleton } from "./headers/Actions";
import { OrderAndCreatedCellSkeleton } from "./cells/OrderAndCreated";
import { TotalAndItemsCellSkeleton } from "./cells/TotalAndItems";
import { ShippingAndStatusCellSkeleton } from "./cells/ShippingAndStatus";
import { ActionsCellSkeleton } from "./cells/Actions";

export default function OrdersTable() {
  const {
    table,
    state: { totalItems },
  } = useInstanceContext();

  if (totalItems === 0) return <NotFound message={"Orders were not found!"} />;

  return (
    <Table className="bg-surface-2">
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
          <Fragment key={row.id}>
            <TableRow data-state={row.getIsSelected() && "selected"} className="odd:bg-surface-3 even:bg-surface-4">
              {row.getVisibleCells().map((cell) => (
                <Fragment key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Fragment>
              ))}
            </TableRow>

            {/* If the row is expanded, render the expanded UI as a separate row with a single cell that spans the width of the table */}
            {row.getIsExpanded() && (
              <TableRow className="bg-surface-1">
                <TableCell colSpan={row.getVisibleCells().length}>
                  <OrderDetails order={row.original} />
                </TableCell>
              </TableRow>
            )}
          </Fragment>
        ))}
      </TableBody>
    </Table>
  );
}

export function OrdersTableSkeleton() {
  return (
    <Table className="bg-surface-2">
      <TableHeader className="font-lusitana">
        <TableRow>
          <OrderAndCreatedHeaderSkeleton />
          <TotalAndItemsHeaderSkeleton />
          <ShippingAndStatusHeaderSkeleton />
          <ActionsHeaderSkeleton />
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="bg-surface-3">
          <OrderAndCreatedCellSkeleton />
          <TotalAndItemsCellSkeleton />
          <ShippingAndStatusCellSkeleton />
          <ActionsCellSkeleton />
        </TableRow>
        <TableRow className="bg-surface-4">
          <OrderAndCreatedCellSkeleton />
          <TotalAndItemsCellSkeleton />
          <ShippingAndStatusCellSkeleton />
          <ActionsCellSkeleton />
        </TableRow>
        <TableRow className="bg-surface-3">
          <OrderAndCreatedCellSkeleton />
          <TotalAndItemsCellSkeleton />
          <ShippingAndStatusCellSkeleton />
          <ActionsCellSkeleton />
        </TableRow>
        <TableRow className="bg-surface-4">
          <OrderAndCreatedCellSkeleton />
          <TotalAndItemsCellSkeleton />
          <ShippingAndStatusCellSkeleton />
          <ActionsCellSkeleton />
        </TableRow>
        <TableRow className="bg-surface-3">
          <OrderAndCreatedCellSkeleton />
          <TotalAndItemsCellSkeleton />
          <ShippingAndStatusCellSkeleton />
          <ActionsCellSkeleton />
        </TableRow>
        <TableRow className="bg-surface-4">
          <OrderAndCreatedCellSkeleton />
          <TotalAndItemsCellSkeleton />
          <ShippingAndStatusCellSkeleton />
          <ActionsCellSkeleton />
        </TableRow>
      </TableBody>
    </Table>
  );
}
