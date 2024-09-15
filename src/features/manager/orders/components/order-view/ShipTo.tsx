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
      {line1 && <p>{line1},</p>}
      {line2 && <p>{line2},</p>}
      {city && <p>{city},</p>}
      {state && <span>{state}</span>}
      &nbsp;
      {postal_code && <span>{postal_code}</span>}
      {country && (
        <p>
          <b>{country}</b>
        </p>
      )}
    </>
  );
}
