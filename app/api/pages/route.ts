import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const page = await prisma.page.findUnique({
    where: { userId: session.user.id },
  });

  return NextResponse.json({ page });
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { config } = await request.json();

  const page = await prisma.page.update({
    where: { userId: session.user.id },
    data: { config },
  });

  return NextResponse.json({ page });
}
