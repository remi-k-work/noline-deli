// next
import { type NextRequest, NextResponse } from "next/server";

// openauth
import { client, setTokens } from "@/auth-client";

// When the openauth flow is complete, users will be redirected back to our next.js app
export async function GET(req: NextRequest) {
  // Let us add a callback route to handle this
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  const exchanged = await client.exchange(code!, `${url.origin}/api/callback`);

  if (exchanged.err) return NextResponse.json(exchanged.err, { status: 400 });

  await setTokens(exchanged.tokens.access, exchanged.tokens.refresh);

  // Once the user is authenticated, we redirect them to the root of our app
  return NextResponse.redirect(`${url.origin}/`);
}
