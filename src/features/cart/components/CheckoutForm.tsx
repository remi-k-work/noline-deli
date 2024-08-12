"use client";

// react
import { FormEvent, useState } from "react";

// prisma and db access
import { DerivedCartWithItems } from "@/features/cart/cartDb";

// server actions and mutations
import { createPaymentIntent } from "../actions";

// other libraries
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/helpers";
import { AddressElement, LinkAuthenticationElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";

// components
import { ErrorMessage } from "@/features/manager/components/FormControls";

// assets
import { lusitana } from "@/assets/fonts";
import { BanknotesIcon, CreditCardIcon } from "@heroicons/react/24/solid";

// types
interface CheckoutFormProps {
  cart: DerivedCartWithItems;
  shippingCost: number;
  billAndShipCn: string;
  placeOrderCn: string;
}

export default function CheckoutForm({ cart: { id: orderedCartId, subTotal, taxAmount }, shippingCost, billAndShipCn, placeOrderCn }: CheckoutFormProps) {
  // Returns a reference to the stripe instance passed to the elements provider
  const stripe = useStripe();

  // To safely pass the payment information collected by the payment element to the stripe api
  const elements = useElements();

  // Initialize some state to keep track of the payment, show errors, and manage the user interface
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(ev: FormEvent) {
    // We do not want to let the default form submission happen here, which would refresh the page
    ev.preventDefault();

    // Stripe.js has not yet loaded; make sure to disable form submission until stripe.js has loaded
    if (!stripe || !elements) return;

    setIsLoading(true);

    // Before confirming payment, we need to validate the state of the payment element and collect any data required for wallets
    const { error: submitError } = await elements.submit();
    if (submitError) {
      // Display a human-readable message that provides additional information about the mistake; for card errors, these messages can be shown to your users
      setErrorMessage(submitError.message);
      setIsLoading(false);
      return;
    }

    const result = await createPaymentIntent({ customerEmail, orderedCartId, subTotal, taxAmount, shippingCost });
    if (!result?.data?.clientSecret) {
      setErrorMessage("We were unable to create the payment intent!");
      setIsLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret: result.data.clientSecret,
      confirmParams: {
        return_url: `${process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_SERVER_URL_PRO : process.env.NEXT_PUBLIC_SERVER_URL_DEV}/cart/order/complete`,
      },
    });

    // This point will only be reached if there is an immediate error when confirming the payment
    if (error.type === "card_error" || error.type === "validation_error") {
      setErrorMessage(error.message);
    } else {
      setErrorMessage("An unexpected error occurred.");
    }
    setIsLoading(false);
  }

  return (
    <>
      <section className={billAndShipCn}>
        <h2 className={lusitana.className}>
          <CreditCardIcon width={64} height={64} />
          Billing & Shipping
        </h2>
        <LinkAuthenticationElement onChange={(ev) => setCustomerEmail(ev.value.email)} />
        <PaymentElement />
        <AddressElement options={{ mode: "shipping" }} />
      </section>
      <form onSubmit={handleSubmit} className={cn("text-center", placeOrderCn)}>
        {errorMessage && <ErrorMessage fieldErrors={[errorMessage]} />}
        <button type="submit" className="btn btn-primary" disabled={isLoading || !stripe || !elements}>
          {isLoading ? (
            <>
              <span className="loading loading-spinner"></span>
              Processing your Order...
            </>
          ) : (
            <>
              <BanknotesIcon width={24} height={24} />
              Place Order for {formatPrice(subTotal + taxAmount + shippingCost)}
            </>
          )}
        </button>
      </form>
    </>
  );
}
