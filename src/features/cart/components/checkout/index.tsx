"use client";

// component css styles
import styles from "./index.module.css";

// prisma and db access
import type { DerivedCartWithItems } from "@/features/cart/db/types";

// components
import NotFound from "@/components/NotFound";
import StripeCheckoutForm from "./StripeCheckoutForm";

// types
interface CheckoutProps {
  cart: DerivedCartWithItems | undefined;
}

export default function Checkout({ cart }: CheckoutProps) {
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
