// Load environment variables
import "dotenv/config";

async function main() {
  try {
    // Your main logic here
    console.log("Starting script...");

    // Access environment variables
    const databaseUrl = process.env.DATABASE_URL;
    console.log(`Database URL: ${databaseUrl}`);

    // Perform database seeding or other tasks
    await seedDatabase();

    console.log("Script completed successfully.");
  } catch (error) {
    console.error("An error occurred:", error);
    process.exit(1);
  }
}

async function seedDatabase() {
  // Your database seeding logic here
  console.log("Seeding database...");

  // ... (Database operations)
  console.log("Database seeding complete");
}

// Execute the main function
main();
