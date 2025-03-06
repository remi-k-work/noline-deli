"use client";

// other libraries
import { cn } from "@/lib/utils";

// types
interface ShippingMethodProps {
  onShippingMethodChanged: (shippingCost: number, shippingMethod: string) => void;
  className?: string;
}

export const SHIPPING_COSTS: readonly number[] = [1000, 1500, 2500] as const;
export const SHIPPING_METHODS: readonly string[] = ["Standard", "Express", "Overnight"] as const;

export default function ShippingMethod({ onShippingMethodChanged, className }: ShippingMethodProps) {
  return (
    <section className={cn("text-center", className)}>
      <label htmlFor="shippingMethod">Shipping Method</label>
      <br />
      <select
        id="shippingMethod"
        name="shippingMethod"
        defaultValue={SHIPPING_COSTS[0]}
        onChange={(ev) => onShippingMethodChanged(Number(ev.target.value), ev.target.options[ev.target.selectedIndex].text)}
      >
        <option value={SHIPPING_COSTS[0]}>{SHIPPING_METHODS[0]}</option>
        <option value={SHIPPING_COSTS[1]}>{SHIPPING_METHODS[1]}</option>
        <option value={SHIPPING_COSTS[2]}>{SHIPPING_METHODS[2]}</option>
      </select>
    </section>
  );
}
