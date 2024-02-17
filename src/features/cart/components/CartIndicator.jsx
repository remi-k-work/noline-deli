// component css styles
import styles from "./CartIndicator.module.css";

// prisma and db access
import { getCart } from "@/features/cart/cartDb";

// other libraries
import clsx from "clsx";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

export default async function CartIndicator() {
  // Get an existing or brand-new empty cart from our database
  const cart = await getCart();

  return (
    <div className={clsx(styles["cart-indicator"], "dropdown dropdown-end")}>
      <div tabIndex={0} role="button" className="btn btn-circle btn-ghost">
        <div className="indicator">
          <ShoppingCartIcon width={24} height={24} />
          <span className="badge indicator-item badge-sm">8</span>
        </div>
      </div>
      <div tabIndex={0} className="card dropdown-content card-compact z-10 mt-3 w-52 bg-base-100 shadow">
        <div className="card-body">
          <span className="text-lg font-bold">8 Items</span>
          <span className="text-info">Subtotal: $999</span>
          <div className="card-actions">
            <button className="btn btn-primary btn-block">View cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
