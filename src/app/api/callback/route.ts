// next
import { type NextRequest, NextResponse } from "next/server";
import { cookies as getCookies } from "next/headers";

// other libraries
import PathFinder from "@/lib/PathFinder";
import { faker } from "@faker-js/faker";

// openauth
import { client, setTokens } from "@/auth-client";

// When the openauth flow is complete, users will be redirected back to our next.js app
export async function GET(req: NextRequest) {
  // Get the user's/customer's original destination from the http-only cookie that we set in the login function
  const cookies = await getCookies();
  const goingTo = cookies.get("goingTo")?.value;

  // Let us add a callback route to handle this
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  const exchanged = await client.exchange(code!, `${url.origin}/api/callback`);
  if (exchanged.err) return NextResponse.json(exchanged.err, { status: 400 });
  await setTokens(exchanged.tokens.access, exchanged.tokens.refresh);

  // Once the user/customer is authenticated, we redirect them to their original destination (customer id will be read from the session)
  if (goingTo === "checkout") return NextResponse.redirect(`${url.origin}` + PathFinder.toSfCheckoutPage(faker.string.uuid()));
  else return NextResponse.redirect(`${url.origin}` + PathFinder.toSfCustomerAccount(faker.string.uuid()));
}
