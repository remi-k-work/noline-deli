// component css styles
import styles from "./index.module.css";

// prisma and db access
import type { DerivedCartWithItems } from "../../db/cart";

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
  orderedCart: DerivedCartWithItems;
  paymentIntent: Stripe.PaymentIntent;
  className?: string;
}

export default function OrderDetails({
  orderedCart: { cartItems, totalQty, subTotal, taxAmount },
  paymentIntent: {
    status,
    metadata: { shippingCost },
  },
  className,
}: OrderDetailsProps) {
  // Do not render anything in the event of an unsuccessful payment intent
  if (status !== "succeeded" && status !== "processing") return;

  return (
    <section className={cn(styles["order-details"], className)}>
      <h2 className="font-lusitana">
        <ShoppingBagIcon width={64} height={64} />
        Order Details
      </h2>
      <Table>
        <TableHeader className="font-lusitana">
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
        <TableFooter className="font-lusitana">
          <TableRow>
            <TableHead className="text-end text-xl">Total Qty / Subtotal:</TableHead>
            <TableHead className="overflow-clip text-end text-xl whitespace-nowrap">
              {totalQty} / {formatCurrency(subTotal)}
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="text-end text-xl">Taxes:</TableHead>
            <TableHead className="overflow-clip text-end text-xl whitespace-nowrap">{formatCurrency(taxAmount)}</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="text-end text-xl">Shipping:</TableHead>
            <TableHead className="overflow-clip text-end text-xl whitespace-nowrap">{formatCurrency(Number(shippingCost))}</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="text-end text-2xl underline">TOTAL:</TableHead>
            <TableHead className="overflow-clip text-end text-2xl whitespace-nowrap underline">
              {formatCurrency(subTotal + taxAmount + Number(shippingCost))}
            </TableHead>
          </TableRow>
        </TableFooter>
      </Table>
    </section>
  );
}
