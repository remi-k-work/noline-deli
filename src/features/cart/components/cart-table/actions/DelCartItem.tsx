"use client";

// react
import { useRef } from "react";

// prisma and db access
import type { CartItemWithProduct } from "@/features/cart/db/types";

// server actions and mutations
import { delCartArticle } from "@/features/cart/actions/cart";

// other libraries
import { useCartStore } from "@/features/cart/stores/cartProvider";
import { useAction } from "next-safe-action/hooks";

// components
import { Button } from "@/components/ui/custom/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import ConfirmDialog from "@/components/ConfirmDialog";
import ProductExcerpt from "@/features/storefront/components/products/ProductExcerpt";

// assets
import { XCircleIcon } from "@heroicons/react/24/solid";

// types
interface CartItemActionProps {
  cartItem: CartItemWithProduct;
}

export default function DelCartItem({
  cartItem: {
    id: cartItemId,
    product: { name, imageUrl, price },
  },
}: CartItemActionProps) {
  // Get the state and actions we need from the cart store (to implement optimistic updates)
  const removedCartArticle = useCartStore((state) => state.removedCartArticle);
  const rejectedChanges = useCartStore((state) => state.rejectedChanges);

  // We will execute the server action to delete the cart article, but if it fails, we will revert the changes
  const { executeAsync } = useAction(delCartArticle);

  // Used to show the confirmation dialog
  const confirmDialogRef = useRef<HTMLDialogElement>(null);

  const handleDelCartItemConfirmed = async () => {
    removedCartArticle(cartItemId);
    const { serverError } = (await executeAsync({ cartItemId })) ?? {};
    if (serverError) rejectedChanges();
  };

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button type="button" size="icon" variant="destructive" onClick={() => confirmDialogRef.current?.showModal()}>
            <XCircleIcon width={36} height={36} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Remove this article</p>
        </TooltipContent>
      </Tooltip>
      <ConfirmDialog ref={confirmDialogRef} onConfirmed={handleDelCartItemConfirmed}>
        <p className="mb-2 p-4">
          Are you certain you want to <b className="text-destructive">remove</b> this article?
        </p>
        <ProductExcerpt kind="simple" name={name} imageUrl={imageUrl} price={price} />
      </ConfirmDialog>
    </>
  );
}

export function DelCartItemSkeleton() {
  return <div className="bg-background size-9 animate-pulse"></div>;
}
