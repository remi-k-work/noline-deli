// prisma and db access
import type { Prisma } from "@prisma/client";
import prisma from "@/services/prisma";

// other libraries
import { faker } from "@faker-js/faker";
import { subDays, subMinutes } from "date-fns";
import PathFinder from "@/lib/PathFinder";

// Define the array of numbers for more images for each product category
const MORE_IMAGES_FOR_CATEGORY = {
  "b6a52429-c0c8-4a2a-84e2-67e8ec8a0d0c": generateNumbersForMoreImages(21),
  "78a6aaaa-6680-446e-b3c4-497ccaf59e13": generateNumbersForMoreImages(20),
  "efb0d25d-9f48-4b1d-8b20-6513710a854a": generateNumbersForMoreImages(24),
} as const;

// Generate a random "createdAt" date within a specified range of past days
export function generateRandomCreatedAt(daysRange: number = 30): Date {
  // Generate random days and minutes (1440 minutes in a day)
  const randomDays = faker.number.int({ min: 0, max: daysRange });
  const randomMinutes = faker.number.int({ min: 0, max: 1440 });

  // Subtract days and minutes to get a past date
  return subMinutes(subDays(new Date(), randomDays), randomMinutes);
}

// Generate a random price in cents (integer) within a specified percentage range of a base price
export function generateRandomPriceInCents(basePriceInCents: number, percentageVariation: number = 0.1): number {
  // Calculate the variation as a percentage of the base price
  const variation = Math.round(basePriceInCents * percentageVariation);

  // Generate the price as a string using faker.commerce.price()
  const priceString = faker.commerce.price({ min: (basePriceInCents - variation) / 100, max: (basePriceInCents + variation) / 100 });

  // Parse the price string to a number and multiply by 100 to get cents
  return Math.round(Number(priceString) * 100);
}

// Generate an array of more images for a product category
export function generateMoreImagesForCategory(createdBy: string, categoryId: string): Prisma.ProductImageCreateManyProductInput[] {
  return getRandomSubset(MORE_IMAGES_FOR_CATEGORY[categoryId as keyof typeof MORE_IMAGES_FOR_CATEGORY]).map((imageNumber) => ({
    imageUrl: PathFinder.toMoreImageForCategory(categoryId, imageNumber),
    createdBy,
    createdAt: generateRandomCreatedAt(90),
    isApproved: true,
  }));
}

// Pick a bunch of random product ids as if they were thrown into the shopping cart
async function pickBunchOfRandomProductIds(): Promise<string[]> {
  // First get all the admin-approved products in our database
  const approvedProducts = await prisma.product.findMany({ where: { isApproved: true }, select: { id: true } });

  // Then pick a random subset of them - the subset will be of random size as well
  return getRandomSubset(
    approvedProducts.map((product) => product.id),
    faker.number.int({ min: 1, max: 6 }),
  );
}

// Pick a random guest test customer
export async function pickRandomGuestTestCustomer(): Promise<string> {
  const allGuestTestCustomers = await prisma.customer.findMany({ where: { isGuest: true, isTest: true }, select: { id: true } });
  return faker.helpers.arrayElement(allGuestTestCustomers).id;
}

// Generate an array of ordered items from a bunch of random product ids as if they were thrown into the shopping cart
export async function generateOrderedItemsFromProductIds() {
  const orderedItems: Prisma.OrderedItemCreateManyOrderInput[] = [];

  let totalQty = 0;
  let subTotal = 0;
  for (const randomProductId of await pickBunchOfRandomProductIds()) {
    const randomProduct = await prisma.product.findUnique({ where: { id: randomProductId }, include: { brand: true, category: true, subCategory: true } });
    if (!randomProduct) continue;

    const { id: productId, name, description, imageUrl, price, brand, category, subCategory } = randomProduct;
    const quantity = faker.number.int({ min: 1, max: 5 });

    orderedItems.push({
      productId,
      quantity,
      name,
      description,
      imageUrl,
      price,
      total: quantity * price,
      brandName: brand.name,
      brandLogo: brand.logoUrl,
      categoryName: category.name,
      subCategoryName: subCategory?.name,
    });

    totalQty += quantity;
    subTotal += quantity * price;
  }

  return { orderedItems, totalQty, subTotal };
}

// Generate a random subset of a specified length from an input array
function getRandomSubset(inputArray: readonly string[], subsetSize: number = 2): string[] {
  // Create a shuffled copy to avoid modifying the original array
  const shuffledArray = [...inputArray];

  // Implement the Fisher-Yates shuffle algorithm
  for (let currentIndex = shuffledArray.length - 1; currentIndex > 0; currentIndex--) {
    // Generate a random index within the unsorted portion of the array
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));

    // Swap the elements at the current and random indices
    [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[currentIndex]];
  }

  // Return the random subset of the shuffled array
  return shuffledArray.slice(0, subsetSize);
}

// Define the array of numbers for more images
function generateNumbersForMoreImages(count: number): string[] {
  return Array.from({ length: count }, (_, i) => String(i + 1).padStart(2, "0"));
}
