// other libraries
import Stripe from "stripe";

// types
interface ShipToProps {
  paymentIntent: Stripe.PaymentIntent;
}

export default function ShipTo({ paymentIntent: { shipping } }: ShipToProps) {
  if (!shipping || !shipping.address) return;

  const {
    name,
    address: { line1, line2, city, state, postal_code, country },
  } = shipping;

  return (
    <>
      {name && (
        <p>
          <b>{name}</b>
        </p>
      )}
      {line1 && <p>{line1}</p>}
      {line2 && <p>{line2}</p>}
      {(city || state) && <p>{[city, state].filter(Boolean).join(", ")}</p>}
      {postal_code && <p>{postal_code}</p>}
      {country && (
        <p>
          <b>{country}</b>
        </p>
      )}
    </>
  );
}
