"use client";

// prisma and db access
import { ProductWithInfo } from "@/features/manager/products/db";

// other libraries
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

// components
import { default as ItemHeader } from "./headers/Item";
import { default as NameHeader } from "./headers/Name";
import { default as PriceHeader } from "./headers/Price";
import { default as CreatedHeader } from "./headers/Created";
import { default as ActionsHeader } from "./headers/Actions";
import { default as ItemCell } from "./cells/Item";
import { default as NameCell } from "./cells/Name";
import { default as PriceCell } from "./cells/Price";
import { default as CreatedCell } from "./cells/Created";
import { default as ActionsCell } from "./cells/Actions";

// Define the row shape
export interface ProductRow extends ProductWithInfo {}

const columnHelper = createColumnHelper<ProductRow>();

export const columnsLarge: ColumnDef<ProductRow>[] = [
  columnHelper.accessor("name", { sortingFn: "alphanumericCaseSensitive", filterFn: "includesString" }),
  columnHelper.accessor("description", { filterFn: "includesString" }),
  columnHelper.accessor("price", {}),
  columnHelper.accessor("createdAt", { sortingFn: "datetime" }),
  columnHelper.accessor("updatedAt", { sortingFn: "datetime" }),

  columnHelper.accessor((row) => row.categories[0].category.name, { id: "category", sortingFn: "alphanumericCaseSensitive", filterFn: "equalsString" }),
  columnHelper.accessor((row) => row.subCategories[0]?.subCategory.name, {
    id: "subCategory",
    sortingFn: "alphanumericCaseSensitive",
    filterFn: "equalsString",
  }),
  columnHelper.accessor((row) => row._count.moreImages + 1, { id: "images" }),
  columnHelper.accessor("_count.carts", { id: "popularity" }),
  columnHelper.accessor("brand.name", { id: "brandName", sortingFn: "alphanumericCaseSensitive", filterFn: "equalsString" }),

  columnHelper.display({ id: "item", header: () => <ItemHeader className="w-[--size-13]" />, cell: ({ row }) => <ItemCell row={row} /> }),
  columnHelper.display({ id: "nameAndCat", header: ({ table }) => <NameHeader table={table} className="w-2/4" />, cell: ({ row }) => <NameCell row={row} /> }),
  columnHelper.display({
    id: "imagesAndPrice",
    header: ({ table }) => <PriceHeader table={table} className="w-1/4" />,
    cell: ({ row }) => <PriceCell row={row} />,
  }),
  columnHelper.display({
    id: "created",
    header: ({ table }) => <CreatedHeader table={table} className="w-1/4" />,
    cell: ({ row }) => <CreatedCell row={row} />,
  }),
  columnHelper.display({ id: "actions", header: () => <ActionsHeader className="w-[--size-9]" />, cell: ({ row }) => <ActionsCell row={row} /> }),
] as ColumnDef<ProductRow, unknown>[];

export const columnsSmall: ColumnDef<ProductRow>[] = [
  columnHelper.accessor("name", { sortingFn: "alphanumericCaseSensitive", filterFn: "includesString" }),
  columnHelper.accessor("description", { filterFn: "includesString" }),
  columnHelper.accessor("price", {}),
  columnHelper.accessor("createdAt", { sortingFn: "datetime" }),
  columnHelper.accessor("updatedAt", { sortingFn: "datetime" }),

  columnHelper.accessor((row) => row.categories[0].category.name, { id: "category", sortingFn: "alphanumericCaseSensitive", filterFn: "equalsString" }),
  columnHelper.accessor((row) => row.subCategories[0]?.subCategory.name, {
    id: "subCategory",
    sortingFn: "alphanumericCaseSensitive",
    filterFn: "equalsString",
  }),
  columnHelper.accessor((row) => row._count.moreImages + 1, { id: "images" }),
  columnHelper.accessor("_count.carts", { id: "popularity" }),
  columnHelper.accessor("brand.name", { id: "brandName", sortingFn: "alphanumericCaseSensitive", filterFn: "equalsString" }),

  columnHelper.display({ id: "item", header: () => <ItemHeader className="w-[--size-11]" />, cell: ({ row }) => <ItemCell row={row} /> }),
  columnHelper.display({ id: "nameAndCat", header: ({ table }) => <NameHeader table={table} className="w-full" />, cell: ({ row }) => <NameCell row={row} /> }),
  columnHelper.display({ id: "actions", header: () => <ActionsHeader className="w-[--size-9]" />, cell: ({ row }) => <ActionsCell row={row} /> }),
] as ColumnDef<ProductRow, unknown>[];
