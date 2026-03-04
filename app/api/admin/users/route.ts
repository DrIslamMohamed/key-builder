import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { DEFAULT_PAGE_CONFIG } from "@/lib/types";

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

async function uniqueSlug(base: string): Promise<string> {
  let slug = base;
  let i = 1;
  while (await prisma.page.findUnique({ where: { slug } })) {
    slug = `${base}-${i++}`;
  }
  return slug;
}

export async function GET() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const users = await prisma.user.findMany({
    where: { role: "MEMBER" },
    include: { page: { select: { slug: true, published: true, submissions: { select: { id: true } } } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ users });
}

export async function POST(request: Request) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email already in use" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const slug = await uniqueSlug(slugify(name));

  const config = {
    ...DEFAULT_PAGE_CONFIG,
    meta: { ...DEFAULT_PAGE_CONFIG.meta, memberName: name },
  };

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "MEMBER",
      page: {
        create: {
          slug,
          config,
        },
      },
    },
    include: { page: true },
  });

  return NextResponse.json({ user });
}
