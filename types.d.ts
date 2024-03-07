// prisma and db access
import { Prisma, Product } from "@prisma/client";

// interface ProductExcerptProps {
//   product: Prisma.ProductGetPayload<{ include: { moreImages: true } }>;
// }
interface ProductExcerptProps {
  product: Product;
}
