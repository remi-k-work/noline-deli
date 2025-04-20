// Load environment variables
import "dotenv/config";

// prisma and db access
// import { OrderedItemStatus } from "@prisma/client";

// other libraries
// import seedOrder from "./seed/order";
// import { faker } from "@faker-js/faker";
import { cancelOrderForCustomer } from "@/features/storefront/db/customers";

async function main() {
  try {
    // await seedOrder(90);
    // console.log(faker.helpers.arrayElement(Object.values(OrderedItemStatus)));
    await cancelOrderForCustomer("0704c418-c2ed-4e85-9145-70c4070d1a99", "0edbb866-296c-4d23-9793-08f63fb50d98");
  } catch (error) {
    console.error("An error occurred:", error);
    process.exit(1);
  }
}

// Execute the main function
main();
