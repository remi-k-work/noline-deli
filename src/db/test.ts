// Load environment variables
import "dotenv/config";

// other libraries
import seedOrder from "./seed/order";

async function main() {
  try {
    await seedOrder(10);
  } catch (error) {
    console.error("An error occurred:", error);
    process.exit(1);
  }
}

// Execute the main function
main();
