// other libraries
import { faker } from "@faker-js/faker";
import { subDays, subMinutes } from "date-fns";

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
