// next
import Link from "next/link";

// prisma and db access
import { getCart } from "@/features/cart/db/cart";

// components
import { Button } from "@/components/ui/custom/button";
import NotFound from "@/components/NotFound";
import CartTable from ".";

// assets
import { ShoppingBagIcon } from "@heroicons/react/24/solid";

export default async function View() {
  // Get an existing or brand-new empty cart from our database
  const cart = await getCart();

  if (!cart || (cart && cart.cartItems.length === 0)) return <NotFound message={"Your cart is empty!"} />;

  return (
    <>
      <CartTable cart={cart} />
      <br />
      <Button size="lg" className="float-end" asChild>
        <Link href={"/cart/order/checkout"}>
          <ShoppingBagIcon width={24} height={24} />
          Checkout Now
        </Link>
      </Button>
      <br />
      <br />
    </>
  );
}
