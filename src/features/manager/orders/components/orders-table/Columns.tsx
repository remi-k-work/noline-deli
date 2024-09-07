"use client";

// prisma and db access
import { OrderWithItems } from "@/features/manager/orders/db";

// other libraries
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

// components
import { default as OrderNumberHeader } from "./headers/OrderNumber";
import { default as CustomerHeader } from "./headers/Customer";
import { default as TotalPaidHeader } from "./headers/TotalPaid";
import { default as StatusHeader } from "./headers/Status";
import { default as OrderNumberCell } from "./cells/OrderNumber";
import { default as CustomerCell } from "./cells/Customer";
import { default as TotalPaidCell } from "./cells/TotalPaid";
import { default as StatusCell } from "./cells/Status";

// Define the row shape
export interface OrderRow extends OrderWithItems {}

const columnHelper = createColumnHelper<OrderRow>();

export const columnsLarge: ColumnDef<OrderRow>[] = [
  columnHelper.accessor("orderNumber", { sortingFn: "alphanumericCaseSensitive" }),
  columnHelper.accessor("created", { sortingFn: "datetime" }),
  columnHelper.accessor("totalQty", {}),
  columnHelper.accessor("shippingMethod", {}),
  columnHelper.accessor("totalPaid", {}),
  columnHelper.accessor("status", {}),

  columnHelper.accessor("customer.email", { id: "customerEmail", sortingFn: "alphanumericCaseSensitive" }),
  columnHelper.accessor("customer.name", { id: "customerName", sortingFn: "alphanumericCaseSensitive" }),

  // Combine all ordered item names so that they function as searchable tags for this order
  columnHelper.accessor(
    (row) => {
      let allNames = "";
      for (const orderedItem of row.orderedItems) {
        allNames += orderedItem.name;
      }
      return allNames;
    },
    { id: "allNames" },
  ),

  // Combine all ordered item brand names so that they function as searchable tags for this order
  columnHelper.accessor(
    (row) => {
      let allBrandNames = "";
      for (const orderedItem of row.orderedItems) {
        allBrandNames += orderedItem.brandName;
      }
      return allBrandNames;
    },
    { id: "allBrandNames" },
  ),

  columnHelper.display({
    id: "orderNumberAndCreated",
    header: ({ table }) => <OrderNumberHeader table={table} className="w-1/4" />,
    cell: ({ row }) => <OrderNumberCell row={row} />,
  }),
  columnHelper.display({
    id: "customer",
    header: ({ table }) => <CustomerHeader table={table} className="w-1/4" />,
    cell: ({ row }) => <CustomerCell row={row} />,
  }),
  columnHelper.display({
    id: "totalPaidAndShipping",
    header: ({ table }) => <TotalPaidHeader table={table} className="w-1/4" />,
    cell: ({ row }) => <TotalPaidCell row={row} />,
  }),
  columnHelper.display({
    id: "statusSelect",
    header: ({ table }) => <StatusHeader table={table} className="w-1/4" />,
    cell: ({ row }) => <StatusCell row={row} />,
  }),
] as ColumnDef<OrderRow, unknown>[];

export const columnsSmall: ColumnDef<OrderRow>[] = [
  columnHelper.accessor("orderNumber", { sortingFn: "alphanumericCaseSensitive" }),
  columnHelper.accessor("created", { sortingFn: "datetime" }),
  columnHelper.accessor("totalQty", {}),
  columnHelper.accessor("shippingMethod", {}),
  columnHelper.accessor("totalPaid", {}),
  columnHelper.accessor("status", {}),

  columnHelper.accessor("customer.email", { id: "customerEmail", sortingFn: "alphanumericCaseSensitive" }),
  columnHelper.accessor("customer.name", { id: "customerName", sortingFn: "alphanumericCaseSensitive" }),

  // Combine all ordered item names so that they function as searchable tags for this order
  columnHelper.accessor(
    (row) => {
      let allNames = "";
      for (const orderedItem of row.orderedItems) {
        allNames += orderedItem.name;
      }
      return allNames;
    },
    { id: "allNames" },
  ),

  // Combine all ordered item brand names so that they function as searchable tags for this order
  columnHelper.accessor(
    (row) => {
      let allBrandNames = "";
      for (const orderedItem of row.orderedItems) {
        allBrandNames += orderedItem.brandName;
      }
      return allBrandNames;
    },
    { id: "allBrandNames" },
  ),

  columnHelper.display({
    id: "orderNumberAndCreated",
    header: ({ table }) => <OrderNumberHeader table={table} className="w-2/4" />,
    cell: ({ row }) => <OrderNumberCell row={row} />,
  }),
  columnHelper.display({
    id: "totalPaidAndShipping",
    header: ({ table }) => <TotalPaidHeader table={table} className="w-1/4" />,
    cell: ({ row }) => <TotalPaidCell row={row} />,
  }),
  columnHelper.display({
    id: "statusSelect",
    header: ({ table }) => <StatusHeader table={table} className="w-1/4" />,
    cell: ({ row }) => <StatusCell row={row} />,
  }),
] as ColumnDef<OrderRow, unknown>[];
