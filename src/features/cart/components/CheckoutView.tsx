"use client";

// component css styles
import styles from "./CheckoutView.module.css";

// react
import { useEffect, useState } from "react";

// prisma and db access
import { DerivedCartWithItems } from "@/features/cart/cartDb";

// components
import NotFound from "@/components/NotFound";
import ElementsProvider from "@/features/cart/components/ElementsProvider";
import CheckoutForm from "@/features/cart/components/CheckoutForm";
import ShippingMethod, { SHIPPING_COSTS } from "./ShippingMethod";
import CartTable from "./CartTable";

// assets
import { lusitana } from "@/assets/fonts";
import { CalculatorIcon } from "@heroicons/react/24/solid";

// types
interface CheckoutViewProps {
  cart: DerivedCartWithItems | undefined;
}

export default function CheckoutView({ cart }: CheckoutViewProps) {
  const [shippingCost, setShippingCost] = useState(SHIPPING_COSTS[0]);
  const [totalAmount, setTotalAmount] = useState(cart?.subTotal ?? 0);

  useEffect(() => {
    if (cart) setTotalAmount(cart.subTotal + cart.taxAmount + shippingCost);
  }, [cart, shippingCost]);

  if (!cart || (cart && cart.cartItems.length === 0)) return <NotFound message={"Your cart is empty!"} />;

  return (
    <article className={styles["checkout-view"]}>
      <ShippingMethod onShippingMethodChanged={(shippingCost) => setShippingCost(shippingCost)} className={styles["checkout-view__shipping-method"]} />
      <ElementsProvider amount={totalAmount}>
        <CheckoutForm
          cart={cart}
          shippingCost={shippingCost}
          billAndShipCn={styles["checkout-view__billing-and-shipping"]}
          placeOrderCn={styles["checkout-view__place-order"]}
        />
      </ElementsProvider>
      <section className={styles["checkout-view__order-summary"]}>
        <h2 className={lusitana.className}>
          <CalculatorIcon width={64} height={64} />
          Order Summary
        </h2>
        <CartTable cart={cart} shippingCost={shippingCost} />
      </section>
    </article>
  );
}
