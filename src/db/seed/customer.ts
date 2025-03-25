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
    const phone = faker.phone.number({ style: "national" });
    const address = {
      country: faker.location.countryCode(),
      city: faker.location.city(),
      line1: faker.location.streetAddress(),
      line2: faker.location.secondaryAddress(),
      postal_code: faker.location.zipCode(),
      state: faker.location.state(),
    };

    // Create a new stripe customer that is linked to our existing customer
    const stripeCustomer: Stripe.Customer = await stripe.customers.create({
      email,
      name,
      phone,
      address,
      shipping: { name, address },
      preferred_locales: ["en"],

      // Store the generated customer id in stripe's metadata for linking
      metadata: { customerId },
    });

    // Create a payment method with `allow_redisplay: always` and attach it to the customer as the default one
    const paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: { token: "tok_visa" },
      allow_redisplay: "always",
      billing_details: { email, name, phone, address },
    });
    await stripe.paymentMethods.attach(paymentMethod.id, { customer: stripeCustomer.id });
    await stripe.customers.update(stripeCustomer.id, { invoice_settings: { default_payment_method: paymentMethod.id } });

    // Create a corresponding customer record in our database; this ensures that our database and stripe are synchronized
    await prisma.customer.create({ data: { id: customerId, stripeCustomerId: stripeCustomer.id, email, name, createdAt: generateRandomCreatedAt(90) } });
  }
}
