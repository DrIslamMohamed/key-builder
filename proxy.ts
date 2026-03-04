import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl, auth: session } = req;

  const isLoggedIn = !!session;
  const isAdmin = session?.user?.role === "ADMIN";

  if (nextUrl.pathname.startsWith("/builder") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  if (nextUrl.pathname.startsWith("/admin") && !isAdmin) {
    if (!isLoggedIn) return NextResponse.redirect(new URL("/login", nextUrl));
    return NextResponse.redirect(new URL("/builder", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/builder/:path*", "/admin/:path*"],
};
