import { NextResponse, type NextRequest } from "next/server";

const GITHUB_ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token";
const OAUTH_STATE_COOKIE = "decap_oauth_state";

interface IGitHubTokenResponse {
  access_token?: string;
  error?: string;
  error_description?: string;
}

interface IDecapAuthMessage {
  provider: "github";
  token?: string;
  error?: string;
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const getSiteUrl = (request: NextRequest) => {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (configuredUrl) {
    return new URL(configuredUrl);
  }

  return new URL(new URL(request.url).origin);
};

const getCallbackUrl = (request: NextRequest) => {
  const callbackUrl = new URL("/api/decap/callback", getSiteUrl(request));

  return callbackUrl.toString();
};

const getErrorMessage = (tokenResponse: IGitHubTokenResponse) =>
  tokenResponse.error_description ??
  tokenResponse.error ??
  "GitHub OAuth failed";

const createCallbackResponse = (
  status: "success" | "error",
  content: IDecapAuthMessage,
) => {
  const message = `authorization:github:${status}:${JSON.stringify(content)}`;

  return new NextResponse(
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Authorizing Decap CMS</title>
  </head>
  <body>
    <script>
      (function () {
        var message = ${JSON.stringify(message)};
        var sendAuthorization = function () {
          if (window.opener) {
            window.opener.postMessage(message, "*");
          }
        };

        window.addEventListener("message", sendAuthorization, false);

        if (window.opener) {
          window.opener.postMessage("authorizing:github", "*");
          window.setTimeout(sendAuthorization, 500);
          window.setTimeout(function () {
            window.close();
          }, 1500);
        }
      })();
    </script>
  </body>
</html>`,
    {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    },
  );
};

const exchangeCodeForToken = async (request: NextRequest, code: string) => {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return {
      error: "Missing GitHub OAuth credentials",
    } satisfies IGitHubTokenResponse;
  }

  const response = await fetch(GITHUB_ACCESS_TOKEN_URL, {
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: getCallbackUrl(request),
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const tokenResponse = (await response.json()) as IGitHubTokenResponse;

  if (!response.ok) {
    return {
      error: getErrorMessage(tokenResponse),
    } satisfies IGitHubTokenResponse;
  }

  return tokenResponse;
};

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const expectedState = request.cookies.get(OAUTH_STATE_COOKIE)?.value;

  if (!code) {
    return createCallbackResponse("error", {
      error: "Missing GitHub authorization code",
      provider: "github",
    });
  }

  if (!state || !expectedState || state !== expectedState) {
    return createCallbackResponse("error", {
      error: "Invalid GitHub OAuth state",
      provider: "github",
    });
  }

  const tokenResponse = await exchangeCodeForToken(request, code);
  const response = tokenResponse.access_token
    ? createCallbackResponse("success", {
        provider: "github",
        token: tokenResponse.access_token,
      })
    : createCallbackResponse("error", {
        error: getErrorMessage(tokenResponse),
        provider: "github",
      });

  response.cookies.delete(OAUTH_STATE_COOKIE);

  return response;
};
