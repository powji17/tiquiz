import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isProtectedPage = pathname.startsWith("/dashboard");
  const isAdminPage = pathname.startsWith("/admin");

  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAdminPage && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAdminPage && token?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register"],
};