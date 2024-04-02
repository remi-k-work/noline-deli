// Pretend it is hitting the network
export async function waait() {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
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
