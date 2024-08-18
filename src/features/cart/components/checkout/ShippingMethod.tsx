"use client";

// other libraries
import { cn } from "@/lib/utils";

// types
interface ShippingMethodProps {
  onShippingMethodChanged: (shippingCost: number) => void;
  className?: string;
}

export const SHIPPING_COSTS: readonly number[] = [1000, 1500, 2500];

export default function ShippingMethod({ onShippingMethodChanged, className }: ShippingMethodProps) {
  return (
    <section className={cn("text-center", className)}>
      <label htmlFor="shippingMethod">Shipping Method</label>
      <br />
      <select
        id="shippingMethod"
        name="shippingMethod"
        className="select"
        defaultValue={SHIPPING_COSTS[0]}
        onChange={(ev) => onShippingMethodChanged(Number(ev.target.value))}
      >
        <option value={SHIPPING_COSTS[0]}>Standard</option>
        <option value={SHIPPING_COSTS[1]}>Express</option>
        <option value={SHIPPING_COSTS[2]}>Overnight</option>
      </select>
    </section>
  );
}
