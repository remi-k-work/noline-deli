"use client";

// react
import { useRef } from "react";
import { useFormStatus } from "react-dom";

// server actions and mutations
import { incArticleByOne, decArticleByOne, deleteCartArticle } from "@/features/cart/actions/cart";

// components
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import ConfirmDialog from "@/components/ConfirmDialog";
import ProductExcerpt from "@/features/manager/products/components/ProductExcerpt";

// assets
import { PlusCircleIcon, MinusCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

// types
interface CartItemActionProps {
  cartItemId: string;
}

interface DelCartItemFormProps {
  cartItemId: string;
  productName: string;
  productImageUrl: string;
  productPrice: number;
}

interface DelCartItemButtonProps {
  onDelCartItemClicked: () => void;
}

export function IncCartItemQtyForm({ cartItemId }: CartItemActionProps) {
  // Pass additional arguments to a server action
  const incArticleByOneWithArgs = incArticleByOne.bind(null, cartItemId);

  return (
    <form action={incArticleByOneWithArgs}>
      <IncCartItemQtyButton />
    </form>
  );
}

function IncCartItemQtyButton() {
  // To be able to display a pending status while the form is being submitted
  const { pending } = useFormStatus();

  return (
    <Tooltip>
      <TooltipTrigger type="submit" className="btn btn-circle glass btn-secondary btn-sm" disabled={pending}>
        {pending ? <span className="loading loading-spinner"></span> : <PlusCircleIcon width={24} height={24} />}
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>Increase quantity by one</p>
      </TooltipContent>
    </Tooltip>
  );
}

export function DecCartItemQtyForm({ cartItemId }: CartItemActionProps) {
  // Pass additional arguments to a server action
  const decArticleByOneWithArgs = decArticleByOne.bind(null, cartItemId);

  return (
    <form action={decArticleByOneWithArgs}>
      <DecCartItemQtyButton />
    </form>
  );
}

function DecCartItemQtyButton() {
  // To be able to display a pending status while the form is being submitted
  const { pending } = useFormStatus();

  return (
    <Tooltip>
      <TooltipTrigger type="submit" className="btn btn-circle glass btn-secondary btn-sm" disabled={pending}>
        {pending ? <span className="loading loading-spinner"></span> : <MinusCircleIcon width={24} height={24} />}
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>Decrease quantity by one</p>
      </TooltipContent>
    </Tooltip>
  );
}

export function DelCartItemForm({ cartItemId, productName, productImageUrl, productPrice }: DelCartItemFormProps) {
  // Pass additional arguments to a server action
  const deleteCartArticleWithArgs = deleteCartArticle.bind(null, cartItemId);

  const delCartItemFormRef = useRef<HTMLFormElement>(null);
  const confirmDialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <form ref={delCartItemFormRef} action={deleteCartArticleWithArgs}>
        <DelCartItemButton onDelCartItemClicked={() => confirmDialogRef.current?.showModal()} />
      </form>
      <ConfirmDialog ref={confirmDialogRef} onConfirmed={() => delCartItemFormRef.current?.requestSubmit()}>
        <p className="mb-2 p-4">
          Are you certain you want to <b className="text-error">remove</b> this article?
        </p>
        <ProductExcerpt name={productName} imageUrl={productImageUrl} price={productPrice} />
      </ConfirmDialog>
    </>
  );
}

function DelCartItemButton({ onDelCartItemClicked }: DelCartItemButtonProps) {
  // To be able to display a pending status while the form is being submitted
  const { pending } = useFormStatus();

  return (
    <Tooltip>
      <TooltipTrigger type="button" className="btn btn-circle glass btn-warning btn-sm" disabled={pending} onClick={() => onDelCartItemClicked?.()}>
        {pending ? <span className="loading loading-spinner"></span> : <XCircleIcon width={24} height={24} />}
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>Remove this article</p>
      </TooltipContent>
    </Tooltip>
  );
}
