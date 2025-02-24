"use client";

// react
import { useRef } from "react";
import { useFormStatus } from "react-dom";

// server actions and mutations
import { incArticleByOne, decArticleByOne, deleteCartArticle } from "@/features/cart/actions/cart";

// components
import { Button } from "@/components/ui/custom/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import ConfirmDialog from "@/components/ConfirmDialog";
import ProductExcerpt from "@/features/storefront/components/products/ProductExcerpt";

// assets
import { PlusCircleIcon, MinusCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { Loader2 } from "lucide-react";

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
      <TooltipTrigger asChild>
        <Button type="submit" size="icon" variant="secondary" disabled={pending}>
          {pending ? <Loader2 className="size-9 animate-spin" /> : <PlusCircleIcon width={36} height={36} />}
        </Button>
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
      <TooltipTrigger asChild>
        <Button type="submit" size="icon" variant="secondary" disabled={pending}>
          {pending ? <Loader2 className="size-9 animate-spin" /> : <MinusCircleIcon width={36} height={36} />}
        </Button>
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
          Are you certain you want to <b className="text-destructive">remove</b> this article?
        </p>
        <ProductExcerpt kind="simple" name={productName} imageUrl={productImageUrl} price={productPrice} />
      </ConfirmDialog>
    </>
  );
}

function DelCartItemButton({ onDelCartItemClicked }: DelCartItemButtonProps) {
  // To be able to display a pending status while the form is being submitted
  const { pending } = useFormStatus();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button type="button" size="icon" variant="destructive" disabled={pending} onClick={() => onDelCartItemClicked?.()}>
          {pending ? <Loader2 className="size-9 animate-spin" /> : <XCircleIcon width={36} height={36} />}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>Remove this article</p>
      </TooltipContent>
    </Tooltip>
  );
}
