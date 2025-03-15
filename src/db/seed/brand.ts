// prisma and db access
import prisma from "@/services/prisma";

// other libraries
import { generateRandomCreatedAt } from "./helpers";

// Import the original json data that mongodb exported
import Brand from "@/db/data/noline-deli.Brand.json";

export default async function seedBrand(createdBy: string) {
  for (const { id, name, logoUrl } of Brand) {
    await prisma.brand.create({ data: { id, name, logoUrl, createdBy, createdAt: generateRandomCreatedAt(90), isApproved: true } });
  }
}
