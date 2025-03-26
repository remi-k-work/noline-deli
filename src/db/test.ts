// Load environment variables
import "dotenv/config";

// prisma and db access
import { OrderedItemStatus } from "@prisma/client";

// other libraries
import seedOrder from "./seed/order";
import { faker } from "@faker-js/faker";

async function main() {
  try {
    await seedOrder(90);
    // console.log(faker.helpers.arrayElement(Object.values(OrderedItemStatus)));
  } catch (error) {
    console.error("An error occurred:", error);
    process.exit(1);
  }
}

// Execute the main function
main();
