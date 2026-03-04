import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const page = await prisma.page.findUnique({
    where: { userId: session.user.id },
  });

  if (!page) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  const updated = await prisma.page.update({
    where: { userId: session.user.id },
    data: { published: !page.published },
  });

  return NextResponse.json({ published: updated.published, slug: updated.slug });
}
