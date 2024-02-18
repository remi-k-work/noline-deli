"use client";

// component css styles
import styles from "./CartIndicator.module.css";

// next
import Link from "next/link";

// other libraries
import clsx from "clsx";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { formatPrice } from "@/lib/helpers";

export default function CartIndicator({ cart }) {
  // Ensure the cart exists
  if (!cart) {
    // To prevent receiving the "cannot destructure property of undefined" exception, do not attempt to render anything
    return null;
  }

  const { totalQty, subTotal } = cart;

  return (
    <div className={clsx(styles["cart-indicator"], "dropdown dropdown-end")}>
      <div tabIndex={0} role="button" className="btn btn-circle btn-ghost">
        <div className="indicator">
          <ShoppingCartIcon width={24} height={24} />
          <span className="badge indicator-item badge-sm">{totalQty}</span>
        </div>
      </div>
      <div tabIndex={0} className="card dropdown-content card-compact z-[1] mt-3 w-52 bg-base-100 shadow">
        <div className="card-body">
          <span className="text-lg font-bold">{totalQty} Items</span>
          <span className="text-info">Subtotal: {formatPrice(subTotal)}</span>
          <div className="card-actions">
            <Link href={"/"} className="btn btn-primary btn-block" onClick={() => document.activeElement?.blur()}>
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
