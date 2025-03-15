// prisma and db access
import prisma from "@/services/prisma";

export default async function seedUser(adminUserId: string) {
  await prisma.user.create({ data: { id: adminUserId, email: "admin@admin.com", name: "admin", role: "ADMIN" } });
}
