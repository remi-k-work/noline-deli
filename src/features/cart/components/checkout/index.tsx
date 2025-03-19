"use client";

// component css styles
import styles from "./index.module.css";

// react
import { useEffect, useState } from "react";

// prisma and db access
import type { DerivedCartWithItems } from "@/features/cart/db/cart";

// components
import NotFound from "@/components/NotFound";
import ElementsProvider from "@/features/cart/components/checkout/ElementsProvider";
import Form from "@/features/cart/components/checkout/Form";
import ShippingMethod, { SHIPPING_COSTS, SHIPPING_METHODS } from "./ShippingMethod";
import CartTable from "@/features/cart/components/cart-table";
import StripeCheckoutForm from "./StripeCheckoutForm";

// assets
import { CalculatorIcon } from "@heroicons/react/24/solid";

// types
interface CheckoutProps {
  cart: DerivedCartWithItems | undefined;
}

export default function Checkout({ cart }: CheckoutProps) {
  const [shippingCost, setShippingCost] = useState(SHIPPING_COSTS[0]);
  const [shippingMethod, setShippingMethod] = useState(SHIPPING_METHODS[0]);
  const [totalAmount, setTotalAmount] = useState(cart?.subTotal ?? 0);

  useEffect(() => {
    if (cart) setTotalAmount(cart.subTotal + cart.taxAmount + shippingCost);
  }, [cart, shippingCost]);

  if (!cart || (cart && cart.cartItems.length === 0)) return <NotFound message={"Your cart is empty!"} />;

  return (
    <>
      <StripeCheckoutForm />
      <article className={styles["checkout"]}>
        {/* <ShippingMethod
        onShippingMethodChanged={(shippingCost, shippingMethod) => {
          setShippingCost(shippingCost);
          setShippingMethod(shippingMethod);
        }}
        className={styles["checkout__shipping-method"]}
      /> */}
        {/* <ElementsProvider amount={totalAmount}>
        <Form
          cart={cart}
          shippingCost={shippingCost}
          shippingMethod={shippingMethod}
          billAndShipCn={styles["checkout__billing-and-shipping"]}
          placeOrderCn={styles["checkout__place-order"]}
        />
      </ElementsProvider>
      <section className={styles["checkout__order-summary"]}>
        <h2 className="font-lusitana">
          <CalculatorIcon width={64} height={64} />
          Order Summary
        </h2>
        <CartTable cart={cart} shippingCost={shippingCost} />
      </section> */}
      </article>
    </>
  );
}
