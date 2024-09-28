"use client";

// next
import Link from "next/link";

// other libraries
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/formatters";
import PathFinder from "@/lib/PathFinder";

// assets
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

export default function CartIndicator({ cart, className = "" }) {
  // Ensure the cart exists
  if (!cart || (cart && cart.cartItems.length === 0)) {
    // If the cart is not there, display the empty cart indicator nonetheless
    return (
      <div className={cn("dropdown md:dropdown-end", className)}>
        <div tabIndex={0} role="button" className="btn btn-circle btn-ghost">
          <div className="indicator">
            <ShoppingCartIcon width={24} height={24} />
            <span className="badge indicator-item badge-sm">0</span>
          </div>
        </div>
        <div tabIndex={0} className="card dropdown-content card-compact z-10 mt-3 w-52 bg-base-100 shadow">
          <div className="card-body">
            <span className="text-center text-lg font-bold">Your cart is empty!</span>
            <div className="card-actions">
              <button type="button" className="btn btn-primary btn-block" onClick={() => document.activeElement?.blur()}>
                Keep Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { totalQty, subTotal } = cart;

  return (
    <div className={cn("dropdown md:dropdown-end", className)}>
      <div tabIndex={0} role="button" className="btn btn-circle btn-ghost">
        <div className="indicator">
          <ShoppingCartIcon width={24} height={24} />
          <span className="badge indicator-item badge-sm">{totalQty}</span>
        </div>
      </div>
      <div tabIndex={0} className="card dropdown-content card-compact z-10 mt-3 w-52 bg-base-100 shadow">
        <div className="card-body">
          <span className="text-lg font-bold">{totalQty} Item(s)</span>
          <span className="text-info">Subtotal: {formatCurrency(subTotal)}</span>
          <div className="card-actions">
            <Link href={PathFinder.toSfCart()} className="btn btn-primary btn-block" onClick={() => document.activeElement?.blur()}>
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CartIndicatorSkeleton({ className = "" }) {
  return <div className={cn("skeleton h-12 w-12 rounded-full", className)} />;
}
