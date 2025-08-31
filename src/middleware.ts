import { NextRequest, NextResponse } from "next/server";

let locales = ["en-US", "es-ES"];

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  return pathnameHasLocale ? pathname.split("/")[1] : "en-US";
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") || pathname.startsWith("/api")) {
    const response = NextResponse.next();
    response.headers.set("x-page", pathname.slice(1));
    return response;
  }

  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  if (pathnameHasLocale) {
    const response = NextResponse.next();
    response.headers.set("x-page", pathname.slice(1));
    return response;
  }

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  const response = NextResponse.redirect(request.nextUrl);
  response.headers.set("x-page", pathname.slice(1));
  return response;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next) and public files (e.g., images, favicon, etc.)
    "/((?!_next|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|svg|webp|gif|ico|txt|xml|json|css|js|woff|woff2|ttf|eot)).*)",
  ],
};
