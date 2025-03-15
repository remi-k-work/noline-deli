// prisma and db access
import prisma from "@/services/prisma";

// other libraries
import { generateRandomCreatedAt } from "./helpers";

// Import the original json data that mongodb exported
import Category from "@/db/data/noline-deli.Category.json";

export default async function seedCategory(createdBy: string) {
  for (const { id, name } of Category) {
    await prisma.category.create({ data: { id, name, createdBy, createdAt: generateRandomCreatedAt(90), isApproved: true } });
  }
}
