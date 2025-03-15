// prisma and db access
import prisma from "@/services/prisma";

// Load environment variables
import "dotenv/config";

// Array of all available table names
const TABLES = ["Brand", "Cart", "CartsOnProducts", "Category", "Customer", "Order", "OrderedItem", "Product", "ProductImage", "SubCategory", "User"] as const;

async function main() {
  try {
    // Drop all tables so we can start from scratch
    console.log("Deleting all tables...");

    for (const table of TABLES) await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS "${table}" CASCADE;`);
  } catch (error) {
    console.error("An error occurred:", error);
    process.exit(1);
  }
}

// Execute the main function
main();
