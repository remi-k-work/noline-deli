// Load environment variables
import "dotenv/config";

// other libraries
import seedUser from "./seed/user";
import seedBrand from "./seed/brand";
import seedCategory from "./seed/category";
import seedSubCategory from "./seed/subCategory";
import seedProduct from "./seed/product";
import seedCustomer from "./seed/customer";

// UUID for the admin user
const ADMIN_USER_ID = crypto.randomUUID();

async function main() {
  try {
    // Perform database seeding or other tasks
    console.log("Seeding database...");

    await seedUser(ADMIN_USER_ID);
    await seedBrand(ADMIN_USER_ID);
    await seedCategory(ADMIN_USER_ID);
    await seedSubCategory(ADMIN_USER_ID);
    await seedProduct(ADMIN_USER_ID);
    await seedCustomer(10);

    console.log("Database seeding complete.");
  } catch (error) {
    console.error("An error occurred:", error);
    process.exit(1);
  }
}

// Execute the main function
main();
