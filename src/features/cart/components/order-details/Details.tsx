// component css styles
import styles from "./Details.module.css";

// prisma and db access
import { DerivedCartWithItems } from "../../cartDb";

// other libraries
import { cn } from "@/lib/utils";
import Stripe from "stripe";
import { formatPrice } from "@/lib/helpers";

// components
import { Table, TableBody, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Entry from "./Entry";

// assets
import { lusitana } from "@/assets/fonts";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";

// types
interface DetailsProps {
  orderedCart: DerivedCartWithItems;
  paymentIntent: Stripe.PaymentIntent;
  className?: string;
}

export default function Details({
  orderedCart: { cartItems, totalQty, subTotal, taxAmount },
  paymentIntent: {
    status,
    metadata: { shippingCost },
  },
  className,
}: DetailsProps) {
  // Do not render anything in the event of an unsuccessful payment intent
  if (status !== "succeeded" && status !== "processing") return;

  return (
    <section className={cn(styles["details"], className)}>
      <h2 className={lusitana.className}>
        <ShoppingBagIcon width={64} height={64} />
        Order Details
      </h2>
      <Table>
        <TableHeader className={lusitana.className}>
          <TableRow>
            <TableHead className="w-[60%]">Item</TableHead>
            <TableHead className="w-[20%] text-center">Qty</TableHead>
            <TableHead className="w-[20%] text-end">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cartItems.map((orderedCartItem) => (
            <Entry key={orderedCartItem.id} orderedCartItem={orderedCartItem} />
          ))}
        </TableBody>
        <TableFooter className={lusitana.className}>
          <TableRow>
            <TableHead className="text-end text-xl">Total Qty:</TableHead>
            <TableHead className="text-center text-xl">{totalQty}</TableHead>
            <TableHead>&nbsp;</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="text-end text-xl">Subtotal:</TableHead>
            <TableHead colSpan={2} className="overflow-clip whitespace-nowrap text-end text-xl">
              {formatPrice(subTotal)}
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="text-end text-xl">Taxes:</TableHead>
            <TableHead colSpan={2} className="overflow-clip whitespace-nowrap text-end text-xl">
              {formatPrice(taxAmount)}
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="text-end text-xl">Shipping:</TableHead>
            <TableHead colSpan={2} className="overflow-clip whitespace-nowrap text-end text-xl">
              {formatPrice(Number(shippingCost))}
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="text-end text-2xl underline">TOTAL:</TableHead>
            <TableHead colSpan={2} className="overflow-clip whitespace-nowrap text-end text-2xl underline">
              {formatPrice(subTotal + taxAmount + Number(shippingCost))}
            </TableHead>
          </TableRow>
        </TableFooter>
      </Table>
    </section>
  );
}
