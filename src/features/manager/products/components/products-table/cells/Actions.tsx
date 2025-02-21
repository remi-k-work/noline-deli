"use client";

// react
import { useRef, useTransition } from "react";

// next
import Link from "next/link";
import { useRouter } from "next/navigation";

// server actions and mutations
import { delProduct2 } from "@/features/manager/products/actions";

// other libraries
import { z } from "zod";
import { waait } from "@/lib/helpers";
import PathFinder from "@/lib/PathFinder";
import useTableActionWithVal from "@/features/manager/hooks/useTableActionWithVal";
import { ProductFormActionResult } from "@/features/manager/products/schemas/types";
import { Row } from "@tanstack/react-table";
import { ProductRow } from "../Columns";

// components
import { TableCell } from "@/components/ui/custom/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import ConfirmDialog from "@/components/ConfirmDialog";
import ProductExcerpt from "@/features/storefront/components/products/ProductExcerpt";

// assets
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

// types
interface ActionsProps {
  row: Row<ProductRow>;
}

export default function Actions({ row: { getValue, original } }: ActionsProps) {
  const { execute, isExecuting, feedback } = useTableActionWithVal<z.ZodObject<{ productId: z.ZodString }>, readonly [], ProductFormActionResult>({
    safeActionFunc: delProduct2,
    excerpt: <ProductExcerpt kind="simple" name={getValue("name")} imageUrl={original.imageUrl} price={getValue("price")} />,
  });

  const { refresh } = useRouter();
  const confirmDialogRef = useRef<HTMLDialogElement>(null);
  const [, startTransition] = useTransition();

  function handleDeleteConfirmed() {
    execute({ productId: original.id });
    startTransition(async () => {
      await waait();
      refresh();
    });
  }

  return (
    <TableCell>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="btn btn-circle btn-ghost">
                {isExecuting ? <span className="loading loading-spinner"></span> : <EllipsisVerticalIcon width={24} height={24} />}
              </div>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Perform actions with this product</p>
            </TooltipContent>
          </Tooltip>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="left">
          <DropdownMenuLabel>Choose an Action</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link href={PathFinder.toProductEdit(original.id)} className="btn btn-block">
              <PencilIcon width={24} height={24} />
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button type="button" className="btn btn-warning btn-block" disabled={isExecuting} onClick={() => confirmDialogRef.current?.showModal()}>
              <TrashIcon width={24} height={24} />
              Delete
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmDialog ref={confirmDialogRef} onConfirmed={handleDeleteConfirmed}>
        <p className="mb-2 p-4">
          Are you certain you want to <b className="text-destructive">remove</b> this product?
        </p>
        <ProductExcerpt kind="simple" name={getValue("name")} imageUrl={original.imageUrl} price={getValue("price")} />
      </ConfirmDialog>
      {feedback}
    </TableCell>
  );
}
