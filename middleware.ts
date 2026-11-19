import { NextResponse, type NextRequest } from "next/server";

/**
 * Language routing.
 *   /about/      -> English  (served internally from /en/about/)
 *   /hi/about/   -> Hindi
 *   /mr/about/   -> Marathi
 *   /en/about/   -> redirected to /about/ (one canonical address per page)
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const first = pathname.split("/")[1];

  if (first === "en") {
    const url = req.nextUrl.clone();
    url.pathname = pathname.replace(/^\/en/, "") || "/";
    return NextResponse.redirect(url, 308);
  }
  if (first === "hi" || first === "mr") return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "/" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // skip API, Next internals, the CMS and any file with an extension (images, sitemap.xml, robots.txt ...)
  matcher: ["/((?!api|_next|admin|.*\\..*).*)"],
};
