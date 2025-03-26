// other libraries
import Stripe from "stripe";
import { faker } from "@faker-js/faker";

// types
interface ShipToProps {
  paymentIntent?: Stripe.PaymentIntent;
}

export default function ShipTo({ paymentIntent }: ShipToProps) {
  let name: string | undefined,
    line1: string | null,
    line2: string | null,
    city: string | null,
    state: string | null,
    postal_code: string | null,
    country: string | null;

  // If the payment intent does not exist, we must be working with a disconnected order
  const { shipping } = paymentIntent ?? {};
  if (!shipping || !shipping.address) {
    // Generate a random shipping address in that case
    const gender = faker.person.sexType();
    const firstName = faker.person.firstName(gender);
    const lastName = faker.person.lastName(gender);

    name = faker.person.fullName({ firstName, lastName });
    line1 = faker.location.streetAddress();
    line2 = faker.location.secondaryAddress();
    city = faker.location.city();
    state = faker.location.state();
    postal_code = faker.location.zipCode();
    country = faker.location.countryCode();
  } else {
    // Otherwise, use the shipping address from the payment intent
    ({
      name,
      address: { line1, line2, city, state, postal_code, country },
    } = shipping);
  }

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
