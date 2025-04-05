// component css styles
import styles from "./index.module.css";

// prisma and db access
import type { DerivedCartWithItems } from "@/features/cart/db/types";
import { processCheckoutSession } from "@/features/cart/db/helpers";

// other libraries
import { cn } from "@/lib/utils";
import Stripe from "stripe";
import { formatCurrency } from "@/lib/formatters";

// components
import { Table, TableBody, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/custom/table";
import Entry from "./Entry";

// assets
import { ShoppingBagIcon } from "@heroicons/react/24/solid";

// types
interface OrderDetailsProps {
  checkoutSession: Stripe.Checkout.Session;
  orderedCart: DerivedCartWithItems;
  className?: string;
}

export default function OrderDetails({ checkoutSession, orderedCart: { cartItems, totalQty }, className }: OrderDetailsProps) {
  // Process the stripe checkout session by extracting and converting the relevant information
  const { subTotal, totalPaid, shippingCost, taxAmount } = processCheckoutSession(checkoutSession);

  return (
    <section className={cn(styles["order-details"], className)}>
      <h2 className="font-lusitana">
        <ShoppingBagIcon width={64} height={64} />
        Order Details
      </h2>
      <Table className="w-full table-fixed border-collapse">
        <TableHeader className="font-lusitana text-base">
          <TableRow>
            <TableHead className="w-[70%]">Item and Description</TableHead>
            <TableHead className="w-[30%] text-end">Qty / Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cartItems.map((orderedCartItem) => (
            <Entry key={orderedCartItem.id} orderedCartItem={orderedCartItem} />
          ))}
        </TableBody>
        <TableFooter className="font-lusitana text-base">
          <TableRow>
            <TableHead className="text-end">Total Qty / Subtotal:</TableHead>
            <TableHead className="truncate text-end">
              {totalQty} / {formatCurrency(subTotal)}
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="text-end">Taxes:</TableHead>
            <TableHead className="truncate text-end">{formatCurrency(taxAmount)}</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="text-end">Shipping:</TableHead>
            <TableHead className="truncate text-end">{formatCurrency(shippingCost)}</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="text-end underline">TOTAL:</TableHead>
            <TableHead className="truncate text-end underline">{formatCurrency(totalPaid)}</TableHead>
          </TableRow>
        </TableFooter>
      </Table>
    </section>
  );
}
