// next
import { cookies } from "next/headers";

// prisma and db access
import { Prisma } from "@prisma/client";
import prisma from "@/services/prisma";
import { getBrand } from "@/features/manager/brands/db";
import { getCategory, getSubCategory } from "@/features/manager/categories/db";
import { getProduct } from "@/features/manager/products/db";

// Name of the cookie that stores the created-by-user value
const CREATED_BY_USER_COOKIE = "createdByUser";

export async function getCreatedByUser() {
  // Try obtaining the created-by-user value from a local cookie
  const createdByUser = (await cookies()).get(CREATED_BY_USER_COOKIE)?.value;

  // We obtained the created-by-user value; ensure that it is a valid uuid recognized by postgres
  if (createdByUser && createdByUser.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/)) {
    // It is valid; however, we still need to make sure that the user actually exists in the database
    return (await prisma.user.findUnique({ where: { id: createdByUser } }))?.id;
  }

  return undefined;
}

export async function setCreatedByUser() {
  // Establish a new created-by-user value and save it in a cookie for future reference
  return await prisma.$transaction(async (tx) => {
    // Execute those two stages in a transaction to succeed or fail as a whole
    const user = await tx.user.create({ data: { name: "user", email: `${crypto.randomUUID()}@user.com`, role: "USER" } });

    // If the cookie setting fails, the transaction will be rolled back rather than creating a new user
    (await cookies()).set(CREATED_BY_USER_COOKIE, user.id, { maxAge: 2592000, httpOnly: true, sameSite: "strict" });

    // Finally, return the new created-by-user value
    return user.id;
  });
}

// 1) View live content that is only created by admins
// 2) If an administrator is impersonated, still check for the "isApproved" flag, which can only be changed at the database level
// 3) Combine the above with the specific (local cookie) user's content
export async function whereAdminApproved<WhereT>(): Promise<WhereT> {
  return { AND: { OR: [{ user: { role: "ADMIN" }, isApproved: true }, { createdBy: await getCreatedByUser() }] } } as WhereT;
}

// Gather only the stuff created by you, the user
export async function whereCreatedByYou<WhereT>(): Promise<WhereT> {
  return { createdBy: await getCreatedByUser() } as WhereT;
}

export async function whereAdminApprovedOnly<WhereT>(): Promise<WhereT> {
  return { user: { role: "ADMIN" }, isApproved: true } as WhereT;
}

// Make sure to count only admin-approved + current user-created products
export async function countAdminApprovedProducts<SelectT>(): Promise<SelectT> {
  return { _count: { select: { products: { where: { ...(await whereAdminApproved<Prisma.ProductWhereInput>()) } } } } } as SelectT;
}

export async function isAccessDeniedTo(itemType: "brand" | "category" | "subCategory" | "product", itemId: string) {
  switch (itemType) {
    case "brand":
      const brand = await getBrand(itemId);
      if (brand) {
        const {
          createdBy,
          user: { role },
        } = brand;

        // Cannot alter any admin-generated content (stops impersonation, as admin will only use the database directly)
        if (role === "ADMIN") return true;

        // Cannot alter someone else's content
        if (createdBy !== (await getCreatedByUser())) return true;
      }
      // Access is granted
      return false;

    case "category":
      const category = await getCategory(itemId);
      if (category) {
        const {
          createdBy,
          user: { role },
        } = category;

        // Cannot alter any admin-generated content (stops impersonation, as admin will only use the database directly)
        if (role === "ADMIN") return true;

        // Cannot alter someone else's content
        if (createdBy !== (await getCreatedByUser())) return true;
      }
      // Access is granted
      return false;

    case "subCategory":
      const subCategory = await getSubCategory(itemId);
      if (subCategory) {
        const {
          createdBy,
          user: { role },
        } = subCategory;

        // Cannot alter any admin-generated content (stops impersonation, as admin will only use the database directly)
        if (role === "ADMIN") return true;

        // Cannot alter someone else's content
        if (createdBy !== (await getCreatedByUser())) return true;
      }
      // Access is granted
      return false;

    case "product":
      const product = await getProduct(itemId);
      if (product) {
        const {
          createdBy,
          user: { role },
        } = product;

        // Cannot alter any admin-generated content (stops impersonation, as admin will only use the database directly)
        if (role === "ADMIN") return true;

        // Cannot alter someone else's content
        if (createdBy !== (await getCreatedByUser())) return true;
      }
      // Access is granted
      return false;

    default:
      // Access is denied by default
      return true;
  }
}
