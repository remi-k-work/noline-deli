"use client";

// react
import { ReactNode } from "react";

// other libraries
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// types
interface ElementsProviderProps {
  amount: number;
  children: ReactNode;
}

// Make sure to call loadstripe outside of a component’s render to avoid recreating the stripe object on every render
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function ElementsProvider({ amount, children }: ElementsProviderProps) {
  // Pass the resulting promise from loadstripe to the elements provider; also create an elements instance without an intent
  return (
    <Elements stripe={stripePromise} options={{ mode: "payment", currency: "usd", amount, locale: "en" }}>
      {children}
    </Elements>
  );
}
