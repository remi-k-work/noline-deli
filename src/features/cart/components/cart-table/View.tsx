// prisma and db access
import { getCart } from "@/features/cart/db/cart";

// components
import { CartStoreProvider } from "@/features/cart/stores/cartProvider";
import NotFound from "@/components/NotFound";
import CartTable from ".";

export default async function View() {
  // Get an existing or brand-new empty cart from our database
  const cart = await getCart();

  if (!cart || (cart && cart.cartItems.length === 0)) return <NotFound message={"Your cart is empty!"} />;

  return (
    <CartStoreProvider cart={cart}>
      <CartTable />
    </CartStoreProvider>
  );
}
