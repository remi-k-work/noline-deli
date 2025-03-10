"use client";

// react
import { useRef } from "react";

// server actions and mutations
import { incCartArticle, decCartArticle, delCartArticle } from "@/features/cart/actions/cart";

// other libraries
import { useAction } from "next-safe-action/hooks";

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

interface DelCartItemFormProps extends CartItemActionProps {
  productName: string;
  productImageUrl: string;
  productPrice: number;
}

export function IncCartItemQtyButton({ cartItemId }: CartItemActionProps) {
  const { execute, isPending } = useAction(incCartArticle);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button type="button" size="icon" variant="secondary" disabled={isPending} onClick={() => execute({ cartItemId })}>
          {isPending ? <Loader2 className="size-9 animate-spin" /> : <PlusCircleIcon width={36} height={36} />}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>Increase quantity by one</p>
      </TooltipContent>
    </Tooltip>
  );
}

export function DecCartItemQtyButton({ cartItemId }: CartItemActionProps) {
  const { execute, isPending } = useAction(decCartArticle);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button type="button" size="icon" variant="secondary" disabled={isPending} onClick={() => execute({ cartItemId })}>
          {isPending ? <Loader2 className="size-9 animate-spin" /> : <MinusCircleIcon width={36} height={36} />}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>Decrease quantity by one</p>
      </TooltipContent>
    </Tooltip>
  );
}

export function DelCartItemButton({ cartItemId, productName, productImageUrl, productPrice }: DelCartItemFormProps) {
  const { execute, isPending } = useAction(delCartArticle);
  const confirmDialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button type="button" size="icon" variant="destructive" disabled={isPending} onClick={() => confirmDialogRef.current?.showModal()}>
            {isPending ? <Loader2 className="size-9 animate-spin" /> : <XCircleIcon width={36} height={36} />}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Remove this article</p>
        </TooltipContent>
      </Tooltip>
      <ConfirmDialog ref={confirmDialogRef} onConfirmed={() => execute({ cartItemId })}>
        <p className="mb-2 p-4">
          Are you certain you want to <b className="text-destructive">remove</b> this article?
        </p>
        <ProductExcerpt kind="simple" name={productName} imageUrl={productImageUrl} price={productPrice} />
      </ConfirmDialog>
    </>
  );
}
