import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import UsersAdminClient from "./users-admin-client";

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);

  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <UsersAdminClient
      initialUsers={users}
      currentUserId={parseInt(session.user.id)}
    />
  );
}