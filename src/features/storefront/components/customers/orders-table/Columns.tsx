"use client";

// prisma and db access
import type { OrderWithItems } from "@/features/storefront/db/types";

// other libraries
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { dateBetweenFilterFn } from "@/lib/filters";

// components
import { default as OrderAndCreatedHeader } from "./headers/OrderAndCreated";
import { default as TotalAndItemsHeader } from "./headers/TotalAndItems";
import { default as ShippingAndStatusHeader } from "./headers/ShippingAndStatus";
import { default as ActionsHeader } from "./headers/Actions";
import { default as OrderAndCreatedCell } from "./cells/OrderAndCreated";
import { default as TotalAndItemsCell } from "./cells/TotalAndItems";
import { default as ShippingAndStatusCell } from "./cells/ShippingAndStatus";
import { default as ActionsCell } from "./cells/Actions";

const columnHelper = createColumnHelper<OrderWithItems>();

export const columns: ColumnDef<OrderWithItems>[] = [
  columnHelper.accessor("orderNumber", { sortingFn: "alphanumericCaseSensitive" }),
  columnHelper.accessor("created", { sortingFn: "datetime", filterFn: dateBetweenFilterFn }),
  columnHelper.accessor("totalQty", {}),
  columnHelper.accessor("shippingMethod", { filterFn: "equalsString" }),
  columnHelper.accessor("totalPaid", {}),
  columnHelper.accessor("status", { filterFn: "equalsString" }),

  // Combine all ordered item names so that they function as searchable tags for this order
  columnHelper.accessor(
    (row) => {
      let allNames = "";
      for (const orderedItem of row.orderedItems) {
        allNames += orderedItem.name;
      }
      return allNames;
    },
    { id: "allNames", filterFn: "includesString" },
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
    { id: "allBrandNames", filterFn: "includesString" },
  ),

  columnHelper.display({
    id: "orderAndCreated",
    header: ({ table }) => <OrderAndCreatedHeader table={table} className="w-80" />,
    cell: ({ row }) => <OrderAndCreatedCell row={row} />,
  }),
  columnHelper.display({
    id: "totalAndItems",
    header: ({ table }) => <TotalAndItemsHeader table={table} className="w-32" />,
    cell: ({ row }) => <TotalAndItemsCell row={row} />,
  }),
  columnHelper.display({
    id: "shippingAndStatus",
    header: ({ table }) => <ShippingAndStatusHeader table={table} className="w-42" />,
    cell: ({ row }) => <ShippingAndStatusCell row={row} />,
  }),
  columnHelper.display({ id: "actions", header: () => <ActionsHeader className="w-(--size-9)" />, cell: ({ row }) => <ActionsCell row={row} /> }),
] as ColumnDef<OrderWithItems, unknown>[];
