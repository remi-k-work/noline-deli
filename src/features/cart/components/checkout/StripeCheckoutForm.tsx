"use client";

// server actions and mutations
import { fetchClientSecret } from "@/features/cart/actions/checkout";

// other libraries
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// types
interface StripeCheckoutFormProps {
  customerId: string;
}

// Make sure to call loadstripe outside of a component’s render to avoid recreating the stripe object on every render
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function StripeCheckoutForm({ customerId }: StripeCheckoutFormProps) {
  return (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret: fetchClientSecret.bind(null, customerId) }}>
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
}
