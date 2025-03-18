// other libraries
import Stripe from "stripe";
import stripe from "@/services/stripe";

// Delete all customers from stripe
export async function deleteAllStripeCustomers(): Promise<void> {
  // Handle pagination using the `starting_after` parameter
  let startingAfter: string | undefined = undefined;

  console.log("Deleting all stripe customers...");

  while (true) {
    // List customers with pagination
    const response: Stripe.Response<Stripe.ApiList<Stripe.Customer>> = await stripe.customers.list({ limit: 100, starting_after: startingAfter });

    // Delete each customer by id
    for (const customer of response.data) if (customer.id) await stripe.customers.del(customer.id);

    // Exit loop if no more customers
    if (!response.has_more) break;

    // Update startingAfter for next page, or break if data is empty or missing an id
    if (response.data.length > 0 && response.data[response.data.length - 1].id) {
      startingAfter = response.data[response.data.length - 1].id;
    } else {
      break;
    }
  }
}
