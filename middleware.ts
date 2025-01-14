// middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: Request) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });
  console.log("Token:", token);

  // If token exists, allow the request to continue
  if (token) {
    return NextResponse.next();
  }

  // Redirect unauthenticated requests to the sign-in page
  const signInUrl = new URL("/sign-in", request.url);
  return NextResponse.redirect(signInUrl);
}

// Protect specific routes
export const config = {
  matcher: ["/api/protected-route", "/dashboard/:path*", "/api/authenticated-endpoint"], // Define protected routes
};
