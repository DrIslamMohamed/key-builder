import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { PageConfig, DEFAULT_PAGE_CONFIG } from "@/lib/types";
import BuilderPage from "@/components/builder/BuilderPage";

export default async function BuilderRoute() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  let page = await prisma.page.findUnique({
    where: { userId: session.user.id },
  });

  // If member has no page yet (shouldn't happen with admin flow, but safety net)
  if (!page) {
    const slug = session.user.name
      ?.toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "") || session.user.id;

    page = await prisma.page.create({
      data: {
        slug,
        config: DEFAULT_PAGE_CONFIG,
        userId: session.user.id,
      },
    });
  }

  const config = page.config as PageConfig;

  return (
    <BuilderPage
      initialConfig={config}
      initialPublished={page.published}
      initialSlug={page.slug}
      userName={session.user.name || session.user.email}
    />
  );
}
