"use client";

// react
import { useRef, useState, useTransition } from "react";

// next
import Link from "next/link";
import { useRouter } from "next/navigation";

// server actions and mutations
import { delProduct } from "../actions";

// other libraries
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import PathFinder from "../../PathFinder";
import { ProductFormState } from "../ProductFormSchema";

// components
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import ConfirmDialog from "@/components/ConfirmDialog";
import ProductExcerpt from "./ProductExcerpt";
import { ProductsTableFeedback } from "./ProductFormFeedback";

// types
interface ProductsTableActionsProps {
  productId: string;
  productName: string;
  productImageUrl: string;
  productPrice: number;
}

export default function ProductsTableActions({ productId, productName, productImageUrl, productPrice }: ProductsTableActionsProps) {
  // To display a pending status while the server action is running
  const [isPending, startTransition] = useTransition();

  // Are we prepared to provide feedback to the user?
  const [showFeedback, setShowFeedback] = useState(false);

  const { refresh } = useRouter();
  const confirmDialogRef = useRef<HTMLDialogElement>(null);
  const productFormState = useRef<ProductFormState>();

  function handleDeleteConfirmed() {
    startTransition(async () => {
      productFormState.current = await delProduct(productId);
      setShowFeedback(true);
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
                {isPending ? <span className="loading loading-spinner"></span> : <EllipsisVerticalIcon width={24} height={24} />}
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
            <button type="button" className="btn btn-warning btn-block" disabled={isPending} onClick={() => confirmDialogRef.current?.showModal()}>
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
      {showFeedback && productFormState.current && (
        <ProductsTableFeedback
          productName={productName}
          productImageUrl={productImageUrl}
          productPrice={productPrice}
          productFormState={productFormState.current}
          setShowFeedback={setShowFeedback}
        />
      )}
    </>
  );
}
