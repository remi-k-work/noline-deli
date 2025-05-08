// other libraries
import { faker } from "@faker-js/faker";

// components
import { Text } from "@react-email/components";

// types
export interface ShipToProps {
  name: string | undefined;
  line1: string | null;
  line2: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
}

// Generate a random shipping address for the preview
const gender = faker.person.sexType();
const firstName = faker.person.firstName(gender);
const lastName = faker.person.lastName(gender);

ShipTo.PreviewProps = {
  name: faker.person.fullName({ firstName, lastName }),
  line1: faker.location.streetAddress(),
  line2: faker.location.secondaryAddress(),
  city: faker.location.city(),
  state: faker.location.state(),
  postal_code: faker.location.zipCode(),
  country: faker.location.countryCode(),
};

export default function ShipTo({ name, line1, line2, city, state, postal_code, country }: ShipToProps) {
  return (
    <>
      {name && <Text className="m-0 font-bold">{name}</Text>}
      {line1 && <Text className="m-0">{line1}</Text>}
      {line2 && <Text className="m-0">{line2}</Text>}
      {(city || state) && <Text className="m-0">{[city, state].filter(Boolean).join(", ")}</Text>}
      {postal_code && <Text className="m-0">{postal_code}</Text>}
      {country && <Text className="m-0 font-bold">{country}</Text>}
    </>
  );
}
