// next
import { ReadonlyURLSearchParams } from "next/navigation";

// Pretend it is hitting the network
export async function waait() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, 3000);
  });
}

// Add a delay for a certain time in milliseconds
export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Simulate a computationally expensive operation
export function compute(ms: number) {
  const startTime = performance.now();
  while (performance.now() - startTime < ms) {}
}

// Format the price from cents to dollars using usd currency
export function formatPrice(priceInCents: number) {
  return (priceInCents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
}

// Carry over currently used search params alongside the provided pathname
export const routeCarrySearchParams = (pathname: string, searchParams: ReadonlyURLSearchParams, paramsToDel?: string[], paramsToSet?: [string, string][]) => {
  const params = new URLSearchParams(searchParams);

  // Any search params to delete?
  if (paramsToDel) {
    for (const paramToDel of paramsToDel) {
      params.delete(paramToDel);
    }
  }

  // Any search params to set?
  if (paramsToSet) {
    for (const paramToSet of paramsToSet) {
      // Was the param value provided?
      if (paramToSet[1]) {
        // Yes, go ahead and set its value
        params.set(paramToSet[0], paramToSet[1]);
      } else {
        // Otherwise, completely remove that unnecessary param
        params.delete(paramToSet[0]);
      }
    }
  }

  // When there are no search params present, do not include the unnecessary "?" in the final url
  return params.toString() ? `${pathname}?${params.toString()}` : `${pathname}`;
};
