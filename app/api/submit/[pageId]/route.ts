import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ pageId: string }> }
) {
  const { pageId } = await params;
  const { name, email, phone } = await request.json();

  if (!name || !email || !phone) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  const page = await prisma.page.findUnique({ where: { id: pageId } });
  if (!page || !page.published) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  await prisma.formSubmission.create({
    data: { pageId, name, email, phone },
  });

  return NextResponse.json({ success: true });
}
