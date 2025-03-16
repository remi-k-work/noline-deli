// prisma and db access
import type { Prisma } from "@prisma/client";

// other libraries
import { faker } from "@faker-js/faker";
import { subDays, subMinutes } from "date-fns";
import PathFinder from "@/lib/PathFinder";

// Define the array of numbers for more images for each product category
const MORE_IMAGES_FOR_CATEGORY = {
  "b6a52429-c0c8-4a2a-84e2-67e8ec8a0d0c": [],
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

// Generate a random subset of elements from an array
function getRandomSubset(array: readonly string[]): string[] {
  // Create a shallow copy of the original array to avoid modifying it
  const copiedArray = [...array];

  // Shuffle the copied array using the Fisher-Yates algorithm
  for (let i = copiedArray.length - 1; i > 0; i--) {
    // Select a random index from 0 to i
    const randomIndex = Math.floor(Math.random() * (i + 1));
    // Swap the elements at the current index and the random index
    [copiedArray[i], copiedArray[randomIndex]] = [copiedArray[randomIndex], copiedArray[i]];
  }

  // Determine a random length for the subset between 0 and the length of the array
  const subsetLength = Math.floor(Math.random() * (copiedArray.length + 1));

  // Return a new array containing the first 'subsetLength' elements of the shuffled array
  return copiedArray.slice(0, subsetLength);
}

// Define the array of numbers for more images
function generateNumbersForMoreImages(count: number): string[] {
  return Array.from({ length: count }, (_, i) => String(i + 1).padStart(2, "0"));
}
