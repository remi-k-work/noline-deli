"use client";

// prisma and db access
import type { CartItemWithProduct } from "@/features/cart/db/types";

// server actions and mutations
import { updCartArticle } from "@/features/cart/actions/cart";

// other libraries
import { useCartStore } from "@/features/cart/stores/cartProvider";
import { useAction } from "next-safe-action/hooks";
import { useDebouncedCallback } from "use-debounce";

// components
import { Button } from "@/components/ui/custom/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// assets
import { MinusCircleIcon } from "@heroicons/react/24/solid";

// types
interface CartItemActionProps {
  cartItem: CartItemWithProduct;
}

export default function DecCartItem({ cartItem: { id: cartItemId, quantity } }: CartItemActionProps) {
  // Get the state and actions we need from the cart store (to implement optimistic updates)
  const decreasedCartArticle = useCartStore((state) => state.decreasedCartArticle);
  const rejectedChanges = useCartStore((state) => state.rejectedChanges);

  // We will execute the server action to update the cart article, but if it fails, we will revert the changes
  const { execute } = useAction(updCartArticle, { onError: () => rejectedChanges() });

  // Update the cart article by propagating changes to the database
  const handleUpdatedCartArticle = useDebouncedCallback((cartItemId: string) => execute({ cartItemId, quantity }), 600);

  const handleDecCartItemClicked = () => {
    decreasedCartArticle(cartItemId);
    handleUpdatedCartArticle(cartItemId);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button type="button" size="icon" variant="secondary" onClick={handleDecCartItemClicked}>
          <MinusCircleIcon width={36} height={36} />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>Decrease quantity by one</p>
      </TooltipContent>
    </Tooltip>
  );
}

export function DecCartItemSkeleton() {
  return <div className="bg-background size-9 animate-pulse"></div>;
}
