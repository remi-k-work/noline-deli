"use client";

// next
import Link from "next/link";

// other libraries
import { useCartStore } from "@/features/cart/stores/cartProvider";
import { formatCurrency } from "@/lib/formatters";
import PathFinder from "@/lib/PathFinder";

// components
import { Table, TableBody, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/custom/table";
import { Button } from "@/components/ui/custom/button";
import Entry, { EntrySkeleton } from "./Entry";

// assets
import { ShoppingBagIcon } from "@heroicons/react/24/solid";

export default function CartTable() {
  // Get the state and actions we need from the cart store
  const cartItems = useCartStore((state) => state.cartItems);
  const totalQty = useCartStore((state) => state.totalQty);
  const subTotal = useCartStore((state) => state.subTotal);

  return (
    <>
      <Table className="w-full table-fixed border-collapse">
        <TableHeader className="font-lusitana text-base">
          <TableRow>
            <TableHead className="w-56">Item and Description</TableHead>
            <TableHead className="collapse w-[0%] sm:visible sm:w-[100%]">&nbsp;</TableHead>
            <TableHead className="w-42 text-end">Qty / Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cartItems.map((cartItem) => (
            <Entry key={cartItem.id} cartItem={cartItem} />
          ))}
        </TableBody>
        <TableFooter className="font-lusitana text-base">
          <TableRow>
            <TableHead colSpan={2} className="text-end">
              Total Qty / Subtotal:
            </TableHead>
            <TableHead className="truncate text-end">
              {totalQty} / {formatCurrency(subTotal)}
            </TableHead>
          </TableRow>
        </TableFooter>
      </Table>
      <br />
      <Button size="lg" className="float-end" asChild>
        <Link href={PathFinder.toSfCheckoutPage()}>
          <ShoppingBagIcon width={24} height={24} />
          Checkout Now
        </Link>
      </Button>
    </>
  );
}

export function CartTableSkeleton() {
  return (
    <>
      <Table className="w-full table-fixed border-collapse">
        <TableHeader className="font-lusitana text-base">
          <TableRow>
            <TableHead className="w-56">Item and Description</TableHead>
            <TableHead className="collapse w-[0%] sm:visible sm:w-[100%]">&nbsp;</TableHead>
            <TableHead className="w-42 text-end">Qty / Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <EntrySkeleton />
          <EntrySkeleton />
          <EntrySkeleton />
          <EntrySkeleton />
          <EntrySkeleton />
          <EntrySkeleton />
        </TableBody>
        <TableFooter className="font-lusitana text-base">
          <TableRow>
            <TableHead colSpan={2} className="text-end">
              Total Qty / Subtotal:
            </TableHead>
            <TableHead className="truncate text-end">
              <div className="bg-background h-5 animate-pulse"></div>
            </TableHead>
          </TableRow>
        </TableFooter>
      </Table>
      <br />
      <div className="bg-primary float-end h-11 w-41 animate-pulse"></div>
    </>
  );
}
