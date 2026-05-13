import { NextResponse, type NextRequest } from "next/server";

const GITHUB_AUTHORIZE_URL = "https://github.com/login/oauth/authorize";
const GITHUB_SCOPE = "public_repo,user";
const OAUTH_STATE_COOKIE = "decap_oauth_state";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const getSiteUrl = (request: NextRequest) => {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (configuredUrl) {
    return new URL(configuredUrl);
  }

  return new URL(new URL(request.url).origin);
};

export const GET = (request: NextRequest) => {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;

  if (!clientId) {
    return new NextResponse("Missing GITHUB_OAUTH_CLIENT_ID", { status: 500 });
  }

  const siteUrl = getSiteUrl(request);
  const callbackUrl = new URL("/api/decap/callback", siteUrl);

  const state = crypto.randomUUID();
  const authorizeUrl = new URL(GITHUB_AUTHORIZE_URL);
  authorizeUrl.searchParams.set("response_type", "code");
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", callbackUrl.toString());
  authorizeUrl.searchParams.set("scope", GITHUB_SCOPE);
  authorizeUrl.searchParams.set("state", state);

  const response = NextResponse.redirect(authorizeUrl);
  response.cookies.set(OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    maxAge: 600,
    path: "/api/decap",
    sameSite: "lax",
    secure: siteUrl.protocol === "https:",
  });

  return response;
};
