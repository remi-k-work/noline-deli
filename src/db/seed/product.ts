// prisma and db access
import prisma from "@/services/prisma";

// other libraries
import { generateRandomCreatedAt, generateRandomPriceInCents } from "./helpers";

// Import the original json data that mongodb exported
import Product from "@/db/data/noline-deli.Product.json";

export default async function seedProduct(createdBy: string) {
  for (const { id, brandId, categoryId, subCategoryId, name, description, imageUrl, price, freeShipping } of Product) {
    await prisma.product.create({
      data: {
        id,
        brandId,
        categoryId,
        subCategoryId,
        name,
        description,
        imageUrl,
        price: generateRandomPriceInCents(price, 0.3),
        freeShipping,
        createdBy,
        createdAt: generateRandomCreatedAt(90),
        isApproved: true,
      },
    });
  }
}
