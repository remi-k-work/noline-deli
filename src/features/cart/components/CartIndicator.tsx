"use client";

// react
import { useState } from "react";

// next
import Link from "next/link";

// prisma and db access
import type { DerivedCartWithItems } from "@/features/cart/db/cart";

// other libraries
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/formatters";
import PathFinder from "@/lib/PathFinder";

// components
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/custom/button";
import { Badge } from "@/components/ui/custom/badge";
import WithIndicator, { Indicator } from "@/components/ui/custom/with-indicator";

// assets
import { BuildingStorefrontIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";

// types
interface CartIndicatorProps {
  cart?: DerivedCartWithItems;
  className?: string;
}

export default function CartIndicator({ cart, className }: CartIndicatorProps) {
  // The controlled open state of the popover
  const [open, setOpen] = useState(false);

  // Ensure the cart exists
  if (!cart || (cart && cart.cartItems.length === 0)) {
    // If the cart is not there, display the empty cart indicator nonetheless
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className={className} asChild>
          <Button type="button" size="icon" variant="ghost" title="Your cart is empty!">
            <WithIndicator>
              <Indicator>
                <Badge variant="secondary">0</Badge>
              </Indicator>
              <ShoppingCartIcon width={36} height={36} />
            </WithIndicator>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="grid place-items-center gap-4">
          <p className="text-lg">Your cart is empty!</p>
          <Button type="button" size="block" variant="outline" onClick={() => setOpen(false)}>
            <BuildingStorefrontIcon width={24} height={24} />
            Keep Shopping
          </Button>
        </PopoverContent>
      </Popover>
    );
  }

  const { totalQty, subTotal } = cart;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className={className} asChild>
        <Button type="button" size="icon" variant="ghost" title={`Your cart has ${totalQty} item(s)`}>
          <WithIndicator>
            <Indicator>
              <Badge variant="secondary">{totalQty}</Badge>
            </Indicator>
            <ShoppingCartIcon width={36} height={36} />
          </WithIndicator>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="grid place-items-center gap-4">
        <p className="text-lg">{totalQty} Item(s)</p>
        <p className="text-muted-foreground">
          Subtotal: <b>{formatCurrency(subTotal)}</b>
        </p>
        <Button type="button" size="block" onClick={() => setOpen(false)} asChild>
          <Link href={PathFinder.toSfCart()}>
            <ShoppingCartIcon width={24} height={24} />
            View Cart
          </Link>
        </Button>
        <Button type="button" size="block" variant="outline" onClick={() => setOpen(false)}>
          <BuildingStorefrontIcon width={24} height={24} />
          Keep Shopping
        </Button>
      </PopoverContent>
    </Popover>
  );
}

export function CartIndicatorSkeleton({ className }: Pick<CartIndicatorProps, "className">) {
  return <div className={cn("bg-background h-12 w-12 animate-pulse rounded-full", className)} />;
}
