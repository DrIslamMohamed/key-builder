import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import AdminClient from "./AdminClient";

export default async function AdminPage() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/login");

  const members = await prisma.user.findMany({
    where: { role: "MEMBER" },
    include: {
      page: {
        select: {
          id: true,
          slug: true,
          published: true,
          _count: { select: { submissions: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return <AdminClient members={members} />;
}
