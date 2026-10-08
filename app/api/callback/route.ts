import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function page(status: "success" | "error", payload: object) {
  const msg = `authorization:github:${status}:${JSON.stringify(payload)}`;
  const html = `<!doctype html><meta charset="utf-8"><title>Signing in...</title><p>Signing you in...</p><script>
(function(){
  var msg = ${JSON.stringify(msg).replace(/</g, "\\u003c")};
  function receive(e){ window.opener.postMessage(msg, e.origin); }
  window.addEventListener("message", receive, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script>`;
  const res = new NextResponse(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
  res.cookies.set("oauth_state", "", { maxAge: 0, path: "/api" });
  return res;
}

/** Step 2: GitHub sends the editor back here with a code; trade it for a token and hand it to the CMS window. */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookie = req.headers.get("cookie")?.match(/(?:^|; )oauth_state=([^;]+)/)?.[1];
  if (!code || !state || state !== cookie) return page("error", { message: "Invalid or expired sign-in attempt. Please try again." });

  const r = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ client_id: process.env.OAUTH_GITHUB_CLIENT_ID, client_secret: process.env.OAUTH_GITHUB_CLIENT_SECRET, code }),
  });
  const data = await r.json();
  if (!data.access_token) return page("error", { message: data.error_description || "GitHub did not return a token." });
  return page("success", { token: data.access_token, provider: "github" });
}
