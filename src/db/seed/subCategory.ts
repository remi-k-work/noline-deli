// prisma and db access
import prisma from "@/services/prisma";

// other libraries
import { generateRandomCreatedAt } from "./helpers";

// Import the original json data that mongodb exported
import SubCategory from "@/db/data/noline-deli.SubCategory.json";

export default async function seedSubCategory(createdBy: string) {
  for (const { id, categoryId, name } of SubCategory) {
    await prisma.subCategory.create({ data: { id, categoryId, name, createdBy, createdAt: generateRandomCreatedAt(90), isApproved: true } });
  }
}
