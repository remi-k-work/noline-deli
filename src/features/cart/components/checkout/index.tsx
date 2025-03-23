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

  return <StripeCheckoutForm />;
}
