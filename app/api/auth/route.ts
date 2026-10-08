import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/** Step 1 of Decap CMS GitHub login: send the editor to GitHub to authorise. */
export function GET(req: Request) {
  const id = process.env.OAUTH_GITHUB_CLIENT_ID;
  if (!id) return new NextResponse("OAUTH_GITHUB_CLIENT_ID is not set. See README, section CMS.", { status: 500 });
  const state = randomBytes(16).toString("hex");
  const origin = new URL(req.url).origin;
  const url = new URL("https://github.com/login/oauth/authorize");
  url.searchParams.set("client_id", id);
  url.searchParams.set("redirect_uri", `${origin}/api/callback`);
  url.searchParams.set("scope", "repo,user");
  url.searchParams.set("state", state);
  const res = NextResponse.redirect(url);
  res.cookies.set("oauth_state", state, { httpOnly: true, secure: origin.startsWith("https"), sameSite: "lax", maxAge: 600, path: "/api" });
  return res;
}
