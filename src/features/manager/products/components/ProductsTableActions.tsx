"use client";

// react
import { useRef, useTransition } from "react";

// next
import Link from "next/link";
import { useRouter } from "next/navigation";

// server actions and mutations
import { delProduct2 } from "../actions";

// other libraries
import { z } from "zod";
import { waait } from "@/lib/helpers";
import PathFinder from "../../PathFinder";
import useTableActionWithVal from "../../useTableActionWithVal";
import { ProductFormActionResult } from "../schemas/types";

// components
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import ConfirmDialog from "@/components/ConfirmDialog";
import ProductExcerpt from "./ProductExcerpt";

// assets
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

// types
interface ProductsTableActionsProps {
  productId: string;
  productName: string;
  productImageUrl: string;
  productPrice: number;
}

export default function ProductsTableActions({ productId, productName, productImageUrl, productPrice }: ProductsTableActionsProps) {
  const { execute, isExecuting, feedback } = useTableActionWithVal<z.ZodObject<{ productId: z.ZodString }>, readonly [], ProductFormActionResult>({
    safeActionFunc: delProduct2,
    excerpt: <ProductExcerpt name={productName} imageUrl={productImageUrl} price={productPrice} />,
  });

  const { refresh } = useRouter();
  const confirmDialogRef = useRef<HTMLDialogElement>(null);
  const [, startTransition] = useTransition();

  function handleDeleteConfirmed() {
    execute({ productId });
    startTransition(async () => {
      await waait();
      refresh();
    });
  }

  return (
    <>
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
            <Link href={PathFinder.toProductEdit(productId)} className="btn btn-block">
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
          Are you certain you want to <b className="text-error">remove</b> this product?
        </p>
        <ProductExcerpt name={productName} imageUrl={productImageUrl} price={productPrice} />
      </ConfirmDialog>
      {feedback}
    </>
  );
}
