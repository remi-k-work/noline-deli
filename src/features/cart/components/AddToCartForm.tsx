"use client";

// prisma and db access
import type { ProductWithAll } from "@/features/storefront/db/types";

// server actions and mutations
import { addCartArticle } from "@/features/cart/actions/cart";

// other libraries
import { z } from "zod";
import useCartActionWithVal from "@/features/cart/hooks/useCartActionWithVal";
import type { CartActionResult } from "@/features/cart/actions/cart";

// components
import { Button } from "@/components/ui/custom/button";
import ProductExcerpt from "@/features/storefront/components/products/ProductExcerpt";

// assets
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { Loader2 } from "lucide-react";

// types
interface AddToCartFormProps {
  product: ProductWithAll;
}

export default function AddToCartForm({ product: { id: productId, name, imageUrl, price } }: AddToCartFormProps) {
  const { execute, isPending, feedback } = useCartActionWithVal<z.ZodObject<{ productId: z.ZodString }>, readonly [], CartActionResult>({
    safeActionFunc: addCartArticle,
    excerpt: <ProductExcerpt kind="simple" name={name} imageUrl={imageUrl} price={price} />,
  });

  return (
    <>
      <Button type="button" size="lg" disabled={isPending} onClick={() => execute({ productId })}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please Wait...
          </>
        ) : (
          <>
            <ShoppingCartIcon width={24} height={24} />
            Add to Cart
          </>
        )}
      </Button>
      {feedback}
    </>
  );
}
