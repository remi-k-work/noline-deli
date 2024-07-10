"use client";

// component css styles
import styles from "./CartIndicator.module.css";

// next
import Link from "next/link";

// other libraries
import { cn } from "@/lib/utils";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { formatPrice } from "@/lib/helpers";
import { routeToCart } from "@/features/cart/helpers";

export default function CartIndicator({ cart }) {
  // Ensure the cart exists
  if (!cart || (cart && cart.cartItems.length === 0)) {
    // If the cart is not there, display the empty cart indicator nonetheless
    return (
      <div className={cn(styles["cart-indicator"], "dropdown dropdown-end")}>
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
    <div className={cn(styles["cart-indicator"], "dropdown dropdown-end")}>
      <div tabIndex={0} role="button" className="btn btn-circle btn-ghost">
        <div className="indicator">
          <ShoppingCartIcon width={24} height={24} />
          <span className="badge indicator-item badge-sm">{totalQty}</span>
        </div>
      </div>
      <div tabIndex={0} className="card dropdown-content card-compact z-10 mt-3 w-52 bg-base-100 shadow">
        <div className="card-body">
          <span className="text-lg font-bold">{totalQty} Item(s)</span>
          <span className="text-info">Subtotal: {formatPrice(subTotal)}</span>
          <div className="card-actions">
            <Link href={routeToCart} className="btn btn-primary btn-block" onClick={() => document.activeElement?.blur()}>
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CartIndicatorSkeleton() {
  return (
    <div className={styles["cart-indicator-skeleton"]}>
      <div className="btn btn-circle btn-ghost">
        <div className="indicator">
          <ShoppingCartIcon width={24} height={24} />
          <span className="badge indicator-item badge-sm">&nbsp;</span>
        </div>
      </div>
    </div>
  );
}
