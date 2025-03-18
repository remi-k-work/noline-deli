// Load environment variables
import "dotenv/config";

// other libraries
import { allStripeGuestCustomers } from "@/features/cart/db/orders";
import { faker } from "@faker-js/faker";

async function main() {
  try {
    console.log(faker.helpers.arrayElement(await allStripeGuestCustomers()));
  } catch (error) {
    console.error("An error occurred:", error);
    process.exit(1);
  }
}

// Execute the main function
main();
