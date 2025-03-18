// prisma and db access
import prisma from "@/services/prisma";

// other libraries
import { faker } from "@faker-js/faker";
import Stripe from "stripe";
import stripe from "@/services/stripe";
import { generateRandomCreatedAt } from "./helpers";
import { deleteAllStripeCustomers } from "./helpers/stripe";

export default async function seedCustomer(numberOfCustomers: number) {
  // Delete all customers from stripe first
  await deleteAllStripeCustomers();

  for (let i = 0; i < numberOfCustomers; i++) {
    // Generate random customer data using the 'faker' library
    const gender = faker.person.sexType();
    const firstName = faker.person.firstName(gender);
    const lastName = faker.person.lastName(gender);

    const customerId = faker.string.uuid();
    const email = faker.internet.email({ firstName, lastName });
    const name = faker.person.fullName({ firstName, lastName });

    // Create a new stripe customer that is linked to our existing customer
    const stripeCustomer: Stripe.Customer = await stripe.customers.create({
      email,
      name,
      address: {
        country: faker.location.countryCode(),
        city: faker.location.city(),
        line1: faker.location.streetAddress(),
        postal_code: faker.location.zipCode(),
        state: faker.location.state(),
      },
      phone: faker.phone.number({ style: "national" }),
      preferred_locales: ["en"],

      // Store the generated customer id in stripe's metadata for linking
      metadata: { customerId },
    });

    // Create a corresponding customer record in our database; this ensures that our database and stripe are synchronized
    await prisma.customer.create({ data: { id: customerId, stripeCustomerId: stripeCustomer.id, email, name, createdAt: generateRandomCreatedAt(90) } });
  }
}
