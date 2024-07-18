// prisma and db access
import { getCart } from "../cartDb";

// components
import NotFound from "@/components/NotFound";
import CartTable from "./CartTable";

export default async function CartTableView() {
  // Get an existing or brand-new empty cart from our database
  const cart = await getCart();

  if (!cart || (cart && cart.cartItems.length === 0)) return <NotFound message={"Your cart is empty!"} />;
  return <CartTable cart={cart} />;
}
