// prisma and db access
import prisma from "@/services/prisma";

// other libraries
import PathFinder from "@/lib/PathFinder";
import { generateMoreImagesForCategory, generateRandomCreatedAt, generateRandomPriceInCents } from "./helpers";

// Import the original json data that mongodb exported
import Product from "@/db/data/noline-deli.Product.json";

export default async function seedProduct(createdBy: string) {
  const categoryId = "efb0d25d-9f48-4b1d-8b20-6513710a854a";
  console.log(generateMoreImagesForCategory(createdBy, categoryId));
  return;
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
        moreImages: {
          createMany: {
            data: [
              {
                imageUrl: PathFinder.toMoreImageForCategory("78a6aaaa-6680-446e-b3c4-497ccaf59e13", "01"),
                createdBy,
                createdAt: generateRandomCreatedAt(90),
                isApproved: true,
              },
              {
                imageUrl: PathFinder.toMoreImageForCategory("78a6aaaa-6680-446e-b3c4-497ccaf59e13", "02"),
                createdBy,
                createdAt: generateRandomCreatedAt(90),
                isApproved: true,
              },
            ],
          },
        },
      },
    });
  }
}
